// Post-build step for GitHub Pages:
//  - SPA fallback: 404.html = the CSR shell, so deep links to any non-prerendered
//    path still boot the app (which then routes / redirects correctly).
//  - .nojekyll so files/dirs starting with "_" are served.
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const out = 'dist/portfolio/browser';
const shell = join(out, 'index.csr.html');
const fallback = existsSync(shell) ? shell : join(out, 'index.html');

copyFileSync(fallback, join(out, '404.html'));
writeFileSync(join(out, '.nojekyll'), '');

console.log('prepare-pages: wrote 404.html and .nojekyll');
