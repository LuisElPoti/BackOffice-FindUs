import React, { use, useEffect,useCallback, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoMdMore } from "react-icons/io";
import { obtenerDesaparecidosTabla, activarPublicacion, desactivarPublicacion, verificarPublicacion } from '../../../services/publicacionServices';
import { obtenerEstadosPublicaciones } from '../../../services/categoriasServices';
import { TableFooter, TablePagination, CircularProgress, Menu, MenuItem, Modal } from '@mui/material';
import TablePaginationActions from './tableActionsComponent'; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCancel } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";


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

export default function TablaPublicaciones({ headers, onRowClick,className, handleEditandoPublicacion,nuevaPublicacion, setNuevaPublicacion }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState('');
    const [fechaDesde, setFechaDesde] = useState(null);
    const [fechaHasta, setFechaHasta] = useState(null);
    const [estatus, setEstatus] = useState('-1');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [data, setData] = useState([]);
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtersCleaned, setFiltersCleaned] = useState(false);
    const [selectedPublicacion, setSelectedPublicacion] = useState({idPublicacion: null, idEstado: null, nombre: null,verificado: null});
    const [openModalDesAct, setOpenModalDesAct] = useState({abrir: false, idPublicacion: null, activado: true, nombrePublicacion: null});
    const [openModalVerificar, setOpenModalVerificar] = useState({abrir: false, idPublicacion: null, activado: null, verificado: null, nombrePublicacion: null});


    const formatearFecha = (fecha) => {
        const fechaFormatear = new Date(fecha);
        return `${fechaFormatear.getDate()}/${fechaFormatear.getMonth() + 1}/${fechaFormatear.getFullYear()}`;
    }
    
    const obtenerData = () => {
        setLoading(true);
        const filtrosSearch = (search && search != '') ? `&nombreDesaparecido=${search}` : '';
        const filtrosFechaDesde = fechaDesde ? `&fechaDesde=${fechaDesde}` : '';
        const filtrosFechaHasta = fechaHasta ? `&fechaHasta=${fechaHasta}` : '';
        const filtrosEstatus = (estatus && estatus != "-1") ? `&estatus=${estatus}` : '';
        const filtros = `${filtrosSearch}${filtrosFechaDesde}${filtrosFechaHasta}${filtrosEstatus}`;
        obtenerDesaparecidosTabla(page, limit, filtros).then((response) => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const obtenerEstados = () => {
        obtenerEstadosPublicaciones().then((response) => {
            setEstados(response.data);
            console.log("ESTADOS",response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const cleanFiltlers = () => {
        setSearch('');
        setFechaDesde(null);
        setFechaHasta(null);
        setEstatus('-1');
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
    }, [page, limit, search, fechaDesde, fechaHasta, estatus]);

    useEffect(() => {
        obtenerEstados();
    }, []);

    useEffect(() => {
        if(nuevaPublicacion){
            obtenerData();
            setNuevaPublicacion(false);
        }
    }
    , [nuevaPublicacion]);


    useEffect(() => {
        console.log("Data", data);
    }
    , [data]);


    useEffect(() => {
        console.log("Limit", limit);
    }
    , [limit]);

    const handleClick = (event, idPublicacion, idEstado, nombrePublicacion, verificado) => {
        setAnchorEl(event.currentTarget);
        console.log("ID DE LA PUBLICACION",idPublicacion)
        setSelectedPublicacion({
            idPublicacion: idPublicacion, 
            idEstado: idEstado, 
            nombre: nombrePublicacion,
            verificado: verificado
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedPublicacion({idPublicacion: null, idEstado: null, nombre: null,verificado: null});
    };

    const handleEdit = () => {
        console.log('Editando publicación:', selectedPublicacion);
        handleEditandoPublicacion(selectedPublicacion?.idPublicacion);
        handleClose();
    };

    const handleView = () => {
        console.log('Viendo publicación:', selectedPublicacion);
        onRowClick(selectedPublicacion?.idPublicacion);
        handleClose();
    };

    const handleDeactivate = () => {
        console.log('Desactivando publicación:', selectedPublicacion);
        setOpenModalDesAct({
            abrir: true, 
            idPublicacion: selectedPublicacion?.idPublicacion, 
            activado: selectedPublicacion?.idEstado == 1,
            nombrePublicacion: selectedPublicacion?.nombre
        });
        handleClose();
    };

    const handleVerify = () => {
        console.log('Verificando publicación:', selectedPublicacion);
        setOpenModalVerificar({
            abrir: true, 
            idPublicacion: selectedPublicacion?.idPublicacion, 
            activado: selectedPublicacion?.idEstado == 1,
            verificado: selectedPublicacion?.verificado,
            nombrePublicacion: selectedPublicacion?.nombre
        });
        handleClose();
    }


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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l5.386 5.386a1 1 0 01-1.414 1.414l-5.386-5.386zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Selector de Fecha Desde*/}
                <div className="flex items-center bg-[#f0f0f0] rounded-md p-2  w-auto">
                        <label className="text-sm text-gray-500">Desde:</label>
                        <input
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            defaultValue={fechaDesde}
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(new Date(e.target.value).toISOString().split("T")[0])}
                            className="bg-transparent focus:outline-none px-4 w-full text-sm"
                        />
                </div>

                {/* Selector de Fecha Hasta*/}
                <div className="flex items-center bg-[#f0f0f0] rounded-md p-2  w-auto">
                        <label className="text-sm text-gray-500">Hasta:</label>
                        <input
                            type="date"
                            defaultValue={fechaHasta}
                            max={new Date().toISOString().split("T")[0]}
                            min={fechaDesde}
                            value={fechaHasta}
                            datatype='date'
                            onChange={(e) => {
                                setFechaHasta(new Date(e.target.value).toISOString().split("T")[0])
                                console.log(e.target.value)
                            }}
                            className="bg-transparent focus:outline-none px-4 w-full text-sm"
                        />
                </div>

                    {/* Selector de Fecha Hasta*/}
                    <div className="flex items-center bg-[#f0f0f0] rounded-md p-2  w-auto">
                        <label className="text-sm text-gray-500">Estatus:</label>
                        <select
                            value={estatus}
                            onChange={(e) => setEstatus(e.target.value)}
                            className="bg-transparent focus:outline-none px-4 w-full text-sm"
                        >
                            <option value="-1">Todos</option>
                            {estados?.map((estado) => (
                                <option key={estado.id.toString()} value={estado.id}>{estado.nombreestado}</option>
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
                    width: '95%',
                    // height: '70vh',
                    overflowY: 'auto',
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
                        width: '100%', 
                        maxHeight: '100%', 
                        // overflowY: 'auto', 
                        // scrollbarWidth: 'none', 
                        // '&::-webkit-scrollbar': { display: 'none' } 
                    }}
                >
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                        <TableHead >
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
                                    data?.publicaciones?.map((publicacion) => (
                                        <TableRow
                                            key={publicacion?.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                            // onRowClick={() => onRowClick(row)} // Trigger onRowClick when row is clicked
                                            onDoubleClick={() => onRowClick(publicacion?.id)} // Trigger onRowClick when row is double clicked 
                                        >
                                            <TableCell align="left" className='text-center'>{publicacion?.id}</TableCell>
                                            <TableCell align="left" className='text-center'>{publicacion?.nombredesaparecido}</TableCell>
                                            <TableCell align="left" className='text-center'>{publicacion?.verificado ? 
                                                <MdOutlineVerified
                                                    style={{ color: '#10B981' }}
                                                    size={25}
                                                    className='mx-auto'
                                                /> 
                                                : 
                                                <GiCancel
                                                    style={{ color: '#EF4444' }}
                                                    size={20}
                                                    className='mx-auto'
                                                />
                                                }
                                            </TableCell>
                                            <TableCell align="left" className='text-center'>{formatearFecha(publicacion?.fechadesaparicion)}</TableCell>
                                            <TableCell align="left" className='text-center'>{formatearFecha(publicacion?.fechacreacion)}</TableCell>
                                            <TableCell align="center" className='text-center'>
                                                <div 
                                                    className='text-xs border px-0.5 py-1 rounded-sm'
                                                    style={{ 
                                                        backgroundColor: publicacion?.estado?.id == 1 ? '#F3F7FD' : '#ffe2e2' ,
                                                        color: publicacion?.estado?.id == 1 ? '#2E5AAC' : '#EF4444',
                                                        borderColor: publicacion?.estado?.id == 1 ? '#2E5AAC' : '#EF4444',
                                                    }}
                                                >
                                                    {publicacion?.estado?.nombreestado}
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <button
                                                    onClick={(event) => handleClick(event, publicacion?.id, publicacion?.estado?.id, publicacion?.nombredesaparecido, publicacion?.verificado)}
                                                >
                                                    <IoMdMore size={20} />
                                                </button>
                                                 <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                    sx={{
                                                        '& .MuiPaper-root': {
                                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Sombra más suave
                                                        }
                                                    }}
                                                >
                                                    <MenuItem onClick={handleView}>Ver Publicación</MenuItem>
                                                    {selectedPublicacion?.idEstado == 1 &&(
                                                        <MenuItem onClick={handleEdit}>Editar Publicación</MenuItem>
                                                    )}
                                                    <MenuItem onClick={handleDeactivate}>{(selectedPublicacion?.idEstado == 1 ) ? "Desactivar Publicación" : "Activar Publicación"}</MenuItem>
                                                    {(!selectedPublicacion?.verificado && selectedPublicacion?.verificado !== null && selectedPublicacion?.idEstado === 1) && (
                                                        <MenuItem onClick={handleVerify}>Verificar Publicacion</MenuItem>
                                                    )}
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                        </TableBody>
                        <TableFooter
                            
                        >
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10,20,50]}
                                    colSpan={3}
                                    count={data.totalPublicaciones}
                                    rowsPerPage={limit}
                                    page={page-1}
                                    slotProps={{
                                        select:{
                                            inputProps:{
                                                'aria-label': 'Filas por página',
                                            },
                                            native: true,
                                        }
                                    }}
                                    onPageChange={(e, newPage) => {
                                        setPage(newPage+1)
                                    }}
                                    onRowsPerPageChange={(e) => {
                                        console.log("ROWS PER PAGE",e.target.value)
                                        setLimit(parseInt(e.target.value),10)
                                    }}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

                <ModalCambiarEstadoPublicacion 
                    open={openModalDesAct?.abrir} 
                    handleClose={() => {
                        // if(actualizar){
                        //     setNuevaPublicacion(true);
                        // }
                        setOpenModalDesAct({abrir: false, idPublicacion: null, activado: true});
                     }} 
                    activado={openModalDesAct?.activado}
                    idPublicacion={openModalDesAct?.idPublicacion}
                    nombrePublicacion={openModalDesAct?.nombrePublicacion}
                    setActualizar={setNuevaPublicacion}
                />

                <ModalVerificarPublicacion
                    open={openModalVerificar?.abrir} 
                    handleClose={() => setOpenModalVerificar({abrir: false, idPublicacion: null, activado: null, verificado: null, nombrePublicacion: null})} 
                    activado={openModalVerificar?.activado}
                    idPublicacion={openModalVerificar?.idPublicacion}
                    nombrePublicacion={openModalVerificar?.nombrePublicacion}
                    setActualizar={setNuevaPublicacion}
                />
                
            </div>
        </>
    );
}



function ModalCambiarEstadoPublicacion({open, handleClose, activado, nombrePublicacion, idPublicacion, setActualizar}) {

    const showToast = async (promise, mensaje) => {
        return toast.promise(
          promise,
          {
            pending: mensaje,
          },
          { position: "top-center", autoClose: 2000, className: "w-auto" }
        );
      };

      
    const handleConfirm = () => {
        
        if(activado){
            showToast(desactivarPublicacion(idPublicacion), "Desactivando publicación...").then((response) => {
                handleClose();
                if (response.status === 200) {
                    toast.success("Publicación Desactivada", { position: "top-center", autoClose: 2000, className: "w-auto" });
                    setActualizar(true);
                    console.log("Publicación Desactivada",response);
                }
                else{
                    toast.error("Error al desactivar la publicación", { position: "top-center", autoClose: 2000, className: "w-auto" });
                }
            }).catch((error) => {
                toast.error("Error al desactivar la publicación", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log(error);
            });
        }else{
            showToast(activarPublicacion(idPublicacion),"Activando Publicacion...").then((response) => {
                handleClose();
                if (response.status === 200) {
                    toast.success("Publicación Activada", { position: "top-center", autoClose: 2000, className: "w-auto" });
                    setActualizar(true);
                    console.log("Publicación Activada",response);
                }else{
                    toast.error("Error al activar la publicación", { position: "top-center", autoClose: 2000, className: "w-auto" });
                }
            }).catch((error) => {
                toast.error("Error al activar la publicación", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log(error);
            });
        }
    }


    return (
        <Modal open={open} onClose={handleClose} className='content-center'>
            <div
                className='flex flex-col justify-center items-center self-center mx-auto content-center w-[35vw] bg-white rounded-lg p-4'
            >
                <h1 className='w-full text-center text-3xl font-extrabold text-[#233E58] mt-4 pl-3'>Cambiar Estado de Publicación</h1>
                {activado  ? (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado de la publicación de <strong>{nombrePublicacion} - ID: {idPublicacion}</strong> de <strong>Activada</strong> a <strong>Desactivada</strong>?</p>
                ) : (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado de la publicación de <strong>{nombrePublicacion} - ID: {idPublicacion}</strong> de <strong>Desactivada</strong> a <strong>Activada</strong>?</p>
                )}

                <div className='flex flex-row justify-center items-center mt-8'>
                    <button
                        className='bg-[#233E58] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                    <button
                        className='bg-[#E53E3E] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>   
        </Modal>
    )
}

function ModalVerificarPublicacion({open, handleClose, activado, nombrePublicacion, idPublicacion, setActualizar}) {

    const showToast = async (promise, mensaje) => {
        return toast.promise(
          promise,
          {
            pending: mensaje,
          },
          { position: "top-center", autoClose: 2000, className: "w-auto" }
        );
      };

      const handleConfirm = () => {
        showToast(verificarPublicacion(idPublicacion), "Verificando publicación...").then((response) => {
            handleClose();
            if (response.status === 200) {
                toast.success("Publicación Verificada", { position: "top-center", autoClose: 2000, className: "w-auto" });
                setActualizar(true);
                console.log("Publicación Verificada",response);
            }
            else{
                toast.error("Error al verificar la publicación", { position: "top-center", autoClose: 2000, className: "w-auto" });
            }
        }).catch((error) => {
            toast.error("Error al verificar la publicación", { position: "top-center", autoClose: 2000, className: "w-auto" });
            console.log(error);
        });
    }

              
    return (
        <Modal open={open} onClose={handleClose} className='content-center'>
            <div
                className='flex flex-col justify-center items-center self-center mx-auto content-center w-[35vw] bg-white rounded-lg p-4'
            >
                <h1 className='w-full text-center text-3xl font-extrabold text-[#233E58] mt-4 pl-3'>Verificar Vericidad de Publicación</h1>
                {/* {activado  ? ( */}
                    {/* <> */}
                        <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea verificar la vericidad de la publicación de <strong>{nombrePublicacion} - ID: {idPublicacion}</strong>?</p>
                        <p className='text-[#233E58] mt-8 px-6 text-xl'>Le sugerimos que antes de verificarla, verifique las informaciones de la misma y la prueba de la denuncia a a policia. Esta acción le daría mayor credibilidad a la publicación, así que verificar correctamente las informaciones.</p>
                    {/* </> */}
                {/* ) : (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado de la publicación de <strong>{nombrePublicacion} - ID: {idPublicacion}</strong> de <strong>Desactivada</strong> a <strong>Activada</strong>?</p>
                )} */}

                <div className='flex flex-row justify-center items-center mt-8'>
                    <button
                        className='bg-[#233E58] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                    <button
                        className='bg-[#E53E3E] text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>   
        </Modal>
    )
}