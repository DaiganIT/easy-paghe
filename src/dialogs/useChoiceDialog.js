import { useState } from 'react';

function useChoiceDialog({ choices }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  for (var choice of choices) {
    const action = choice.action;
    choice.action = () => {
      action && action();
      closeDialog();
    };
  }

  return [ isDialogOpen, openDialog, closeDialog ];
}

export default useChoiceDialog;
