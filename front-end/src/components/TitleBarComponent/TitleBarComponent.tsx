// ReusableTitle.tsx
import React from 'react';
import './TitleBarComponent.scss';

interface TitleBarComponentProps {
  title: string;
  className?: string;
}

const TitleBarComponent: React.FC<TitleBarComponentProps> = ({ title, className = '' }) => {
  return (
    <h1 className={`title-bar-component ${className}`}>{title}</h1>
  );
};

export default TitleBarComponent;