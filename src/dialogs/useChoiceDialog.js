import { useState } from 'react';

function useChoiceDialog({ choices }) {
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

  for (var choice of choices) {
    const action = choice.action;
    choice.action = () => {
      action && action(options);
      closeDialog();
    };
  }

  return [ isDialogOpen, openDialog, closeDialog ];
}

export default useChoiceDialog;
