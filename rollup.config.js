import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
  ],
  plugins: [
    external(),
    resolve({
      browser: true
    }),
    typescript({
      clean: true,
      exclude: [
        '**/__tests_/**'
      ]
    }),
    commonjs({
      include: ['node_modules/**'],
      exclude: [
        '**/*.stories.js',
        '**/__tests__/**'
      ],
      namedExports: {
        'node_modules/react/react.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    terser()
  ]
};