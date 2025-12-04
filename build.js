import * as esbuild from 'esbuild';

const isProduction = process.env.NODE_ENV === 'production';

const buildOptions = {
  entryPoints: ['index.tsx'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  target: 'es2020',
  platform: 'browser',
  jsx: 'automatic',
  sourcemap: !isProduction,
  minify: isProduction,
  // External dependencies that come from CDN
  external: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'framer-motion'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
  },
};

if (isProduction) {
  // Production build
  await esbuild.build(buildOptions);
  console.log('✅ Build complete!');
} else {
  // Development watch mode
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('👀 Watching for changes...');
}
