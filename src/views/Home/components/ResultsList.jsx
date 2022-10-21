import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ListItemButton } from '@mui/material';
import { BathroomsContext } from '../../../context';
import currentBathroomStore from '../../../stores/currentBathroomStore';

export const ResultsList = ({ inpValue }) => {
  const {bathrooms} = React.useContext(BathroomsContext);
  const { setIsOpen, setData } = currentBathroomStore(state => ({
    setIsOpen: state.setIsOpen,
    setData: state.setData
  }))

  const filterData = bathrooms.filter(e => {
    if (inpValue !== '') return e.name.toLowerCase().includes(inpValue.toLowerCase());
    return null;
  })


  if (filterData.length) return (
    <List
      sx={{ width: '100%', maxHeight: '30vh', bgcolor: 'background.paper', overflow: "scroll" }}
    >
      {filterData.map(bathroom => (
        <div key={bathroom.id}>
          <ListItemButton onClick={
            () => {
              setIsOpen(true);
              setData(bathroom);
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
