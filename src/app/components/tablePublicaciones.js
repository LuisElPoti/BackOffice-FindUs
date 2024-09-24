import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(ID, nombre, fechaDesaparicion, estatus) {
    return { ID, nombre, fechaDesaparicion, estatus };
}

const rows = [
    createData(1105980, 'Luis Vargas Colon', '14/09/2024', 'ACTIVO'),
    createData(1105981, 'Rosanna Bautista Minyety', '15/09/2024', 'ACTIVO'),
    createData(1105982, 'William Fernandez Cruz', '15/09/2024', 'INACTIVO'),
    createData(1105983, 'Cristian Castro Garcia', '14/10/2024', 'ACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '24/10/2024', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'ACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'ACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'INACTIVO'),
    createData(1105984, 'Dario Contreras Ovalle', '03/11/2024', 'INACTIVO'),    
];

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
                top: '-290px', // Mueve la tabla hacia arriba para que quede encima del greenBackground
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
                            <TableCell align="left" className="font-bold">Fecha desaparición</TableCell>
                            <TableCell align="center" className="font-bold">Estatus</TableCell>
                            <TableCell align="left"></TableCell>
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
                                <TableCell align="left">{row.fechaDesaparicion}</TableCell>
                                <TableCell align="center">
                                    <div className='text-xs text-blueBorder border border-blueBorder px-0.5 py-1 bg-blueInside rounded-sm'>
                                        {row.estatus}
                                    </div>
                                </TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
