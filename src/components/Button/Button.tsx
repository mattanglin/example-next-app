import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(function Button({
  className = '',
  ...rest
}, ref) {
  return (
    <button
      ref={ref}
      {...rest}
      className={`${className} ${styles.button}`}
    />
  )
});