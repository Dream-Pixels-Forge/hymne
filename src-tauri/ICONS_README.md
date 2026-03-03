# Tauri Icons Setup

## Required Icons for Windows

You need to create the following icon files in `src-tauri/icons/`:

### Minimum Required
- `icon.ico` - Windows application icon (required for NSIS/MSI installers)

### Recommended (for complete branding)
- `icon.ico` - Multi-size ICO file (contains 256x256, 128x128, 64x64, 48x48, 32x32, 16x16)
- `32x32.png` - Small icon
- `128x128.png` - Medium icon
- `128x128@2x.png` - High-DPI icon (256x256)

## How to Generate Icons

### Option 1: Using Tauri CLI (Recommended)

1. Create a 1024x1024 PNG version of your logo:
   - Save as `public/logo-1024.png`

2. Run the icon generator:
   ```bash
   npx tauri icon public/logo-1024.png
   ```

This will automatically generate all required icon sizes in `src-tauri/icons/`.

### Option 2: Manual Creation

#### For `icon.ico`:
1. Use an online ICO converter: https://convertio.co/png-ico/
2. Upload your 1024x1024 PNG logo
3. Download the ICO file
4. Place it in `src-tauri/icons/icon.ico`

#### For PNG icons:
1. Resize your logo to the required sizes
2. Save with the exact filenames listed above

### Option 3: Using the Current Logo

Since you already have `public/logo.svg`, you can:

1. Convert SVG to PNG (1024x1024) using any tool
2. Then use Option 1 or 2 above

## Quick Test (Without Icons)

The app will still run in development mode without icons. Icons are only required for building production installers.

To test the app now:
```bash
npm run tauri:dev
```

## Icon Requirements

- **Format**: PNG or ICO
- **Minimum Size**: 1024x1024 (source)
- **Background**: Transparent recommended
- **Content**: Centered with some padding

## Current Status

✅ Tauri configuration fixed
✅ Icons directory created
⏳ Icons need to be added (optional for dev, required for build)

---

*For more info: https://v2.tauri.app/develop/icons/*
