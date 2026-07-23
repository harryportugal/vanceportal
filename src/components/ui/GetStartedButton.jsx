import React from 'react';
import { ChevronRight } from 'lucide-react';

export function GetStartedButton({
  children = 'Get Started',
  icon: Icon = ChevronRight,
  onClick,
  variant = 'primary',
  style,
  as = 'button',
  href,
  target,
  rel
}) {
  const isPrimary = variant === 'primary';
  const className = `vance-getstarted-btn ${isPrimary ? 'primary' : ''}`;

  if (as === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={{ textDecoration: 'none', ...style }}
      >
        <span className="vance-getstarted-text">{children}</span>
        <span className="vance-getstarted-badge">
          <Icon size={16} strokeWidth={2} />
        </span>
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={style}
    >
      <span className="vance-getstarted-text">{children}</span>
      <span className="vance-getstarted-badge">
        <Icon size={16} strokeWidth={2} />
      </span>
    </button>
  );
}
