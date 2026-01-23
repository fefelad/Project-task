import { memo } from 'react';
import classNames from 'classnames';
import styles from './Btn.module.css'

export type BtnColor = 'blue' | 'orange';

interface BtnProps {
    children: string;
    color: BtnColor;
    width?: string;
    onClick?: () => void;
    className?: string;
}

export const Btn = memo(({ children, color, width, onClick, className }: BtnProps) => {
  const buttonStyle = width ? { width } : undefined;
  
  return (
    <button 
      className={classNames(styles.Btn, styles[color], className)}
      style={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  )
});

Btn.displayName = 'Btn';
export default Btn;
