# L'Hymne - Tauri Desktop App Setup Guide

**Version:** 2.0.0
**Last Updated:** March 2, 2026
**Framework:** Tauri v2

---

## Overview

L'Hymne is now available as a cross-platform desktop application built with **Tauri v2**. This provides:

- ✅ Native file system access for exports
- ✅ Secure storage for settings
- ✅ System tray integration (ready)
- ✅ Auto-update capability (ready)
- ✅ Better performance and smaller bundle size
- ✅ Works offline (after initial load)

---

## Prerequisites

### 1. Rust Toolchain

Tauri requires Rust to build the native backend.

**Install Rust:**
```bash
# Windows (PowerShell)
winget install Rustlang.Rust.GNU
# OR download from https://rustup.rs/

# macOS
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Verify installation:**
```bash
rustc --version
cargo --version
```

### 2. System Dependencies

#### Windows
- **WebView2:** Pre-installed on Windows 11, install manually on Windows 10
- **Visual Studio Build Tools:** With C++ desktop development workload

#### macOS
- **Xcode Command Line Tools:**
  ```bash
  xcode-select --install
  ```

#### Linux (Debian/Ubuntu)
```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libxdo-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    libjavascriptcoregtk-4.1-dev \
    libsoup-3.0-dev
```

#### Linux (Fedora)
```bash
sudo dnf install -y webkit2gtk4.1-devel \
    curl \
    wget \
    file \
    libxdo-devel \
    openssl-devel \
    libappindicator-gtk3-devel \
    librsvg2-devel
```

### 3. Node.js Dependencies

Already installed via `npm install`:
```json
{
  "@tauri-apps/api": "^2.4.1",
  "@tauri-apps/plugin-dialog": "^2.2.1",
  "@tauri-apps/plugin-fs": "^2.2.1",
  "@tauri-apps/plugin-shell": "^2.2.1",
  "@tauri-apps/plugin-store": "^2.2.2"
}
```

---

## Project Structure

```
hymne/
├── src/                      # Frontend (React + TypeScript)
│   ├── hooks/
│   │   ├── useTauri.ts       # Tauri detection hook
│   │   └── useTauriSettings.ts # Tauri-aware settings
│   ├── services/
│   │   └── tauriFileService.ts # File operations
│   └── ...
│
├── src-tauri/                # Backend (Rust)
│   ├── src/
│   │   └── main.rs           # Rust entry point
│   ├── capabilities/
│   │   └── default.json      # Permission capabilities
│   ├── Cargo.toml            # Rust dependencies
│   ├── build.rs              # Build script
│   └── tauri.conf.json       # Tauri configuration
│
└── package.json              # Node.js dependencies
```

---

## Development

### Run in Development Mode

```bash
# Start Tauri dev server (runs both Vite and Tauri)
npm run tauri:dev

# Or using the full command
npx tauri dev
```

This will:
1. Start the Vite dev server on `http://localhost:3000`
2. Build and launch the Tauri desktop window
3. Enable hot module reloading (HMR)

### Run Web Version

The app still works as a web app:

```bash
# Standard web development
npm run dev

# Build for web
npm run build
```

---

## Building for Production

### Build All Targets

```bash
npm run tauri:build
# or
npx tauri build
```

### Build Specific Targets

```bash
# Windows MSI
npx tauri build --target x86_64-pc-windows-msvc

# macOS DMG
npx tauri build --target x86_64-apple-darwin

# Linux AppImage
npx tauri build --target x86_64-unknown-linux-gnu
```

### Output Locations

After building, installers are located in:

```
src-tauri/target/release/bundle/
├── msi/          # Windows Installer
├── nsis/         # Windows NSIS
├── dmg/          # macOS DMG
├── app/          # macOS .app
├── deb/          # Linux Debian package
├── rpm/          # Linux RPM package
└── appimage/     # Linux AppImage
```

---

## Features

### 1. Native File System Access

Save lyrics directly to the file system:

```typescript
import { saveTextFile } from '@/services/tauriFileService';

// Save lyrics to a file
const filePath = await saveTextFile(lyrics, {
  title: 'Save Lyrics',
  defaultPath: 'hymne-lyrics.txt',
  filters: [
    { name: 'Text Files', extensions: ['txt'] },
    { name: 'All Files', extensions: ['*'] }
  ]
});
```

### 2. Secure Settings Storage

Settings are stored securely using Tauri's store plugin:

```typescript
import { useTauriSettings } from '@/hooks/useTauriSettings';

function MyComponent() {
  const { settings, setSettings, isLoading } = useTauriSettings();
  
  // Settings persist across app restarts
  // Stored in: $APPDATA/hymne/settings.json
}
```

### 3. Open URLs in Default Browser

```typescript
import { openUrl } from '@/services/tauriFileService';

await openUrl('https://example.com');
```

### 4. Platform Detection

```typescript
import { useTauri } from '@/hooks/useTauri';

function MyComponent() {
  const { isTauri, platform, isDesktop } = useTauri();
  
  return (
    <div>
      {isTauri && <span>Running on {platform}</span>}
    </div>
  );
}
```

---

## Configuration

### Window Settings

Edit `src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "L'Hymne - Créateur de Souvenirs",
        "width": 1400,
        "height": 900,
        "minWidth": 1024,
        "minHeight": 700,
        "center": true,
        "resizable": true
      }
    ]
  }
}
```

### Security (CSP)

Content Security Policy is configured in `tauri.conf.json`:

```json
{
  "app": {
    "security": {
      "csp": "default-src 'self'; img-src 'self' asset: https://asset-local.tauri.app; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://generativelanguage.googleapis.com"
    }
  }
}
```

### Permissions

Edit `src-tauri/capabilities/default.json`:

```json
{
  "permissions": [
    "core:default",
    "shell:allow-open",
    "fs:default",
    "fs:allow-read-text-file",
    "fs:allow-write-text-file",
    "dialog:default",
    "store:default"
  ]
}
```

---

## Icons

Tauri requires multiple icon sizes. Generate them using:

```bash
npx tauri icon path/to/source-icon.png
```

This will create all required icons in `src-tauri/icons/`:
- `icon.ico` (Windows)
- `icon.icns` (macOS)
- `32x32.png`
- `128x128.png`
- `128x128@2x.png`

**Recommended source size:** 1024x1024 PNG

---

## Auto-Update (Future)

To enable auto-updates:

1. Add update server URL to `tauri.conf.json`
2. Sign your builds
3. Publish releases with signatures
4. Tauri will check for updates automatically

```json
{
  "plugins": {
    "updater": {
      "active": true,
      "dialog": true,
      "endpoints": [
        "https://releases.hymne.app/check/{{target}}/{{arch}}/{{current_version}}"
      ],
      "pubkey": "YOUR_PUBLIC_KEY"
    }
  }
}
```

---

## Troubleshooting

### Build Fails on Windows

**Error:** `linker 'link.exe' not found`

**Solution:** Install Visual Studio Build Tools with C++ workload.

### WebView2 Not Found

**Error:** `WebView2 not found`

**Solution:** Download and install from https://developer.microsoft.com/en-us/microsoft-edge/webview2/

### Rust Compilation Errors

**Error:** Various compilation errors

**Solution:**
```bash
# Update Rust
rustup update

# Clean build
cargo clean
npm run tauri:build
```

### Port Already in Use

**Error:** Port 3000 is already in use

**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.ts
```

---

## Signing (Production)

### Windows Code Signing

1. Obtain a code signing certificate
2. Configure in `tauri.conf.json`:

```json
{
  "bundle": {
    "windows": {
      "certificateThumbprint": "YOUR_THUMBPRINT",
      "digestAlgorithm": "sha256",
      "timestampUrl": "http://timestamp.digicert.com"
    }
  }
}
```

### macOS Notarization

1. Enroll in Apple Developer Program
2. Create signing identity
3. Configure in `tauri.conf.json`:

```json
{
  "bundle": {
    "macOS": {
      "signingIdentity": "Developer ID Application: Your Name (TEAM_ID)",
      "notarize": true
    }
  }
}
```

---

## Performance Optimization

### Bundle Size

Current build configuration includes code splitting:

```typescript
// vite.config.ts
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'],
      motion: ['motion/react'],
      icons: ['lucide-react'],
    },
  },
}
```

### Build Time

Reduce build time:
```bash
# Use release mode for production
npx tauri build --release

# Use debug mode for faster builds (larger output)
npx tauri build
```

---

## Testing

### Test Tauri Build

```bash
# Build and run locally
npx tauri build
# Then run the generated installer/executable
```

### Test Web Version

```bash
# Ensure web version still works
npm run dev
npm run build
npm run preview
```

---

## Distribution

### Windows

- **MSI:** Best for enterprise deployment
- **NSIS:** Best for individual users (smaller, faster install)

### macOS

- **DMG:** Standard distribution format
- **App Store:** Requires additional configuration

### Linux

- **AppImage:** Universal, no installation required
- **DEB:** Debian/Ubuntu
- **RPM:** Fedora/RHEL

---

## Resources

- [Tauri Documentation](https://v2.tauri.app/)
- [Tauri v2 Migration Guide](https://v2.tauri.app/start/migrate/from-tauri-1/)
- [Rust Documentation](https://doc.rust-lang.org/book/)
- [Tauri Discord](https://discord.com/invite/tauri)
- [Tauri GitHub](https://github.com/tauri-apps/tauri)

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run tauri:dev` | Start development server |
| `npm run tauri:build` | Build for production |
| `npm run tauri` | Tauri CLI helper |
| `npx tauri info` | Show system info |
| `npx tauri doctor` | Diagnose issues |

---

*Generated for L'Hymne v1.0.0*
*March 2, 2026*
