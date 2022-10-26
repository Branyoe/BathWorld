import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import currentBathroomStore from '../../../stores/currentBathroomStore'
import BathroomView from '..';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const RatingDrawer = ({isOpen, setIsOpen}) =>  {

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
        <h1>sex</h1>
      </Dialog>
    </div>
  );
}
