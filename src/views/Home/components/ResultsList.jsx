import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ListItemButton } from '@mui/material';

export const ResultsList = ({ searchValue, data, onItemClick }) => {

  const filterData = data.filter(e => {
    if (searchValue !== '') return e.name.toLowerCase().includes(searchValue.toLowerCase());
    return null;
  })


  if (filterData.length) return (
    <List
      sx={{ width: '100%', maxHeight: '30vh', bgcolor: 'background.paper', overflow: "scroll" }}
    >
      {filterData.map(bathroom => (
        <div key={bathroom.id}>
          <ListItemButton onClick={
            // () => {
            //   navigator(`/bathroom/${bathroom.id}`);
            // }
            () => {
              onItemClick(bathroom);
            }
          }>
            <ListItemText primary={bathroom.name} />
          </ListItemButton>
          <Divider />
        </div>
      ))}
    </List>
  );
}
