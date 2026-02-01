import React from 'react';
import './Card.css';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined';
  /** Enable hover effect */
  hoverable?: boolean;
  /** Padding size */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  /** Align footer content */
  align?: 'left' | 'center' | 'right' | 'space-between';
}

export interface CardImageProps {
  src: string;
  alt: string;
  /** Image position */
  position?: 'top' | 'bottom';
  /** Image height */
  height?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  padding = 'medium',
  className = '',
  onClick,
}) => {
  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hoverable ? 'card--hoverable' : '',
    onClick ? 'card--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={classNames}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </article>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <header className={`card__header ${className}`}>{children}</header>
);

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`card__body ${className}`}>{children}</div>
);

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  align = 'left',
}) => (
  <footer className={`card__footer card__footer--${align} ${className}`}>{children}</footer>
);

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  position = 'top',
  height = '200px',
  className = '',
}) => (
  <div
    className={`card__image card__image--${position} ${className}`}
    style={{ height }}
  >
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

export default Card;
