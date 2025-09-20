import React from 'react';
import styles from './Button.module.css';

const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  return (
    <button
      className={`${styles.button} btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
