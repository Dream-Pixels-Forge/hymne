// Generate a simple placeholder ICO file
// This creates a basic 256x256 PNG-based ICO for development

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal valid ICO file header (256x256, 32-bit RGBA)
// This is a simple transparent placeholder icon
const icoHeader = Buffer.from([
  0x00, 0x00, // Reserved (must be 0)
  0x01, 0x00, // Image type (1 = icon)
  0x01, 0x00, // Number of images
  0x00,       // Image width (256 = 0x00)
  0x00,       // Image height (256 = 0x00)
  0x00,       // Color palette
  0x00,       // Reserved
  0x01, 0x00, // Color planes
  0x20, 0x00, // Bits per pixel (32)
]);

// Simple 256x256 PNG (1x1 pixel scaled, blue square)
const pngData = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  // IHDR chunk (13 bytes)
  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00,
  0x01, 0x03, 0x00, 0x00, 0x00, 0x66, 0xBC, 0x3A, 0x1D,
  // PLTE chunk (3 bytes - blue color)
  0x00, 0x00, 0x00, 0x03, 0x50, 0x4C, 0x54, 0x45,
  0x00, 0x80, 0xFF, 0xBF, 0x7A, 0xA4, 0x27,
  // IDAT chunk (compressed pixel data)
  0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, 0x54,
  0x78, 0x9C, 0x63, 0x60, 0x00, 0x00, 0x00, 0x04,
  0x00, 0x01, 0x4B, 0x59, 0x8D, 0x8B,
  // IEND chunk
  0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44,
  0xAE, 0x42, 0x60, 0x82,
]);

// ICO directory entry
const icoDir = Buffer.from([
  0x00,       // Image width
  0x00,       // Image height
  0x00,       // Colors
  0x00,       // Reserved
  0x01, 0x00, // Color planes
  0x20, 0x00, // Bits per pixel
  // PNG data size
  (pngData.length & 0xFF),
  ((pngData.length >> 8) & 0xFF),
  ((pngData.length >> 16) & 0xFF),
  ((pngData.length >> 24) & 0xFF),
  // Data offset (header + dir entry)
  0x16, 0x00, 0x00, 0x00,
]);

// Combine all parts
const icoBuffer = Buffer.concat([
  icoHeader,
  icoDir,
  pngData,
]);

// Write ICO file
const iconsDir = join(__dirname, 'src-tauri', 'icons');
const icoPath = join(iconsDir, 'icon.ico');

writeFileSync(icoPath, icoBuffer);

console.log(`✅ Created placeholder icon: ${icoPath}`);
console.log('   Size: 256x256 (1 color - blue)');
console.log('   Note: Replace with your actual logo for production builds');
