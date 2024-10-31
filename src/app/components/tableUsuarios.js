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
import { obtenerUsuariosTabla } from '../../../services/userService';
import { obtenerRoles, obtenerEstadosGeneral } from '../../../services/catalogoServices';
import { TableFooter, TablePagination, CircularProgress } from '@mui/material';
import TablePaginationActions from './tableActionsComponent'; 

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


    const formatearFecha = (fecha) => {
        const fechaFormatear = new Date(fecha);
        return `${fechaFormatear.getDate()}/${fechaFormatear.getMonth() + 1}/${fechaFormatear.getFullYear()}`;
    }
    
    const obtenerData = () => {
        setLoading(true);
        const filtrosSearch = (search && search !== '') ? `&nombreCompleto=${search}` : '';
        const filtroRol = (rol && rol != "-1") ? `&rol=${rol}` : '';
        // const filtrosFechaDesde = fechaDesde ? `&fechaDesde=${fechaDesde}` : '';
        // const filtrosFechaHasta = fechaHasta ? `&fechaHasta=${fechaHasta}` : '';
        const filtrosEstatus = (estatus && estatus != "-1") ? `&estatus=${estatus}` : '';
        const filtros = `${filtrosSearch}${filtroRol}${filtrosEstatus}`;
        obtenerUsuariosTabla(page, limit, filtros).then((response) => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    };

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
    }, [page, limit, search, rol, estatus]);

    useEffect(() => {
        obtenerEstados();
    }, []);

    useEffect(() => {
        obtenerRol();
    }, []);

    useEffect(() => {
        console.log("Data", data);
    }
    , [data]);


    useEffect(() => {
        console.log("Limit", limit);
    }
    , [limit]);
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
                <select value={rol} onChange={(e) => setRol(e.target.value)} className="bg-transparent focus:outline-none px-4 w-full text-sm">
                    <option value="-1">Todos</option>
                    {roles?.map((rol) => (
                        <option key={rol.id.toString()} value={rol.id}>{rol.nombrerol}</option>
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
                      onRowClick={() => onRowClick(usuario?.id)} // Trigger onRowClick when row is clicked
                    //   onDoubleClick={() => onRowClick(publicacion?.id)} // Trigger onRowClick when row is double clicked
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
                        <button
                          onClick={() => console.log("More button clicked")}
                        >
                          <IoMdMore size={20} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
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
