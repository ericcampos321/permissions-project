import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Checkbox, Paper } from '@mui/material';
import api from '@/api/api';

interface IData {
  _id: string,
  name: string,
  description: string,
  active: boolean,
  roles: {
    _id: string,
    name: string,
    description: string,
    code: string
  }
}

interface TableProps {
  list: [],
  column: [],
  limit: number,
  limits: number[],
  view: (ref: string) => void,
  edit: (ref: string) => void,
  updatePermissionActive: (ref: string, active: boolean) => void
}

const CollapsibleTable = (props: TableProps) => {

  return (
    <TableContainer component={Paper} className='bg-gray-50 overflow-auto' style={{ maxHeight: '600px', height: '600px' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ position: 'sticky', top: '0', background: '#f9f9f9', zIndex: 1 }}>
            {
              props.column.map(col => (
                <TableCell key={col} style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }} align='left'>{col}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((row: IData) => (
            <TableRow
              key={row._id}
              sx={{ border: 0 }}
              hover
            >
              <TableCell>
                <span id='buttons' style={{ display: 'flex', gap: '1px' }}>
                  <button onClick={() => props.view(row._id)} title='Vizualizar informações do cliente' style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} ><VisibilityIcon style={{ cursor: 'pointer', fontSize: 17 }} htmlColor='#ffae60' fontSize='large' /></button>
                  <button onClick={() => props.edit(row._id)} title='Editar informações do cliente' style={{ background: 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }} ><EditIcon style={{ cursor: 'pointer', fontSize: 17 }} htmlColor='#767dff' fontSize='large' /></button>
                </span>
              </TableCell>
              <TableCell sx={{ textAlign: 'left' }} >{row.name ? row.name : '--'}</TableCell>
              <TableCell sx={{ textAlign: 'left' }} >{row.description ? row.description : '--'}</TableCell>
              <TableCell sx={{ textAlign: 'right' }} >
                <span id='buttons' style={{ display: 'flex', gap: '1px' }}>
                  <Checkbox value={row._id} onChange={(e) => props.updatePermissionActive(row._id, row.active ? false : true)} color="primary" checked={row.active ? true : false} />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
