# How to Add Icons for Windows Build

## Current Status

✅ **Development mode works without icons**
⏳ **Production build requires icon.ico**

---

## Option 1: Use Online Converter (Easiest)

1. **Go to:** https://icoconvert.com/ or https://convertio.co/png-ico/

2. **Upload your logo:**
   - Drag & drop `public/logo.svg` or any PNG image
   
3. **Convert to ICO:**
   - Choose 256x256 size
   - Download the `.ico` file

4. **Save to project:**
   ```
   Save as: src-tauri/icons/icon.ico
   ```

5. **Update `tauri.conf.json`:**
   ```json
   "icon": [
     "icons/icon.ico"
   ]
   ```

---

## Option 2: Use Figma/Photoshop

1. Export your logo as 1024x1024 PNG
2. Use online converter (Option 1)

---

## Option 3: Install ImageMagick (For Future)

```bash
# Install via winget
winget install ImageMagick.ImageMagick

# Then convert
magick convert -background none public/logo.svg -define icon:auto-resize=256,128,64,48,32,16 src-tauri/icons/icon.ico
```

---

## Testing Without Icons

The app runs perfectly in development mode without icons:

```bash
npm run tauri:dev
```

Icons are only required when you run:
```bash
npm run tauri:build
```

---

## Quick Test

After adding `icon.ico`, test the build:

```bash
npm run tauri:build
```

Check output in:
```
src-tauri/target/release/bundle/nsis/
```

---

## Icon Requirements for Windows

| Format | Size | Required |
|--------|------|----------|
| `.ico` | 256x256 (multi-size) | ✅ Yes |
| `.ico` | Contains: 256, 128, 64, 48, 32, 16 | ✅ Recommended |

---

*For now, development continues without icons - no problem!*
