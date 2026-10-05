# Package Parsing Error Investigation & Resolution Report

## 1. Problem Statement
When downloading the game from `https://missile-rush.vercel.app/` on an Android phone and tapping "Install", the Android system displayed:
> **"There was a problem parsing the package."**

---

## 2. Root Cause Analysis
By downloading the exact online artifact from Vercel (`curl.exe -L "https://missile-rush.vercel.app/missile-rush.apk"`) and auditing it with `apksigner` and `adb`, two critical root causes were identified:

### A. Unaligned & Compressed `resources.arsc` on Vercel
When attempting `adb install downloaded-from-vercel.apk`, the Android Package Manager rejected the package with:
```
adb: failed to install downloaded-from-vercel.apk: Failure [-124: Failed parse during installPackageLI: Targeting R+ (version 30 and above) requires the resources.arsc of installed APKs to be stored uncompressed and aligned on a 4-byte boundary]
```
On Android 11+ (Targeting R+ / API 30+), the Android OS `PackageParser` strictly enforces that `resources.arsc` must be uncompressed and aligned to a 4-byte boundary. Because the file deployed to Vercel had a compressed/unaligned `resources.arsc`, Android immediately aborted package parsing.

### B. Broken Signature Scheme on Vercel
Running `apksigner verify --verbose downloaded-from-vercel.apk` revealed:
```
DOES NOT VERIFY
ERROR: Target SDK version 34 requires a minimum of signature scheme v2; the APK is not signed with this or a later signature scheme
```
The file deployed to Vercel was an outdated or modified build (SHA-256: `0B30633EE...`, 2,904,287 bytes) that lacked a valid signature block.

### C. Base64 Blob Embedding in HTML
The previous `index.html` was 9.36 MB because it embedded the entire binary as a base64 string and reconstructed it via JavaScript `Blob()`. Many mobile browsers corrupt or truncate large blob downloads, resulting in incomplete downloads.

---

## 3. The Comprehensive Fix

1. **Strict Build Order**:
   - `aapt2 compile` & `aapt2 link -A assets/` packages all game assets and scripts directly.
   - `zipalign -p -f 4` guarantees that `resources.arsc` is stored **uncompressed and strictly aligned to 4-byte boundaries**.
   - `apksigner sign` signs the aligned binary with the production release keystore (`missile-rush-release.jks`) using v1, v2, and v3 signature schemes.
   - The signed APK is never touched or modified again.

2. **Version Bump to Avoid Browser/CDN Caching**:
   - `versionCode`: `3`
   - `versionName`: `1.0.2`
   - File name: `missile-rush-v1.0.2.apk`

3. **Pure Direct Download Link**:
   - Removed all base64, `Blob()`, `atob()`, and `URL.createObjectURL()`.
   - Replaced with standard `<a href="/missile-rush-v1.0.2.apk" download="Missile-Rush-v1.0.2.apk">`.

4. **Vercel Static File Headers (`vercel.json`)**:
   - `Content-Type: application/vnd.android.package-archive`
   - `Content-Disposition: attachment; filename="Missile-Rush-v1.0.2.apk"`
   - `Cache-Control: public, max-age=0, must-revalidate`

---

## 4. Verification & Testing

### Local APK Verification (`missile-rush-v1.0.2.apk`)
- **zipalign check**: `resources.arsc (OK)` (stored uncompressed and 4-byte aligned).
- **apksigner check**: `Verifies: true` (Signed with release keystore `CN=MissileRush`).
- **ADB Physical Phone Install**:
  ```
  adb -P 5039 install -r missile-rush-v1.0.2.apk -> Success
  ```
- **Device Launch**:
  ```
  am start -n com.aerrik.missilerush/.MainActivity -> Process PID 19887 running smoothly.
  ```

---

## 5. Deployment Instructions for Vercel
Upload the contents of [`Missile-Rush-Vercel-v1.0.2.zip`](file:///D:/New%20folder%20%2818%29/missile-rush/Missile-Rush-Vercel-v1.0.2.zip) to Vercel (or extract to your deployment root). The zip contains:
- `index.html` (clean landing page)
- `missile-rush-v1.0.2.apk` (properly aligned & signed 2.78 MB APK)
- `vercel.json` (proper binary download headers)
