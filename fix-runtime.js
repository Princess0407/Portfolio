import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const functionsDir = path.join(__dirname, '.vercel', 'output', 'functions');

if (fs.existsSync(functionsDir)) {
  const entries = fs.readdirSync(functionsDir, { withFileTypes: true });
  let fixedCount = 0;

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.endsWith('.func')) {
      const configPath = path.join(functionsDir, entry.name, '.vc-config.json');
      if (fs.existsSync(configPath)) {
        try {
          const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          
          // Force Node 24 runtime, ignoring whatever Astro outputted
          config.runtime = 'nodejs24.x';
          
          fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
          console.log(`✅ Successfully forced ${entry.name} to use nodejs24.x runtime`);
          fixedCount++;
        } catch (error) {
          console.error(`❌ Failed to update ${configPath}:`, error);
        }
      }
    }
  }

  if (fixedCount === 0) {
    console.log('⚠️ No serverless functions found to fix.');
  }
} else {
  console.log('⚠️ Vercel output functions directory not found. Skipping runtime fix.');
}
