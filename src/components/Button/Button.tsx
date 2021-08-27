import React from 'react';
import styles from './Button.module.css';

export const Button: React.FC<React.ComponentPropsWithoutRef<'button'>> = ({
  className = '',
  ...rest
}) => (
  <button
    {...rest}
    className={`${className} ${styles.button}`}
  />
)