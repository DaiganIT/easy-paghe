import { useState } from 'react';

function useConfirmDialog({ confirmAction }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmDialog = () => {
    confirmAction && confirmAction();
    closeDialog();
  }

  return [ isDialogOpen, openDialog, closeDialog, confirmDialog ];
}

export default useConfirmDialog;
