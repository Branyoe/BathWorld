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



export default function RatingDialog({setShowRatingInp, setLabel, setHasComment ,bathroom, setRatingValue ,ratingValue, isOpen, setIsOpen }) {

  const { user } = useAuth();

  
  const commentVlidationSchema = yup.object({
    comment: yup
    .string('Solo texto')
    .required('Esto no puede estar vacío')
    .min(4, "Mínimo 4 caracteres")
    .max(200, "Máximo 200 caracteres")
  });
  
  
  const commentFormik = useFormik({
    initialValues: {
      comment: ""
    },
    validationSchema: commentVlidationSchema,
    onSubmit: ({ comment }) => {
      const newComment = {
        bathroomId: bathroom.id,
        userEmail: user.email,
        comment,
        ratingValue,
        date: Date.now()
      }
      addComment(newComment);
      setShowRatingInp(true);
      setHasComment([newComment]);
      commentFormik.resetForm();
      setIsOpen(false);
    }
  });
  
  const handleClose = () => {
    commentFormik.resetForm();
    setRatingValue(0);
    setIsOpen(false);
    setLabel(false);
  };

  return (
    <div>
      <Dialog fullWidth open={isOpen} onClose={handleClose}>
        <DialogTitle>Cuéntanos más</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            <MyRating disable ratingValue={ratingValue} />
          </DialogContentText>
          <TextField
            autoFocus
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={commentFormik.handleSubmit}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
