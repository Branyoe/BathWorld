import React from 'react';
import { IconButton, Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../index.css';

const BathItem = ({ name, address, onEdit, onDelete }) => {
  return (
    <Card className="bath-item">
      <CardContent className="bath-content">
        <Typography variant="h6" component="h3">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {address}
        </Typography>
      </CardContent>
      <div className="bath-item-actions">
        <IconButton onClick={onEdit} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default BathItem;