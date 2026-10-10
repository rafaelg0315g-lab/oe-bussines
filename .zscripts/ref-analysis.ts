import ZAI from 'z-ai-web-dev-sdk';

const URLS: { name: string; url: string }[] = [
  { name: 'velmax.llc', url: 'https://www.velmax.llc/' },
  { name: 'edolus.com', url: 'https://edolus.com/' },
];

async function readOne(zai: any, name: string, url: string) {
  try {
    const result = await zai.functions.invoke('page_reader', { url });
    return { name, url, ok: true, result };
  } catch (err: any) {
    return { name, url, ok: false, error: String(err?.message ?? err) };
  }
}

async function main() {
  const zai = await ZAI.create();

  for (const target of URLS) {
    console.log('='.repeat(80));
    console.log(`TARGET: ${target.name} — ${target.url}`);
    console.log('='.repeat(80));
    const out = await readOne(zai, target.name, target.url);
    if (out.ok) {
      console.log(JSON.stringify(out.result, null, 2));
    } else {
      console.log(`FAILED: ${out.error}`);
    }
    console.log('\n');
  }
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
