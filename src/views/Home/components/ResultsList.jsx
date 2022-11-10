import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ListItemButton } from '@mui/material';
import ErrorComponent from './ErrorComponent';
import SearchErrorSource from '../../../assets/searchErrorSource.svg'

export const ResultsList = ({ searchValue, data, onItemClick }) => {

  const filterData = data.filter(e => {
    if (searchValue !== '') return e.name.toLowerCase().includes(searchValue.toLowerCase());
    return null;
  })

  const contentManager = () => {
    if (filterData.length) return (
      <>
        {filterData.map(bathroom => (
          <div key={bathroom.id}>
            <ListItemButton onClick={() => onItemClick(bathroom)}>
              <ListItemText primary={bathroom.name} />
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </>
    )
    return (
      <ErrorComponent
        msg="Sin resultados"
        source={SearchErrorSource}
        imgSize="60%"
      />
    );
  }

  return (
    <List
      sx={{
        width: '100%',
        borderRadius: "7px",
        mx: 1,
        maxHeight: '30vh',
        bgcolor: 'background.paper',
        overflow: "scroll",
        transition: "all .3s",
        boxShadow: "0px 10px 26px -3px rgba(0, 0, 0, 0.31)",
      }}
    >
      {contentManager()}
    </List>
  )
}
