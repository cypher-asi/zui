import React from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullBleed?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  fullBleed = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        styles.container,
        fullBleed && styles.fullBleed,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
