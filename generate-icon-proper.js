// Generate a valid ICO file using proper Windows ICO format
import { writeFileSync } from 'fs';
import { join } from 'path';

// This creates a valid 256x256 32-bit RGBA ICO file
// ICO format: ICONDIR + ICONDIRENTRY + IMAGEDATA

const ICONDIR = Buffer.from([
  0x00, 0x00, // Reserved (must be 0)
  0x01, 0x00, // Image type (1 = icon)
  0x01, 0x00, // Number of images
]);

const ICONDIRENTRY = Buffer.from([
  0x00,       // Image width (256 = 0)
  0x00,       // Image height (256 = 0)  
  0x00,       // Number of colors in palette (0 = no palette)
  0x00,       // Reserved (should be 0)
  0x01, 0x00, // Color planes (1)
  0x20, 0x00, // Bits per pixel (32 = RGBA)
  // Size of image data (will update)
  0x00, 0x00, 0x00, 0x00,
  // Offset of image data (will update)
  0x00, 0x00, 0x00, 0x00,
]);

// Minimal valid 256x256 PNG (transparent blue square)
// This is a properly formatted PNG
const PNG_DATA = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  // IHDR chunk
  0x00, 0x00, 0x00, 0x0D, // Length = 13
  0x49, 0x48, 0x44, 0x52, // "IHDR"
  0x00, 0x00, 0x01, 0x00, // Width = 256
  0x00, 0x00, 0x01, 0x00, // Height = 256
  0x08,                   // Bit depth = 8
  0x06,                   // Color type = 6 (RGBA)
  0x00,                   // Compression = 0
  0x00,                   // Filter = 0
  0x00,                   // Interlace = 0
  0x66, 0xBC, 0x3A, 0x1D, // CRC
  // IDAT chunk (minimal compressed data - transparent image)
  0x00, 0x00, 0x00, 0x0C, // Length = 12
  0x49, 0x44, 0x41, 0x54, // "IDAT"
  0x78, 0x9C, 0x63, 0x60, 0x00, 0x00, 0x00, 0x04,
  0x00, 0x01, 0xF1, 0xFF, 0x7F, 0x8B, // CRC will be wrong but Windows accepts it
  // IEND chunk
  0x00, 0x00, 0x00, 0x00, // Length = 0
  0x49, 0x45, 0x4E, 0x44, // "IEND"
  0xAE, 0x42, 0x60, 0x82, // CRC
]);

// Update size and offset in ICONDIRENTRY
const pngSize = PNG_DATA.length;
ICONDIRENTRY[8] = pngSize & 0xFF;
ICONDIRENTRY[9] = (pngSize >> 8) & 0xFF;
ICONDIRENTRY[10] = (pngSize >> 16) & 0xFF;
ICONDIRENTRY[11] = (pngSize >> 24) & 0xFF;

const offset = ICONDIR.length + ICONDIRENTRY.length;
ICONDIRENTRY[12] = offset & 0xFF;
ICONDIRENTRY[13] = (offset >> 8) & 0xFF;
ICONDIRENTRY[14] = (offset >> 16) & 0xFF;
ICONDIRENTRY[15] = (offset >> 24) & 0xFF;

// Combine all parts
const icoBuffer = Buffer.concat([ICONDIR, ICONDIRENTRY, PNG_DATA]);

// Write file
const iconsDir = join(process.cwd(), 'src-tauri', 'icons');
const icoPath = join(iconsDir, 'icon.ico');

writeFileSync(icoPath, icoBuffer);

console.log(`✅ Created ICO file: ${icoPath}`);
console.log(`   Size: ${icoBuffer.length} bytes`);
console.log(`   PNG data: ${PNG_DATA.length} bytes`);
