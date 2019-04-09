import { useState } from 'react';

function useConfirmDialog({ confirmAction }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [options, setOptions] = useState();
  
  const openDialog = (options) => {
    if (options) setOptions(options);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setOptions(undefined);
  };

  const confirmDialog = () => {
    confirmAction && confirmAction(options);
    closeDialog();
  }

  return [ isDialogOpen, openDialog, closeDialog, confirmDialog ];
}

export default useConfirmDialog;
