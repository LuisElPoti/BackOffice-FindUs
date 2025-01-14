import React, { useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoMdMore } from "react-icons/io";
import { activarRecursoEducativo, desactivarRecursoEducativo, obtenerMaterialEducativoByID, obtenerMaterialEducativoTabla, editarRecursoEducativo } from '../../../services/materialEducativoServices';
import { obtenerCategoriaMaterial, obtenerEstadosMaterialEducativo, obtenerTipoMaterialEducativo} from '../../../services/categoriasServices';
import { convertToBase64 } from '../../../services/filesServices';
import { TableFooter, TablePagination, CircularProgress, Menu, MenuItem, Modal } from '@mui/material';
import TablePaginationActions from './tableActionsComponent'; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function TablaMaterialEducativo({ headers, onRowClick,className,nuevoRecurso, setNuevoRecurso }) {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [estadoMaterial, setEstadoMaterial] = useState(null);
    // const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState({idMaterial: null, nombreMaterial: null, estadoMaterial: null});
    const [descActMaterial, setDescActMaterial] = useState({open: false, activado: false, nombreMaterial: null, idMaterial: null});
    const [openModalEditar, setOpenModalEditar] = useState({open: false, idMaterial: null, nombreMaterial: null});

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

    const handleClick = (event, idMaterial, idEstado, nombreMaterial) => {
        // setEstadoMaterial(idEstado);
        setAnchorEl(event.currentTarget);
        setSelectedMaterial({idMaterial: idMaterial, nombreMaterial: nombreMaterial, estadoMaterial: idEstado});
        // console.log("ID DE LA PUBLICACION",idPublicacion)
        // setSelectedPublicacion(publicacion);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSelectedPublicacion(null);
    };

    const handleEdit = () => {
        // console.log('Editando publicación:', selectedPublicacion);
        setOpenModalEditar({
            open: true, 
            idMaterial: selectedMaterial?.idMaterial, 
            nombreMaterial: selectedMaterial?.nombreMaterial
        });
        handleClose();
    };

    const handleView = () => {
        // console.log('Viendo publicación:', selectedPublicacion);
        onRowClick(selectedMaterial?.idMaterial);

        handleClose();
    };

    const handleDeactivate = () => {
        setDescActMaterial({
            open: true, 
            activado: (selectedMaterial?.estadoMaterial === 1) ? true : false, 
            nombreMaterial: selectedMaterial?.nombreMaterial, 
            idMaterial: selectedMaterial?.idMaterial
        });
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
                                                <div 
                                                    className='text-xs border px-0.5 py-1 rounded-sm'
                                                    style={{ 
                                                        backgroundColor: material?.estado?.id == 1 ? '#F3F7FD' : '#F3F7FD' ,
                                                        color: material?.estado?.id == 1 ? '#2E5AAC' : '#717171',
                                                        borderColor: material?.estado?.id == 1 ? '#2E5AAC' : '#CCCCCD',
                                                    }}
                                                >
                                                    {material?.estado?.nombreestado}
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <button
                                                    onClick={(event) => handleClick(event, material?.id, material?.estado?.id, material?.nombre)}
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
                                                    <MenuItem onClick={handleDeactivate}>{(selectedMaterial?.estadoMaterial === 1) ? "Desactivar Material" : "Activar Material"}</MenuItem>
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

                <ModalCambiarEstadoMaterialEducativo
                    open={descActMaterial.open}
                    handleClose={() => setDescActMaterial({open: false, activado: false, nombreMaterial: null, idMaterial: null})}
                    activado={descActMaterial.activado}
                    nombreMaterial={descActMaterial.nombreMaterial}
                    idMaterial={descActMaterial.idMaterial}
                    setActualizar={setNuevoRecurso}
                />

                <ModalEditarMaterialEducativo
                    open = {openModalEditar.open}
                    handleClose = {() => setOpenModalEditar({open: false, idMaterial: null, nombreMaterial: null})}
                    idMaterial={openModalEditar.idMaterial}
                    nombreMaterial={openModalEditar.nombreMaterial}
                    setActualizar={setNuevoRecurso}
                />
            </div>
        </>
    );
}


function ModalCambiarEstadoMaterialEducativo({open, handleClose, activado, nombreMaterial, idMaterial, setActualizar }) { //

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
            showToast(desactivarRecursoEducativo(idMaterial), "Desactivando Material Educativo...").then((response) => {
                handleClose();
                if (response.status === 200) {
                    toast.success("Material Educativo Desactivado", { position: "top-center", autoClose: 2000, className: "w-auto" });
                    setActualizar(true);
                    console.log("Material Educativo Desactivado",response);
                }
                else{
                    toast.error("Error al desactivar el material educativo", { position: "top-center", autoClose: 2000, className: "w-auto" });
                }
            }).catch((error) => {
                toast.error("Error al desactivar el material educativo", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log(error);
            });
        }else{
            showToast(activarRecursoEducativo(idMaterial),"Activando Material Educativo...").then((response) => {
                handleClose();
                if (response.status === 200) {
                    toast.success("Material Educativo Activado", { position: "top-center", autoClose: 2000, className: "w-auto" });
                    setActualizar(true);
                    console.log("Material Educativo Activado",response);
                }else{
                    toast.error("Error al activar el material educativo", { position: "top-center", autoClose: 2000, className: "w-auto" });
                }
            }).catch((error) => {
                toast.error("Error al activar el material educativo", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log(error);
            });
        }
    }


    return (
        <Modal open={open} onClose={handleClose} className='content-center'>
            <div
                className='flex flex-col justify-center items-center self-center mx-auto content-center w-[35vw] bg-white rounded-lg p-4'
            >
                <h1 className='w-full text-center text-3xl font-extrabold text-[#233E58] mt-4 pl-3'>Cambiar Estado de Material Educativo</h1>
                {activado  ? (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado del material educativo: <strong>{nombreMaterial} - ID: {idMaterial}</strong> de <strong>Activada</strong> a <strong>Desactivada</strong>?</p>
                ) : (
                    <p className='text-[#233E58] mt-8 px-6 text-xl'>¿Está seguro que desea cambiar el estado del material educativo: <strong>{nombreMaterial} - ID: {idMaterial}</strong> de <strong>Desactivada</strong> a <strong>Activada</strong>?</p>
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



function ModalEditarMaterialEducativo({open, handleClose, idMaterial, nombreMaterial, setActualizar}) {//materialEducativo
    
    const [opcionesRecursos, setOpcionesRecursos] = useState([]);
    const [imagenAvistamiento, setImagenAvistamiento] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [abrirModal, setAbrirModal] = useState(false);

    const showToast = async (promise, mensaje) => {
        return toast.promise(
          promise,
          {
            pending: mensaje,
          },
          { position: "top-center", autoClose: 2000, className: "w-auto" }
        );
      };


    const [initialValues, setInitialValues] = useState({
          idCategoriaMaterial: -1,
          nombre: "",
          descripcion: "",
          imageData: null,
          urlmaterial: "",
    });

    const validationSchema = Yup.object().shape({
        idCategoriaMaterial: Yup.number().moreThan(0)
          .required(""),
        nombre: Yup.string()
          .required("El nombre del Material es requerido"),
        descripcion: Yup.string()
          .required("La descripción es requerida"),
        // fileName: Yup.string(),
        // fileMimetype: Yup.string(),
        // filebase64: Yup.string(),
        urlmaterial: Yup.string(),
      });

    const formikEditar = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
          showToast(editarRecursoEducativo(idMaterial,values), "Editando Material Educativo...").then((response) => {
            handleClose();
            if (response.status === 200) {
                setActualizar(true);
                toast.success("Material Educativo Editado", { position: "top-center", autoClose: 2000, className: "w-auto" });
                console.log("Material Educativo Editado",response);
            }
            else{
                toast.error("Error al editar el material educativo", { position: "top-center", autoClose: 2000, className: "w-auto" });
            }
          }).catch((error) => {
            toast.error("Error al editar el material educativo", { position: "top-center", autoClose: 2000, className: "w-auto" });
            console.log(error);
            });
        },
    });

    useEffect(() => {
        console.log("FORMIK EDITAR VALUES", formikEditar?.values);
    }
    , [formikEditar?.values]);
    
    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        console.log("FILE",file);
        const base64 = (await convertToBase64(file)).split(",")[1];
        console.log("BASE64",base64);
        formikEditar.setFieldValue("imageData", {
            base64Image: base64,
            fileName: file.name,
            mimeType: file.type,
        });
    };

    
    const renderInputForCategory = () => {
        if (formikEditar?.values?.idCategoriaMaterial === 1 || formikEditar?.values?.idCategoriaMaterial === 3) {
            return (
                <div className="flex flex-col w-[100%] mt-4">
                    <label className="text-[#233E58] font-bold text-lg mb-2" htmlFor="fileUpload">
                        Subir archivo
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        name="fileUpload"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        onChange={(e) => handleFileInputChange(e)}
                    />
                </div>
            );
        } else if (formikEditar?.values?.idCategoriaMaterial === -1){
            return null;
        }
            else {
            return (
                <div className="flex flex-col w-[100%] mt-4">
                    <label className="text-[#233E58] font-bold text-lg mb-2" htmlFor="urlInput">
                        Ingresar URL
                    </label>
                    <input
                        type="url"
                        id="urlmaterial"
                        name="urlmaterial"
                        onChange={formikEditar?.handleChange}
                        value={formikEditar?.values?.urlmaterial}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="https://example.com"
                    />
                </div>
            );
        }
    };

    // useEffect(() => {
    //     console.log("Formik", formikEditar);
    // }
    // , [formikEditar]);

    const handleSelectChange = (e) => {
        formikEditar.setFieldValue("idCategoriaMaterial", parseInt(e.target.value));
    };

    useEffect(() => {
        if(open){
            setLoading(true);
            obtenerCategoriaMaterial().then((response) => {
                if (response.status === 200) {
                    setOpcionesRecursos(response.data);
                    console.log("Categorías de material:", response.data);
                }
            });

            obtenerMaterialEducativoByID(idMaterial).then((response) => {
                if (response.status === 200) {
                    console.log("Material Educativo:", response.data);
                    const material = response.data;
                    setInitialValues({
                        idCategoriaMaterial: material.idcategoriamaterial,
                        nombre: material.nombre,
                        descripcion: material.descripcion,
                        urlmaterial: material.urlmaterial,
                    });
                    setImagenAvistamiento(material.urlmaterial);
                }
            });
        }
    }
    , [open]);


    useEffect(() => {
        if(initialValues.idCategoriaMaterial !== -1){
            setLoading(false);
        }
    }
    , [initialValues]);


    
    if(loading){
        console.log("CARGANDO DATOS");
        console.log("ENTREEE AL LOADING");
        return(
            <Modal open={true} className="content-center">
                <div
                    className="flex justify-center items-center self-center mx-auto content-center w-[50vw] bg-white rounded-lg p-4 h-[20vh]"
                >
                    <CircularProgress/>
                </div>
            </Modal>
        )
    }

    return (
        <Modal 
            open={open} 
            onClose={() => 
                {
                    handleClose()
                    setInitialValues({
                            idCategoriaMaterial: -1,
                            nombre: "",
                            descripcion: "",
                            imageData: null,
                            urlmaterial: "",
                      });
                }} 
            className='content-center'>
            <div
                className='flex flex-col justify-center items-center self-center mx-auto content-center w-[35vw] bg-white rounded-lg p-4'
            >
                <ToastContainer />
                <h1 className='w-full text-center text-3xl font-extrabold text-[#233E58] mt-4 pl-3'>Editar Material Educativo: {nombreMaterial}</h1>
                <div className='flex flex-col w-[100%] mt-4'>
                    <label className='text-[#233E58] font-bold text-lg mb-2' htmlFor='name'>Nombre de Material</label>
                    <input
                        type='text'
                        id='nombre'
                        name='nombre'
                        value={formikEditar?.values?.nombre}
                        onChange={formikEditar?.handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                    />
                </div>
                <div className='flex flex-col w-[100%] mt-4'>
                    <label className='text-[#233E58] font-bold text-lg mb-2' htmlFor='name'>Descripción del Material</label>
                    <textarea
                        id='descripcion'
                        name='descripcion'
                        rows={4}
                        value={formikEditar?.values?.descripcion}
                        onChange={formikEditar?.handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded'
                    />
                </div>
                <div className='flex flex-col w-[100%] mt-4'>
                    <label className="text-[#233E58] font-bold text-lg mb-2" htmlFor="category">Categoría del material</label>
                    <select
                        id="idCategoriaMaterial"
                        name="idCategoriaMaterial"
                        value={formikEditar?.values?.idCategoriaMaterial}
                        onChange={handleSelectChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value={-1}>Selecciona una categoría</option>
                        {opcionesRecursos.map((item) => (
                            <option key={item.id} value={parseInt(item.id)}>
                                {item.nombrecategoriamaterial}
                            </option>
                        ))}
                </select>

                    {imagenAvistamiento && (
                        <div className="flex flex-col w-[100%] mt-2">
                            <label className='text-[#233E58] font-bold text-lg mt-2' htmlFor='name'>{(formikEditar?.values?.idCategoriaMaterial == 1 || formikEditar?.values?.idCategoriaMaterial == 3) ? "Ver Archivo Actual" : "Ir al Link Actual"}</label>
                            <button
                                className='bg-[#233E58] w-[50%] text-white font-bold py-2 px-4 rounded-md mx-2 mt-2'
                                onClick={() => window.open(imagenAvistamiento)}
                            >
                                <a href={imagenAvistamiento} target="_blank">{(formikEditar?.values?.idCategoriaMaterial == 1 || formikEditar?.values?.idCategoriaMaterial == 3) ? "Ir al link" : "Ver Archivo"}</a>
                            </button>
                        </div>
                    )}
                    {/* {imagenAvistamiento && (
                        <div className="flex flex-col">
                            <label className='text-[#233E58] font-bold text-lg mt-2' htmlFor='name'>Foto Actual</label>
                            <img
                                src={imagenAvistamiento}
                                className='w-[100px] h-[100px] mt-2 rounded-md object-cover'
                            />
                        </div>
                    )} */}
                </div>
                {renderInputForCategory()}
                <div className='flex flex-row justify-center items-center mt-8'>
                    <button
                        className=' text-white font-bold py-2 px-4 rounded-md mx-2'
                        onClick={formikEditar.handleSubmit}
                        disabled={formikEditar.isSubmitting || !formikEditar.isValid || !formikEditar.dirty}
                        style={{ 
                            cursor: formikEditar.isSubmitting || !formikEditar.isValid || !formikEditar.dirty ? 'not-allowed' : 'pointer',
                            backgroundColor: formikEditar.isSubmitting || !formikEditar.isValid || !formikEditar.dirty ? '#A0AEC0' : '#233E58',
                        }}
                    >
                        Editar
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