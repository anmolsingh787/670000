# Crash Investigation Report

## 1. Device Information
- **Manufacturer**: vivo
- **Device Model**: V2029 (vivo Y20)
- **Android OS Version**: Android 12
- **API Level**: 31 (Target tested on Android 10+ / API 29-34)

---

## 2. Crash Identification
- **Package Name**: `com.aerrik.missilerush`
- **Crashed Activity**: `com.aerrik.missilerush.MainActivity`
- **Crash Timestamp**: Captured via ADB logcat (Real hardware USB device)

---

## 3. Exact Stack Trace

```
FATAL EXCEPTION: main
Process: com.aerrik.missilerush, PID: 5571
java.lang.RuntimeException: Unable to start activity ComponentInfo{com.aerrik.missilerush/com.aerrik.missilerush.MainActivity}: java.lang.NullPointerException: Attempt to invoke virtual method 'android.view.WindowInsetsController com.android.internal.policy.DecorView.getWindowInsetsController()' on a null object reference
	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3939)
	at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:4096)
	at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:103)
	at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:135)
	at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:95)
	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:2441)
	at android.os.Handler.dispatchMessage(Handler.java:106)
	at android.os.Looper.loopOnce(Looper.java:233)
	at android.os.Looper.loop(Looper.java:334)
	at android.app.ActivityThread.main(ActivityThread.java:8399)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:582)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1068)
Caused by: java.lang.NullPointerException: Attempt to invoke virtual method 'android.view.WindowInsetsController com.android.internal.policy.DecorView.getWindowInsetsController()' on a null object reference
	at com.android.internal.policy.PhoneWindow.getInsetsController(PhoneWindow.java:4066)
	at com.aerrik.missilerush.MainActivity.hideSystemUI(MainActivity.java:82)
	at com.aerrik.missilerush.MainActivity.onCreate(MainActivity.java:37)
	at android.app.Activity.performCreate(Activity.java:8385)
	at android.app.Activity.performCreate(Activity.java:8363)
	at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1379)
	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3912)
	... 12 more
```

---

## 4. Root Cause Analysis
In `MainActivity.java`:
- Line 37 invokes `hideSystemUI()` **before** line 40 invokes `setContentView(webView)`.
- On Android 11+ (API 30+), `getWindow().getInsetsController()` delegates directly to `mDecor.getWindowInsetsController()`.
- Because `setContentView()` has not yet executed, the activity window's `DecorView` has not yet been inflated (`mDecor == null`).
- Consequently, invoking `getWindow().getInsetsController()` throws a fatal `NullPointerException` during `performLaunchActivity`, crashing the app on startup.

---

## 5. Intended Fix
1. **Rearrange initialization**: Initialize `webView` and call `setContentView(webView)` **before** calling any window or system UI operations.
2. **Safe InsetsController invocation**: Obtain `WindowInsetsController` directly from `getWindow().getDecorView().getWindowInsetsController()` with null-checks, guarded by `Build.VERSION.SDK_INT >= Build.VERSION_CODES.R`.
3. **Android 10 (API 29) compatibility**: Provide legacy `setSystemUiVisibility` fallback (`SYSTEM_UI_FLAG_IMMERSIVE_STICKY | SYSTEM_UI_FLAG_FULLSCREEN | SYSTEM_UI_FLAG_HIDE_NAVIGATION`) for API 29 devices.
4. **Window focus listener**: Reapply `hideSystemUI()` inside `onWindowFocusChanged(boolean hasFocus)` to ensure full-screen immersion persists when the user interacts or resumes flight.
5. **WebChromeClient logging**: Attach a `WebChromeClient` with `onConsoleMessage` for clean debugging in logcat.
