import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  
  // Copy index.html to dist
  const distDir = join(__dirname, 'dist');
  mkdirSync(distDir, { recursive: true });
  
  const htmlSource = join(__dirname, 'index.html');
  const htmlDest = join(distDir, 'index.html');
  
  if (readFileSync(htmlSource)) {
    writeFileSync(htmlDest, readFileSync(htmlSource, 'utf-8'));
    console.log('✅ Copied index.html to dist');
  }
  
  console.log('✅ Build complete!');
} else {
  // Development watch mode
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('👀 Watching for changes...');
}
