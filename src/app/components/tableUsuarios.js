import React, { use, useEffect,useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoMdMore } from "react-icons/io";
import { useState } from 'react';
import { obtenerUsuariosTabla, obtenerUsuarioByID, actualizarAdminAUsuario } from '../../../services/userService';
import { obtenerRoles, obtenerEstadosGeneral } from '../../../services/catalogoServices';
import { TableFooter, TablePagination, CircularProgress, Modal, TextField} from '@mui/material';
import TablePaginationActions from './tableActionsComponent'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';


function createData(ID, nombre, fechaDesaparicion,fechaPublicacion, estatus) {
    return { ID, nombre, fechaDesaparicion, fechaPublicacion,estatus };
}

const rows = [
    createData(1105980, 'Luis Vargas Colon', '14/09/2024', '14/09/2024','ACTIVO'),
    createData(1105981, 'Rosanna Bautista Minyety', '15/09/2024', '14/09/2024','ACTIVO'),
    createData(1105982, 'William Fernandez Cruz', '15/09/2024', '14/09/2024','INACTIVO'),
    createData(1105983, 'Cristian Castro Garcia', '14/10/2024', '14/09/2024','ACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '24/10/2024', '14/09/2024','INACTIVO'),
    createData(1105985, 'Dario Contreras Ovalle', '03/11/2024', '14/09/2024','INACTIVO'),
    // Add more rows if needed
];

export default function TablaUsuarios({ headers, onRowClick,className }) {
    const [search, setSearch] = useState('');
    const [rol, setRol] = useState('-1');
    const [roles, setRoles] = useState([]);
    const [fechaDesde, setFechaDesde] = useState(null);
    const [fechaHasta, setFechaHasta] = useState(null);
    const [estatus, setEstatus] = useState('-1');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [data, setData] = useState([]);
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtersCleaned, setFiltersCleaned] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserID, setSelectedUserID] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalVer, setOpenModalVer] = useState(false);


    // Funcion para modal editar
    const handleOpenModal = async (id, opcion) => {
        setLoading(true);
        setMenuAnchor(null);
        try{
            console.log("ID",parseInt(id));
            const response = await obtenerUsuarioByID(parseInt(id));
            setSelectedUser(response.data);
            console.log("USUARIO",response.data);
            if(opcion === 1){
                setOpenModal(true);
            } else {
                setOpenModalVer(true);
            }
        } catch (error) {
            console.error("Error al obtener usuario", error);
        } finally {
            setLoading(false);
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setOpenModalVer(false);
        setSelectedUser(null);
    }

    // Formik para editar usuario
    const formik = useFormik({
        initialValues: {
            rol: selectedUser?.rol?.id,
            estado: selectedUser?.estado?.id,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                console.log("ID", parseInt(selectedUser.id));
                const response = await actualizarAdminAUsuario(parseInt(selectedUser.id), values);
                console.log("RESPONSE", response);
                if(response.status === 200){
                    handleCloseModal();
                    obtenerData();
                } else {
                    console.error("Error al actualizar usuario", response);
                }
            } catch (error) {
                console.error("Error al actualizar usuario", error);
            } finally {
                setLoading(false);
            }
        }
    });


    const formatearFecha = (fecha) => {
        const fechaFormatear = new Date(fecha);
        return `${fechaFormatear.getDate()}/${fechaFormatear.getMonth() + 1}/${fechaFormatear.getFullYear()}`;
    }
    
    const obtenerData = useCallback(() => {
        setLoading(true);
        const filtrosSearch = search ? `&nombreCompleto=${search}` : '';
        const filtroRol = rol !== "-1" ? `&rol=${rol}` : '';
        const filtrosEstatus = estatus !== "-1" ? `&estatus=${estatus}` : '';
        const filtros = `${filtrosSearch}${filtroRol}${filtrosEstatus}`;

        obtenerUsuariosTabla(page, limit, filtros)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [search, rol, estatus, page, limit]);


    const obtenerEstados = () => {
        obtenerEstadosGeneral().then((response) => {
            setEstados(response.data);
            console.log("ESTADOS",response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const obtenerRol = () => {
        obtenerRoles().then((response) => {
            setRoles(response.data);
            console.log("ROLES",response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const cleanFiltlers = () => {
        setSearch('');
        setEstatus('-1');
        setRol('-1');
        setFiltersCleaned(true);
        // setPage(1);
        // setLimit(10);
        // obtenerData();
    }

    useEffect(() => {
        if(filtersCleaned){
            obtenerData();
            setFiltersCleaned(false);
        }
    }
    , [filtersCleaned]);

    useEffect(() => {
        obtenerData();
    }, [obtenerData]);

    useEffect(() => {
        obtenerEstados();
        obtenerRol();
    }, []);

    const handleMenuOpen = (event, userId) => {
      setMenuAnchor(event.currentTarget);
      setSelectedUserID(userId);
    };

    const handleMenuClose = () => {
      setMenuAnchor(null);
      setSelectedUser(null);
    };

    const handleDeactivateUser = () => {
      console.log(`Desactivar usuario ${selectedUser}`);
      handleMenuClose();
    };

    return (
      <>
        <div className="flex items-center gap-4 w-[95%] mx-auto bg-white rounded-lg p-4 shadow-md mb-4">
          {/* Campo de búsqueda */}
          <div className="flex items-center bg-[#f0f0f0] rounded-md p-2 w-full max-w-[30%]">
            <input
              type="text"
              placeholder="Buscar por nombre de desaparecido"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent focus:outline-none px-4 w-full text-sm"
            />
            <button className="text-gray-500 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l5.386 5.386a1 1 0 01-1.414 1.414l-5.386-5.386zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Selector de rol */}
          <div className="flex items-center bg-[#f0f0f0] rounded-md p-2  w-auto">
            <label className="text-sm text-gray-500">Rol:</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="bg-transparent focus:outline-none px-4 w-full text-sm"
            >
              <option value="-1">Todos</option>
              {roles?.map((rol) => (
                <option key={rol.id.toString()} value={rol.id}>
                  {rol.nombrerol}
                </option>
              ))}
              {/* <option value="ACTIVO">Activo</option>
                    <option value="INACTIVO">Inactivo</option> */}
            </select>
          </div>

          {/* Selector de estatus*/}
          <div className="flex items-center bg-[#f0f0f0] rounded-md p-2  w-auto">
            <label className="text-sm text-gray-500">Estatus:</label>
            <select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
              className="bg-transparent focus:outline-none px-4 w-full text-sm"
            >
              <option value="-1">Todos</option>
              {estados?.map((estado) => (
                <option key={estado.id.toString()} value={estado.id}>
                  {estado.nombreestado}
                </option>
              ))}
              {/* <option value="ACTIVO">Activo</option>
                            <option value="INACTIVO">Inactivo</option> */}
            </select>
          </div>

          {/* Botón de búsqueda */}
          <button
            onClick={obtenerData}
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
          >
            Buscar
          </button>

          <button
            onClick={cleanFiltlers}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
          >
            Limpiar
          </button>
        </div>

        <div
          style={{
            // padding: '16px',
            zIndex: 10,
            width: "95%",
            // height: '70vh',
            overflowY: "auto",
            // margin: 'auto',
            // position: 'absolute',
            // top: '-290px',
            // left: '50%',
            // transform: 'translateX(-50%)',
          }}
          className={className}
        >
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              maxHeight: "100%",
              // overflowY: 'auto',
              // scrollbarWidth: 'none',
              // '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell
                      key={index}
                      align="left"
                      className="font-bold text-center"

                      // style={{ backgroundColor: (index%2) == 0 ? '#F3F7FD':"#000000" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={headers.length} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.usuarios?.map((usuario) => (
                    <TableRow
                      key={usuario?.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell align="left" className="text-center">
                        {usuario?.id}
                      </TableCell>
                      <TableCell align="left" className="text-center">
                        {usuario?.nombre}
                      </TableCell>
                      <TableCell align="left" className="text-center">
                        {usuario?.apellido}
                      </TableCell>
                      <TableCell align="left" className="text-center">
                        {usuario?.email}
                      </TableCell>
                      <TableCell align="left" className="text-center">
                        {usuario?.rol.nombrerol}
                      </TableCell>
                      <TableCell align="center" className="text-center">
                        <div className="text-xs text-blueBorder border border-blueBorder px-0.5 py-1 bg-blueInside rounded-sm">
                          {usuario?.estado?.nombreestado}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <button onClick={(e) => handleMenuOpen(e, usuario?.id)}>
                          <IoMdMore size={20} />
                        </button>
                        <Menu
                          anchorEl={menuAnchor}
                          open={Boolean(menuAnchor)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            onClick={() => handleOpenModal(selectedUserID, 2)}
                          >
                            Ver
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleOpenModal(selectedUserID, 1)}
                          >
                            Editar
                          </MenuItem>
                          <MenuItem onClick={handleDeactivateUser}>
                            Desactivar
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

              {/* Modal de edición */}
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="bg-white p-6 w-[30%] mx-auto mt-20 rounded-lg shadow-lg">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <TextField
                        id="rol"
                        name="rol"
                        label="Rol"
                        select
                        value={formik.values.rol || selectedUser?.rol}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                      >
                        {roles?.map((rol) => (
                          <MenuItem key={rol.id} value={rol.id}>
                            {rol.nombrerol}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        id="estado"
                        name="estado"
                        label="Estado"
                        select
                        value={formik.values.estado || selectedUser?.estado}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                      >
                        {estados?.map((estado) => (
                          <MenuItem key={estado.id} value={estado.id}>
                            {estado.nombreestado}
                          </MenuItem>
                        ))}
                      </TextField>

                      <div className="flex justify-end gap-4">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Guardar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Modal>

              {/* Modal de ver */}
              <Modal
                open={openModalVer}
                onClose={handleCloseModal}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="bg-white p-6 w-[90%] max-w-[600px] max-h-[80vh] overflow-auto mx-auto mt-20 rounded-lg shadow-lg">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <div className="flex flex-col gap-4">
                      {/* Imagen de perfil */}
                      <div className="flex justify-center mb-4">
                        <img
                          src={selectedUser?.urlfotoperfil}
                          alt="Foto de Perfil"
                          className="w-24 h-24 rounded-full border-2 border-gray-300"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="ID"
                          value={selectedUser?.id}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Nombre"
                          value={selectedUser?.nombre}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Apellido"
                          value={selectedUser?.apellido}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Email"
                          value={selectedUser?.email}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Fecha de Nacimiento"
                          value={new Date(
                            selectedUser?.fechanacimiento
                          ).toLocaleDateString()}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Número de Teléfono"
                          value={selectedUser?.numerotelefono}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Verificado"
                          value={selectedUser?.verificado ? "Sí" : "No"}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Código de Verificación"
                          value={selectedUser?.codigoverificacionusuario}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Tipo de Documento"
                          value={selectedUser?.idtipodocumento} // Cambia según la lógica de obtención del nombre
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Número de Documento"
                          value={selectedUser?.numerodocumento}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Rol"
                          value={selectedUser?.rol?.nombrerol}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Estado"
                          value={selectedUser?.estado?.nombreestado}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                        <TextField
                          label="Fecha de Creación"
                          value={new Date(
                            selectedUser?.fechacreacion
                          ).toLocaleDateString()}
                          variant="outlined"
                          fullWidth
                          slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        />
                      </div>

                      <div className="flex justify-end gap-4 mt-4">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Modal>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    colSpan={3}
                    count={data.usuariosCount}
                    rowsPerPage={limit}
                    page={page - 1}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "Filas por página",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={(e, newPage) => {
                      setPage(newPage + 1);
                    }}
                    onRowsPerPageChange={(e) => {
                      console.log("ROWS PER PAGE", e.target.value);
                      setLimit(parseInt(e.target.value), 10);
                    }}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </>
    );
}
