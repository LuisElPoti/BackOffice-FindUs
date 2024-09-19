import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoMdMore } from "react-icons/io";

function createData(ID, nombre, rol, estatus) {
    return { ID, nombre, rol, estatus };
}

const rows = [
    createData(1105980, 'Luis Vargas Colon', 'Basico', 'ACTIVO'),
    createData(1105981, 'Rosanna Bautista Minyeti', 'Administrador', 'ACTIVO'),
    createData(1105982, 'William Fernandez Cruz', 'Basico', 'INACTIVO'),
    createData(1105983, 'Cristian Castro Garcia', 'Basico', 'ACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'ACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'ACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', 'Basico', 'INACTIVO'),    
];

function getStatusStyle(estatus) {
    switch (estatus) {
      case 'ACTIVO':
        return { backgroundColor: '#F3F7FD', color: '#2E5AAC', border: '2px solid #89A7E0' };
      case 'INACTIVO':
        return { backgroundColor: '#F3F7FD', color: '#717171', border: '2px solid #CCCCCD' };
      default:
        return { backgroundColor: 'grey', color: 'white' };
    }
  }

export default function MyTable() {
    return (
        <div
            style={{
                padding: '16px',
                zIndex: 10,
                width: '90%',
                height: '70vh',
                overflowY: 'auto',
                margin: 'auto',
                position: 'absolute',
                top: '-120px', // Mueve la tabla hacia arriba para que quede encima del greenBackground
                left: '50%',
                transform: 'translateX(-50%)',
            }}
        >
            <TableContainer 
                component={Paper} 
                sx={{ 
                    width: '100%', 
                    maxHeight: '100%', 
                    overflowY: 'auto', 
                    scrollbarWidth: 'none', 
                    '&::-webkit-scrollbar': { display: 'none' } 
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className="font-bold">ID</TableCell>
                            <TableCell align="left" className="font-bold">Nombre</TableCell>
                            <TableCell align="left" className="font-bold">Rol</TableCell>
                            <TableCell align="center" className="font-bold">Estatus</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.ID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.ID}</TableCell>
                                <TableCell align="left">{row.nombre}</TableCell>
                                <TableCell align="left">{row.rol}</TableCell>
                                <TableCell align="center">
                                    <div className='text-xs border py-1 rounded-sm inline-block px-2' style={getStatusStyle(row.estatus)}>
                                        {row.estatus}
                                    </div>
                                </TableCell>
                                <TableCell align="right"><IoMdMore className='w-5 h-5 cursor-pointer text-[#6B6C7E]'/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
