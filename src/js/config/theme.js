export const theme = {
  colors: {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#5340ff', // Main brand color from logomaker.ai
      600: '#4338ca',
      700: '#3730a3',
      800: '#312e81',
      900: '#1e1b4b',
      dark: {
        50: '#1a1836',
        100: '#1e1b4b',
        200: '#2e2a5f',
        300: '#3730a3',
        400: '#4338ca',
        500: '#5340ff',
        600: '#6d5aff',
        700: '#8778ff',
        800: '#a193ff',
        900: '#bbb1ff'
      }
    },
    accent: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337'
    },
    success: {
      500: '#22c55e',
      600: '#16a34a',
    },
    warning: {
      500: '#eab308',
      600: '#ca8a04',
    },
    error: {
      500: '#ef4444',
      600: '#dc2626',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    dark: {
      bg: '#18191A',
      elevated: '#242526',
      text: '#E4E6EB',
      'text-muted': '#B0B3B8',
      border: '#3A3B3C',
      hover: '#4E4F50'
    },
  },

  // Animation durations
  duration: {
    fast: '150ms',
    default: '300ms',
    slow: '500ms',
    slower: '1000ms'
  },

  // Animation easings from logomaker
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.87, 0, 0.13, 1)',
  },

  // Reusable animations
  animations: {
    fadeIn: {
      name: 'fadeIn',
      duration: '0.5s',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    slideUp: {
      name: 'slideUp',
      duration: '0.5s',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    scaleIn: {
      name: 'scaleIn',
      duration: '0.3s',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    slideInRight: {
      from: {
        transform: 'translateX(30px)',
        opacity: '0'
      },
      to: {
        transform: 'translateX(0)',
        opacity: '1'
      }
    },
    slideInLeft: {
      from: {
        transform: 'translateX(-30px)',
        opacity: '0'
      },
      to: {
        transform: 'translateX(0)',
        opacity: '1'
      }
    }
  },

  // Common transitions
  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out'
  },

  // Gradients
  gradients: {
    subtle: 'linear-gradient(to right, var(--dark-100), var(--dark-200))',
    primary: 'linear-gradient(to right, var(--primary-dark-500), var(--primary-dark-600))',
    accent: 'linear-gradient(to right, var(--accent-dark-500), var(--accent-dark-600))',
    glow: 'radial-gradient(circle at center, var(--primary-dark-400/0.15), transparent 70%)',
    card: 'linear-gradient(to bottom right, var(--dark-100), var(--dark-200))',
    mixed: 'linear-gradient(to right, var(--primary-dark-500), var(--accent-dark-500))'
  },

  // Shadows with the same feel as logomaker
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.25)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
    glow: '0 0 15px var(--primary-dark-500/0.5)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.25)',
  },

  // Border radiuses
  radius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Typography scale
  typography: {
    fonts: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'Inter, system-ui, -apple-system, sans-serif',
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },

  // Spacing scale
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },

  // Z-index scale
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1060',
  },

  // Form control styles
  formControls: {
    input: {
      background: 'var(--bg-secondary)',
      text: 'var(--text-primary)',
      border: 'var(--border-color)',
      focusBorder: 'var(--primary-500)',
      hoverBorder: 'var(--primary-500)',
      placeholder: 'var(--text-secondary)',
      disabled: {
        background: 'var(--bg-primary)',
        text: 'var(--text-secondary)'
      }
    },
    select: {
      background: 'var(--bg-secondary)',
      text: 'var(--text-primary)',
      border: 'var(--border-color)',
      focusBorder: 'var(--primary-500)',
      hoverBorder: 'var(--primary-500)',
      placeholder: 'var(--text-secondary)',
      option: {
        background: 'var(--bg-secondary)',
        text: 'var(--text-primary)',
        selectedBackground: 'var(--primary-500)',
        selectedText: '#ffffff',
        hoverBackground: 'var(--primary-100)'
      }
    }
  },
};

// Animation keyframes
export const keyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Form Control Base Styles */
  .form-input,
  .form-select,
  .form-textarea {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 0.75rem;
    width: 100%;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Placeholder Styles */
  .form-input::placeholder,
  .form-select::placeholder,
  .form-textarea::placeholder,
  .form-select option[value=""] {
    color: var(--text-secondary);
    opacity: 0.7;
  }

  /* Focus States */
  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 1px var(--primary-500);
  }

  /* Hover States */
  .form-input:hover:not(:disabled),
  .form-select:hover:not(:disabled),
  .form-textarea:hover:not(:disabled) {
    border-color: var(--primary-500);
  }

  /* Select Specific Styles */
  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.7rem center;
    background-size: 1em;
    padding-right: 2.5rem;
  }

  .form-select option {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    padding: 0.5rem;
  }

  .form-select option:first-child {
    color: var(--text-secondary);
    opacity: 0.7;
  }

  .form-select option:checked {
    background-color: var(--primary-500);
    color: white;
  }

  /* Disabled States */
  .form-input:disabled,
  .form-select:disabled,
  .form-textarea:disabled {
    background-color: var(--bg-primary);
    color: var(--text-secondary);
    cursor: not-allowed;
  }
`; 