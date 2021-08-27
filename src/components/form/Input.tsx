import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';
import { fieldId, fieldErrorId, parseError } from './util';
import { BaseFieldProps } from './types';

export interface InputProps extends BaseFieldProps, Omit<React.HTMLProps<HTMLInputElement>, 'name'|'label'> {}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  required,
  error: passedError,
  type = 'text',
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = passedError || errors[name]?.message;

  return (
    <FieldWrapper name={name} label={label} required={required} error={error}>
      <input
        {...rest}
        {...register(name)}
        type={type}
        name={name}
        id={fieldId(name)}
        aria-describedby={error ? fieldErrorId(name) : undefined}
        aria-required={required}
      />
    </FieldWrapper>
  )
}