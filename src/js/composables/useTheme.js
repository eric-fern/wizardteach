import { theme } from '../config/theme'

/**
 * Theme Composable
 * 
 * Provides consistent access to theme values across components.
 * Instead of using CSS variables directly, components can use this composable
 * to access theme values in a type-safe way.
 */
export function useTheme() {
  // Color getters
  const getColor = (path) => {
    const parts = path.split('.')
    let value = theme.colors
    for (const part of parts) {
      value = value[part]
    }
    return value
  }

  // Animation getters
  const getDuration = (key) => theme.duration[key]
  const getEasing = (key) => theme.easing[key]
  const getAnimation = (key) => theme.animations[key]

  // Form control styles
  const getFormStyle = (type, state = 'default') => {
    const base = theme.formControls[type]
    return state === 'default' ? base : base[state]
  }

  // Common style objects
  const getCommonStyles = {
    input: {
      backgroundColor: theme.formControls.input.background,
      color: theme.formControls.input.text,
      borderColor: theme.formControls.input.border,
      transition: theme.transitions.default
    },
    card: {
      backgroundColor: theme.colors.dark.bg,
      color: theme.colors.dark.text,
      borderColor: theme.colors.dark.border,
      boxShadow: theme.shadows.default
    }
  }

  return {
    getColor,
    getDuration,
    getEasing,
    getAnimation,
    getFormStyle,
    getCommonStyles,
    theme // Direct access to theme object if needed
  }
} 