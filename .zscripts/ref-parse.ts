import * as fs from 'fs';

const raw = fs.readFileSync('/home/z/my-project/.zscripts/ref-output.txt', 'utf8');

// Split output by target separators
const blocks: { name: string; url: string; json: string | null }[] = [];
const parts = raw.split(/={80}\nTARGET: ([^\n]+) — ([^\n]+)\n={80}\n/);
// parts: [pre, name, url, body, name, url, body...]
for (let i = 1; i < parts.length; i += 3) {
  const name = parts[i].trim();
  const url = parts[i + 1].trim();
  const body = parts[i + 2] ?? '';
  const jsonStart = body.indexOf('{');
  blocks.push({ name, url, json: jsonStart >= 0 ? body.slice(jsonStart) : null });
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…');
}

function analyze(name: string, url: string, json: string | null) {
  console.log('\n' + '#'.repeat(90));
  console.log(`### ${name} — ${url}`);
  console.log('#'.repeat(90));
  if (!json) { console.log('NO JSON'); return; }
  let data: any;
  try { data = JSON.parse(json); } catch (e) {
    // try to trim to valid JSON (trailing separators)
    const cut = json.lastIndexOf('}');
    try { data = JSON.parse(json.slice(0, cut + 1)); } catch (e2) { console.log('JSON PARSE FAILED'); return; }
  }
  const d = data.data ?? data;
  console.log('TITLE:', d.title);
  console.log('DESCRIPTION:', d.description);
  console.log('PUBLISH_TIME:', d.publish_time);

  const html: string = d.html ?? '';

  // Remove scripts/styles/svg/noscript
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' [SVG] ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  // Extract headings with level
  const headingRe = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  console.log('\n--- HEADINGS ---');
  let m: RegExpExecArray | null;
  const seenHead = new Set<string>();
  while ((m = headingRe.exec(cleaned)) !== null) {
    const level = m[1];
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
    if (text && text.length < 300 && !seenHead.has(text)) {
      seenHead.add(text);
      console.log(`  H${level}: ${text}`);
    }
  }

  // Extract nav / link labels
  console.log('\n--- LINK LABELS (nav & CTA) ---');
  const linkRe = /<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  const seenLinks = new Set<string>();
  while ((m = linkRe.exec(cleaned)) !== null) {
    const href = m[1];
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
    const key = `${href}|${text}`;
    if (text && text.length < 80 && !seenLinks.has(key)) {
      seenLinks.add(key);
      console.log(`  [${text}] -> ${href}`);
    }
  }

  // Extract button labels
  console.log('\n--- BUTTONS ---');
  const btnRe = /<button[^>]*>([\s\S]*?)<\/button>/gi;
  const seenBtn = new Set<string>();
  while ((m = btnRe.exec(cleaned)) !== null) {
    const text = decodeEntities(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
    if (text && text.length < 100 && !seenBtn.has(text)) { seenBtn.add(text); console.log('  •', text); }
  }

  // Visible text (paragraphs, spans, divs) - strip tags, collapse whitespace
  console.log('\n--- VISIBLE TEXT (first ~4500 chars) ---');
  const textOnly = decodeEntities(
    cleaned
      .replace(/<(br|hr)[^>]*>/gi, '\n')
      .replace(/<\/(p|div|section|li|h[1-6]|footer|header|blockquote|figcaption)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n+/g, '\n')
  ).trim();
  console.log(textOnly.slice(0, 4500));

  // Section ids/classes for structure hints
  console.log('\n--- SECTION IDS ---');
  const secRe = /<section[^>]*(?:id="([^"]*)")?[^>]*class="([^"]*)"/gi;
  const seenSec = new Set<string>();
  while ((m = secRe.exec(html)) !== null) {
    const id = m[1] ?? '';
    const cls = m[2].split(/\s+/).filter((c) => !/^(section|w-|u-)/.test(c)).slice(0, 8).join(' ');
    const key = id + '|' + cls;
    if (!seenSec.has(key)) { seenSec.add(key); console.log(`  section id="${id}" class="${cls}"`); }
  }

  // Canvas / WebGL hints
  console.log('\n--- TECH HINTS ---');
  const hints = {
    canvas: (html.match(/<canvas/gi) ?? []).length,
    webgl: /webgl/i.test(html),
    three: /three/i.test(html),
    lenis: /lenis/i.test(html),
    gsap: /gsap/i.test(html),
    framer: /framer/i.test(html),
    next: /next\.js|__NEXT_DATA__|_next\//i.test(html),
    fonts_google: /fonts\.googleapis\.com\/css2\?family=([^"&]+)/i.exec(html)?.[1] ?? null,
    fonts_self: (html.match(/\.woff2?/g) ?? []).length,
    videos: (html.match(/<video/gi) ?? []).length,
    iframes: (html.match(/<iframe/gi) ?? []).length,
  };
  console.log(JSON.stringify(hints, null, 2));
}

for (const b of blocks) analyze(b.name, b.url, b.json);
