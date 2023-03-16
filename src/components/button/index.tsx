import React from 'react'
import { AuthButtonProps } from './Button.props'
import styles from './Button.module.scss'
import { clsx } from 'clsx'

const Button = ({ children, className, ...props }: AuthButtonProps) => {
  return (
    <button {...props} className={clsx(styles.button, className)}>
      {children}
    </button>
  )
}

export default Button
