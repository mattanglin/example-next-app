import React from 'react';
import { Error } from '../Error/Error';
import styles from './FieldWrapper.module.css';
import { BaseFieldProps } from './types';
import { fieldId, fieldErrorId } from './util';

export interface FieldWrapperProps extends BaseFieldProps {
  children: React.ReactNode;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  name,
  label,
  required,
  children,
  error,
}) => (
  <div className={styles.wrapper}>
    {label && (
      <label className={styles.label} htmlFor={fieldId(name)}>
        {label}
        {required && <sup aria-hidden className={styles.required}>*</sup>}
      </label>
    )}
    <div className={styles.field}>
      {children}
    </div>
    {error && (
      <Error
        id={fieldErrorId(name)}
        className={styles.error}
        error={error}
      />
    )}
  </div>
);
