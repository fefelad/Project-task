import { memo } from 'react';
import classNames from 'classnames';
import { fixHangingPrepositions } from '../../lib/typography/fixHangingPrepositions';
import styles from './Btn.module.css'

export type BtnColor = 'blue' | 'orange';

interface BtnProps {
    children: string;
    color: BtnColor;
    width?: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset'; 
    disabled?: boolean; 
    hasBackground?: boolean;
}

export const Btn = memo(({ 
    children, 
    color, 
    width, 
    onClick, 
    className, 
    type = 'button',
    disabled = false,
    hasBackground = true
}: BtnProps) => {
  const buttonStyle = width ? { width } : undefined;
  
  return (
    <button 
      className={classNames(styles.Btn, hasBackground && styles[color], !hasBackground && styles.noBackground, className)}
      style={buttonStyle}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {fixHangingPrepositions(children)}
    </button>
  )
});

Btn.displayName = 'Btn';
export default Btn;