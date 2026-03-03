# Bug Fix Report

## Date

2026-03-03

## Issue

Tauri desktop app installers were not being created.

## Root Causes

1. **Bundle Disabled**: In `src-tauri/tauri.conf.json`, the bundle was set to `"active": false` with empty targets array.

2. **NSIS Error**: The product name `"L'Hymne"` contained an apostrophe which caused NSIS macro errors during installer creation.

## Fixes Applied

### 1. Enabled Bundle Configuration

**File**: `src-tauri/tauri.conf.json`

```json
// Before
"bundle": {
    "active": false,
    "targets": [],
    "icon": [],
    ...
}

// After
"bundle": {
    "active": true,
    "targets": ["nsis", "msi"],
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    ...
}
```

### 2. Fixed Product Name

**File**: `src-tauri/tauri.conf.json`

```json
// Before
"productName": "L'Hymne"

// After
"productName": "L Hymne"
```

## Result

Successfully created installers:

- `L Hymne_1.0.0_x64-setup.exe` (NSIS installer)
- `L Hymne_1.0.0_x64_en-US.msi` (MSI installer)

## Files Modified

- `src-tauri/tauri.conf.json`

## Verification

```bash
npm run tauri:build
```

Build completed successfully with both NSIS and MSI installers generated.
