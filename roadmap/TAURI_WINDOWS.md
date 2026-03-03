# L'Hymne - Tauri Windows Development

## Quick Start

### Prerequisites

1. **Rust Toolchain** - Install from https://rustup.rs/
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Node.js Dependencies** - Already installed
   ```bash
   npm install
   ```

### Development

```bash
# Start Tauri dev server
npm run tauri:dev
```

This will:
1. Start Vite dev server on `http://localhost:3000`
2. Compile Rust backend
3. Open desktop window

### Building for Windows

```bash
# Build Windows installers (NSIS + MSI)
npm run tauri:build
```

Output location:
```
src-tauri/target/release/bundle/
├── nsis/L'Hymne_1.0.0_x64-setup.exe
└── msi/L'Hymne_1.0.0_x64_en-US.msi
```

---

## Configuration Summary

### Platform: Windows Only
- **Targets:** NSIS installer, MSI installer
- **Architecture:** x86_64
- **WebView:** WebView2 (pre-installed on Windows 11)

### Features Enabled
- ✅ File system access (save/export lyrics)
- ✅ Native dialogs (open/save files)
- ✅ Secure settings storage
- ✅ Shell/URL opening
- ✅ System tray ready

### Permissions
- `$HOME/**` - User home directory
- `$DOCUMENT/**` - Documents folder
- `$DOWNLOAD/**` - Downloads folder
- `$APPDATA/hymne/**` - App data storage

---

## File Structure

```
hymne/
├── src/                          # React frontend
│   ├── hooks/
│   │   ├── useTauri.ts           # Tauri detection
│   │   └── useTauriSettings.ts   # Desktop-aware settings
│   └── services/
│       └── tauriFileService.ts   # File operations
│
├── src-tauri/                    # Rust backend
│   ├── src/
│   │   └── main.rs               # Entry point
│   ├── capabilities/
│   │   └── default.json          # Permissions
│   ├── Cargo.toml                # Rust deps
│   ├── build.rs                  # Build script
│   ├── tauri.conf.json           # Tauri config
│   └── icons/                    # App icons (optional)
│
└── roadmap/
    └── TAURI_WINDOWS.md          # This file
```

---

## Troubleshooting

### Rust Not Found
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# Restart terminal
```

### WebView2 Not Found
- Windows 11: Pre-installed
- Windows 10: Download from https://developer.microsoft.com/en-us/microsoft-edge/webview2/

### Build Fails
```bash
# Clean and rebuild
cargo clean
npm run tauri:build
```

### Port 3000 in Use
```bash
# Kill process or change port in vite.config.ts
```

---

## Current Status

✅ Tauri v2 configured
✅ Windows targets only (NSIS, MSI)
✅ Cargo.toml fixed (binary only, no library)
✅ All TypeScript types configured
✅ File system permissions set
✅ Dev server ready

⏳ Icons optional (add later for branding)

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run tauri:dev` | Start development |
| `npm run tauri:build` | Build installers |
| `npm run dev` | Web version only |
| `npx tauri info` | System info |
| `npx tauri doctor` | Diagnose issues |

---

*Last updated: March 2, 2026*
