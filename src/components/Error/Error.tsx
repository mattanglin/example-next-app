import React from 'react';
import cn from 'classnames';
import style from './Error.module.css';
import { parseError } from './parseError';

export interface ErrorProps extends React.ComponentPropsWithoutRef<'div'> {
  error: any;
  parse?: (error: any) => string;
}

export const Error: React.FC<ErrorProps> = ({
  error,
  parse = parseError,
  className,
  ...rest
}) => (
  <div {...rest} className={cn(className, style.error)}>
    {parse(error)}
  </div>
)
