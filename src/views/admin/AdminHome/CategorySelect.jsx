import React from 'react';
import { makeStyles } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
  },
  label: {
    marginLeft: theme.spacing(2),
  },
}));

const CategorySelect = () => {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className={classes.root}>
      <InputLabel id="category-label" className={classes.label}>Categoría</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        value={category}
        label="Categoría"
        onChange={handleChange}
      >
        <MenuItem value="">Ninguna</MenuItem>
        <MenuItem value="baños">Baños</MenuItem>
        <MenuItem value="cocinas">Cocinas</MenuItem>
        <MenuItem value="habitaciones">Habitaciones</MenuItem>
      </Select>
    </div>
  );
};

export default CategorySelect;
