import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../Button/Button';

export interface SubmitButtonProps {
  label?: React.ReactNode;
  submittingLabel?: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = 'Submit',
  submittingLabel = 'Submitting...',
}) => {
  const methods = useFormContext();
  const { isSubmitting } = methods.formState;

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? submittingLabel : label}
    </Button>
  )
};
