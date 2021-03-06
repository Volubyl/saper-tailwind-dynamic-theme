module.exports = {
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
    },
    colors: {
      gray: {
        50: '#FFFFFF',
        100: '#F7F7FA',
        150: '#E8EAF1',
        200: '#C4CBDC',
        300: '#8A98BA',
        400: '#2A2E43',
      },
      community: {
        primary: 'var(--community-primary)',
        secondary: 'var(--community-secondary)',
      },
      error: {
        DEFAULT: '#CB002E',
      },
      success: {
        DEFAULT: '#00CA00',
      },
      sso: {
        vimeet: '#2D9BD8',
        linkedin: '#1582BB',
      },
    },
    extend: {
      colors: {},
      spacing: {
        144: '36rem',
      },
      margin: {
        '-13': '-3.3rem',
      },
      boxShadow: {
        full: '0 0 15px 5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: {},
  plugins: [],
}
