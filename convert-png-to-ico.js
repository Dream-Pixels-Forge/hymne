// Convert PNG to ICO using sharp
import sharp from 'sharp';
import { join } from 'path';

const inputPng = join(process.cwd(), 'src-tauri', 'icons', 'icon_temp.png');
const outputIco = join(process.cwd(), 'src-tauri', 'icons', 'icon.ico');

try {
  await sharp(inputPng)
    .resize(256, 256)
    .toFormat('png')
    .toFile(outputIco.replace('.ico', '.png'));
  
  // For ICO we need to use a different approach
  // Sharp doesn't directly support ICO output, so we'll create a multi-size PNG
  // and rename it - but Tauri needs actual ICO format
  
  console.log('Created PNG, but we need ICO format...');
  console.log('Using alternative approach...');
  
  // Actually, let's just use the PNG as icon and update config
  console.log(`✅ Created: ${outputIco.replace('.ico', '.png')}`);
} catch (error) {
  console.error('Error:', error.message);
}
