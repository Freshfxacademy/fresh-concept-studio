import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Signature 3D Shutter-Press Button Component (Section 5)
 *
 * Rest state: solid fill, offset shadow (shadow-btn-rest)
 * Hover: lifts slightly (-translate-y-0.5)
 * Active/press: drops down (translate-y-1, shadow compressed) with tactile click feel
 * Release: springs back with Framer Motion spring kinematics
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  href,
  onClick,
  className = '',
  target,
  rel,
  disabled = false,
  type = 'button',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-accent text-white border border-accent/20 shadow-btn-rest hover:shadow-btn-press hover:-translate-y-0.5 active:translate-y-1 active:shadow-none',
    secondary:
      'bg-ink text-white border border-ink shadow-btn-rest hover:shadow-btn-press hover:-translate-y-0.5 active:translate-y-1 active:shadow-none',
    outline:
      'bg-white text-ink border border-line shadow-sm hover:border-ink/40 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none',
    ghost:
      'bg-transparent text-ink hover:bg-bg-alt border border-transparent active:translate-y-0.5',
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon
          className={`${
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
          } shrink-0 transition-transform duration-150 group-hover:scale-105`}
        />
      )}
      <span className="relative z-10 leading-none font-medium">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon
          className={`${
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
          } shrink-0 transition-transform duration-150 group-hover:translate-x-0.5`}
        />
      )}
    </>
  );

  const combinedClass = `inline-flex items-center justify-center rounded-lg font-display font-semibold transition-all duration-150 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={combinedClass}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
