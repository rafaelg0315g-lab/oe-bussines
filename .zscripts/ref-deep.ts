import * as fs from 'fs';

const raw = fs.readFileSync('/home/z/my-project/.zscripts/ref-output.txt', 'utf8');
const parts = raw.split(/={80}\nTARGET: ([^\n]+) — ([^\n]+)\n={80}\n/);

for (let i = 1; i < parts.length; i += 3) {
  const name = parts[i].trim();
  const body = parts[i + 2] ?? '';
  const jsonStart = body.indexOf('{');
  if (jsonStart < 0) continue;
  let data: any;
  try { data = JSON.parse(body.slice(jsonStart)); } catch (e) { try { data = JSON.parse(body.slice(jsonStart, body.lastIndexOf('}') + 1)); } catch (e2) { continue; } }
  const d = data.data ?? data;
  const html: string = d.html ?? '';

  console.log('\n' + '#'.repeat(90));
  console.log(`### DEEP DIVE: ${name}`);
  console.log('#'.repeat(90));

  // All meta tags
  console.log('\n--- META TAGS ---');
  const metaRe = /<meta[^>]+>/gi;
  let m: RegExpExecArray | null;
  while ((m = metaRe.exec(html)) !== null) console.log('  ' + m[0].slice(0, 220));

  // body / html classes
  const htmlTag = /<html[^>]*>/i.exec(html)?.[0];
  const bodyTag = /<body[^>]*>/i.exec(html)?.[0];
  console.log('\nHTML TAG:', htmlTag);
  console.log('BODY TAG:', bodyTag);

  // External stylesheets & scripts
  console.log('\n--- STYLESHEETS/SCRIPTS SRC ---');
  const srcRe = /(?:<link[^>]+href="(https?:\/\/[^"]+\.(?:css|js)[^"]*")|<script[^>]+src="([^"]+)")/gi;
  const seenSrc = new Set<string>();
  while ((m = srcRe.exec(html)) !== null) {
    const s = (m[1] ?? m[2] ?? '').slice(0, 140);
    if (!seenSrc.has(s)) { seenSrc.add(s); console.log('  ', s); }
  }

  // Inline style blocks: font-family, colors, keyframes names
  const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((x) => x[1]);
  const allCss = styleBlocks.join('\n');
  console.log('\n--- INLINE CSS SIZE:', allCss.length, 'chars across', styleBlocks.length, 'blocks');

  const fontFams = [...new Set([...allCss.matchAll(/font-family:\s*([^;}]+)/gi)].map((x) => x[1].trim().slice(0, 90)))];
  console.log('\nFONT FAMILIES (inline css):', fontFams.slice(0, 12));

  const colors = [...new Set([...allCss.matchAll(/(?:color|background(?:-color)?|fill|stroke|border-color)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/gi)].map((x) => x[1]))];
  console.log('\nCOLOR VALUES (top 30):', colors.slice(0, 30));

  const vars = [...new Set([...allCss.matchAll(/--([a-z-]+)\s*:\s*([^;}]{1,60})/gi)].map((x) => `--${x[1]}: ${x[2].trim()}`))];
  console.log('\nCSS VARIABLES (top 40):', vars.slice(0, 40));

  const keyframes = [...new Set([...allCss.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g)].map((x) => x[1]))];
  console.log('\nKEYFRAMES:', keyframes.slice(0, 30));

  // data-attributes used (reveal systems etc.)
  const dataAttrs = [...new Set([...html.matchAll(/data-([a-z-]+)=/gi)].map((x) => 'data-' + x[1]))];
  console.log('\nDATA ATTRIBUTES:', dataAttrs.slice(0, 30));

  // class names frequency (top 40, excluding utility-ish)
  const clsCount = new Map<string, number>();
  for (const c of html.matchAll(/class="([^"]+)"/g)) {
    for (const token of c[1].split(/\s+/)) {
      if (!token) continue;
      clsCount.set(token, (clsCount.get(token) ?? 0) + 1);
    }
  }
  const topCls = [...clsCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 45);
  console.log('\nTOP CLASS NAMES:', topCls.map(([c, n]) => `${c}(${n})`).join('  '));
}
