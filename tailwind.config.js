/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          cream: '#F5E6D3',
          brown: '#3E2723',
          darkBrown: '#2C1810',
          rustOrange: '#D84315',
          sageGreen: '#558B2F',
          mustard: '#F9A825',
          dustyBlue: '#3D5A80',
          forestGreen: '#1B5E20',
          gold: '#FFD54F',
          goldenBrown: '#BF8F00',
          burnedSienna: '#8D3C1B',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      backgroundImage: {
        'film-grain': "url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 200 200%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter id%3D%22noiseFilter%22%3E%3CfeTurbulence type%3D%22fractalNoise%22 baseFrequency%3D%229%22 numOctaves%3D%224%22 result%3D%22noise%22 /%3E%3C/filter%3E%3Crect width%3D%22200%22 height%3D%22200%22 fill%3D%22%23000%22 opacity%3D%220.05%22 filter%3D%22url%28%23noiseFilter%29%22 /%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
