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
import { obtenerMaterialEducativoTabla } from '../../../services/materialEducativoServices';
import { obtenerEstadosMaterialEducativo, obtenerTipoMaterialEducativo} from '../../../services/categoriasServices';
import { TableFooter, TablePagination, CircularProgress, Menu, MenuItem } from '@mui/material';
import TablePaginationActions from './tableActionsComponent'; 

export default function TablaMaterialEducativo({ headers, onRowClick,className,nuevoRecurso, setNuevoRecurso }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [estadoMaterial, setEstadoMaterial] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [nombreMaterial, setNombreMaterial] = useState('');
    const [estatus, setEstatus] = useState('-1');
    const [tipoMaterial, setTipoMaterial] = useState('-1');

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [data, setData] = useState([]);

    const [estados, setEstados] = useState([]);
    const [tipoMaterialEducativo, setTipoMaterialEducativo] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [filtersCleaned, setFiltersCleaned] = useState(false);


    const formatearFecha = (fecha) => {
        const fechaFormatear = new Date(fecha);
        return `${fechaFormatear.getDate()}/${fechaFormatear.getMonth() + 1}/${fechaFormatear.getFullYear()}`;
    }
    
    const obtenerData = () => {
        setLoading(true);
        const filtrosNombre = (nombreMaterial && nombreMaterial != '') ? `&nombreMaterial=${nombreMaterial}` : '';
        // const filtrosFechaDesde = fechaDesde ? `&fechaDesde=${fechaDesde}` : '';
        // const filtrosFechaHasta = fechaHasta ? `&fechaHasta=${fechaHasta}` : '';
        const filtrosEstatus = (estatus && estatus != "-1") ? `&estatus=${estatus}` : '';
        const filtrosTipoMaterial = (tipoMaterial && tipoMaterial != "-1") ? `&tipoMaterial=${tipoMaterial}` : '';
        const filtros = `${filtrosNombre}${filtrosEstatus}${filtrosTipoMaterial}`;
        obtenerMaterialEducativoTabla(page, limit, filtros).then((response) => {
            console.log("MATERIALES EDUCATIVOS",response.data);
            setData(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const obtenerEstados = () => {
        obtenerEstadosMaterialEducativo().then((response) => {
            setEstados(response.data);
            console.log("ESTADOS",response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const obtenerTipoMaterial = () => {
        obtenerTipoMaterialEducativo().then((response) => {
            setTipoMaterialEducativo(response.data);
            console.log("TIPO MATERIAL EDUCATIVO",response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    const cleanFiltlers = () => {
        setNombreMaterial('');
        setTipoMaterial('-1');
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
        if(nuevoRecurso){
            obtenerData();
            setNuevoRecurso(false);
        }
    }
    , [nuevoRecurso]);

    useEffect(() => {
        obtenerData();
    }, [page, limit]);

    useEffect(() => {
        obtenerEstados();
        obtenerTipoMaterial();
    }, []);

    useEffect(() => {
        console.log("Data", data);
    }
    , [data]);


    useEffect(() => {
        console.log("Limit", limit);
    }
    , [limit]);

    const handleClick = (event, idMaterial, idEstado) => {
        setEstadoMaterial(idEstado);
        setAnchorEl(event.currentTarget);
        setSelectedMaterial(idMaterial);
        // console.log("ID DE LA PUBLICACION",idPublicacion)
        // setSelectedPublicacion(publicacion);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSelectedPublicacion(null);
    };

    const handleEdit = () => {
        // console.log('Editando publicación:', selectedPublicacion);
    };

    const handleView = () => {
        // console.log('Viendo publicación:', selectedPublicacion);
        onRowClick(selectedMaterial);

        handleClose();
    };

    const handleDeactivate = () => {
        // console.log('Desactivando publicación:', selectedPublicacion);
        handleClose();
    };


    return (
        <>
            <div className="flex items-center gap-4 w-[95%] mx-auto bg-white rounded-lg p-4 shadow-md mb-4">
                {/* Campo de búsqueda */}
                <div className="flex items-center bg-[#f0f0f0] rounded-md p-2 w-full max-w-[50%]">
                    <input
                        type="text"
                        placeholder="Buscar por nombre de material"
                        value={nombreMaterial}
                        onChange={(e) => setNombreMaterial(e.target.value)}
                        className="bg-transparent focus:outline-none px-4 w-full text-sm"
                    />
                    <button className="text-gray-500 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l5.386 5.386a1 1 0 01-1.414 1.414l-5.386-5.386zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Selector de Tipo Material*/}
                    <div className="flex items-center bg-[#f0f0f0] rounded-md p-2  w-auto">
                        <label className="text-sm text-gray-500">Tipo:</label>
                        <select
                            value={tipoMaterial}
                            onChange={(e) => setTipoMaterial(e.target.value)}
                            className="bg-transparent focus:outline-none px-4 w-full text-sm"
                        >
                            <option value="-1">Todos</option>
                            {tipoMaterialEducativo?.map((tipo) => (
                                <option key={tipo.id.toString()} value={tipo.id}>{tipo.nombrecategoriamaterial}</option>
                            ))}
                        </select>
                    </div>

                    {/* Selector de Estado*/}
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
                                        <TableCell colSpan={headers?.length} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data?.materialesEducativos?.map((material) => (
                                        <TableRow
                                            key={material?.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                            // onRowClick={() => onRowClick(row)} // Trigger onRowClick when row is clicked
                                            onDoubleClick={() => onRowClick(material?.id)} // Trigger onRowClick when row is double clicked 
                                        >
                                            <TableCell align="left" className='text-center'>{material?.id}</TableCell>
                                            <TableCell align="left" className='text-center'>{material?.nombre}</TableCell>
                                            <TableCell align="left" className='text-center'>{material?.categoriamaterial?.nombrecategoriamaterial}</TableCell>
                                            {/* <TableCell align="left" className='text-center'>{formatearFecha(publicacion?.fechadesaparicion)}</TableCell> */}
                                            <TableCell align="left" className='text-center'>{formatearFecha(material?.fechacreacion)}</TableCell>
                                            <TableCell align="center" className='text-center'>
                                                <div className='text-xs text-blueBorder border border-blueBorder px-0.5 py-1 bg-blueInside rounded-sm'>
                                                    {material?.estado?.nombreestado}
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <button
                                                    onClick={(event) => handleClick(event, material?.id, material?.estado?.id)}
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
                                                    <MenuItem onClick={handleView}>Ver Detalles del Material</MenuItem>
                                                    <MenuItem onClick={handleEdit}>Editar Material</MenuItem>
                                                    <MenuItem onClick={handleDeactivate}>{(estadoMaterial === 1) ? "Desactivar Material" : "Activar Material"}</MenuItem>
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
                                    count={data.totalMateriales}
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
            </div>
        </>
    );
}
