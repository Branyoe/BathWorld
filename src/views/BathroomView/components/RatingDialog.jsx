import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MyRating } from './MyRating';
import * as yup from "yup";
import { useFormik } from "formik";
import { addComment } from '../../../DB';
import { useAuth } from '../../../context/authContext';



export default function RatingDialog({bathroom, ratingValue, isOpen, setIsOpen }) {

  const { user } = useAuth();

  
  const commentVlidationSchema = yup.object({
    comment: yup
    .string('solo textor')
    .required('Esto no puede estar vacio')
    .min(4, "mínimo 4 caracteres")
    .max(200, "maximo 200 caracteres")
  });
  
  
  const commentFormik = useFormik({
    initialValues: {
      comment: ""
    },
    validationSchema: commentVlidationSchema,
    onSubmit: async ({ comment }) => {
      await addComment(bathroom.id, user.email, comment, ratingValue);
      commentFormik.resetForm();
      setIsOpen(false);
    }
  });
  
  const handleClose = () => {
    commentFormik.resetForm();
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog fullWidth open={isOpen} onClose={handleClose}>
        <DialogTitle>Cuentanos más</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            <MyRating disable ratingValue={ratingValue} />
          </DialogContentText>
          <TextField
            autoComplete='off'
            id="outlined-multiline-static"
            label="Escribe un comentario"
            multiline
            margin="dense"
            fullWidth
            rows={3}
            name="comment"
            value={commentFormik.values.comment}
            onChange={commentFormik.handleChange}
            error={commentFormik.touched.comment && Boolean(commentFormik.errors.comment)}
            helperText={commentFormik.touched.comment && commentFormik.errors.comment}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={commentFormik.handleSubmit}>Enivar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
