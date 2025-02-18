/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--primary-50)',
                    100: 'var(--primary-100)',
                    200: 'var(--primary-200)',
                    300: 'var(--primary-300)',
                    400: 'var(--primary-400)',
                    500: 'var(--primary-500)',
                    600: 'var(--primary-600)',
                    700: 'var(--primary-700)',
                    800: 'var(--primary-800)',
                    900: 'var(--primary-900)',
                },
                accent: {
                    50: 'var(--accent-50)',
                    100: 'var(--accent-100)',
                    200: 'var(--accent-200)',
                    300: 'var(--accent-300)',
                    400: 'var(--accent-400)',
                    500: 'var(--accent-500)',
                    600: 'var(--accent-600)',
                    700: 'var(--accent-700)',
                    800: 'var(--accent-800)',
                    900: 'var(--accent-900)',
                },
                success: {
                    500: 'var(--success-500)',
                    600: 'var(--success-600)',
                },
                warning: {
                    500: 'var(--warning-500)',
                    600: 'var(--warning-600)',
                },
                error: {
                    500: 'var(--error-500)',
                    600: 'var(--error-600)',
                },
                dark: {
                    bg: 'var(--dark-bg)',
                    elevated: 'var(--dark-elevated)',
                    border: 'var(--dark-border)',
                    hover: 'var(--dark-hover)',
                    text: 'var(--dark-text)',
                    'text-muted': 'var(--dark-text-muted)'
                },
                theme: {
                    bg: 'var(--bg-primary)',
                    'bg-secondary': 'var(--bg-secondary)',
                    text: 'var(--text-primary)',
                    'text-secondary': 'var(--text-secondary)',
                    border: 'var(--border-color)'
                }
            },
            backgroundColor: {
                dark: 'var(--dark-bg)',
                'dark-elevated': 'var(--dark-elevated)',
                'theme-bg': 'var(--bg-primary)',
                'theme-bg-secondary': 'var(--bg-secondary)'
            },
            textColor: {
                dark: 'var(--dark-text)',
                'dark-muted': 'var(--dark-text-muted)',
                'theme-text': 'var(--text-primary)',
                'theme-text-secondary': 'var(--text-secondary)'
            },
            borderColor: {
                dark: 'var(--dark-border)',
                'theme-border': 'var(--border-color)'
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                glow: '0 0 15px rgb(14 165 233 / 0.5)',
                inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fade-in 300ms cubic-bezier(0, 0, 0.2, 1)',
                'slide-up': 'slide-up 300ms cubic-bezier(0, 0, 0.2, 1)',
                'slide-down': 'slide-down 300ms cubic-bezier(0, 0, 0.2, 1)',
                'scale-in': 'scale-in 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                'bounce': 'bounce 500ms cubic-bezier(0.87, 0, 0.13, 1) infinite',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            transitionTimingFunction: {
                'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'in': 'cubic-bezier(0.4, 0, 1, 1)',
                'out': 'cubic-bezier(0, 0, 0.2, 1)',
                'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'bounce': 'cubic-bezier(0.87, 0, 0.13, 1)',
            },
            transitionDuration: {
                'fast': '150ms',
                DEFAULT: '300ms',
                'slow': '500ms',
                'slower': '1000ms',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, var(--primary-500), var(--primary-600))',
                'gradient-accent': 'linear-gradient(to right, var(--accent-500), var(--accent-600))',
                'gradient-subtle': 'linear-gradient(to right, var(--bg-primary), var(--bg-secondary))',
            },
        },
    },
    plugins: [],
} 