import React from 'react';
import { useForm, UseFormProps, FormProvider, SubmitHandler } from 'react-hook-form';

export interface FormProps<T> extends UseFormProps<T> {
  onSubmit?: SubmitHandler<T>;
  children?: React.ReactNode;
}

export function Form<FormValues extends {}>({
  children,
  onSubmit = () => undefined,
  ...rest
}: FormProps<FormValues>) {
  const methods = useForm<FormValues>(rest);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}