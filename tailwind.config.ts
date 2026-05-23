import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        quantum: {
          ink: '#08111f',
          panel: '#0f1b2d',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          amber: '#f59e0b'
        }
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.16)'
      }
    }
  },
  plugins: []
};

export default config;
