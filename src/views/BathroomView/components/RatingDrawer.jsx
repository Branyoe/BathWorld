import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import currentBathroomStore from '../../../stores/currentBathroomStore'
import BathroomView from '..';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const RatingDrawer = () =>  {
  const { isOpen, setIsOpen, data } = currentBathroomStore(state => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
    data: state.data
  }))

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <BathroomView bathroom={data} setOpen={handleClose}/>
      </Dialog>
    </div>
  );
}
