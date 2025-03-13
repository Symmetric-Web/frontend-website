import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    manualChunks: {
      'react-vendor': ['react', 'react-dom'],
      'router': ['react-router-dom'],
      'framer-motion': ['framer-motion'],
      'icons': ['react-icons']
    }
  },
  plugins: [
    terser({
      compress: {
        passes: 2,
        drop_console: true
      },
      format: {
        comments: false
      }
    })
  ]
}