# Validation — 20 September 2026

## Passed
- TypeScript no-emit check.
- Production build after repairing Phaser's ESM import (namespace import required).
- Nine focused tests: turn limits and pause; missile pair collisions; near-miss once-only award; shield absorption and one rescue limit; boost energy/cooldown; idempotent run banking and aircraft purchase bounds; daily/mission rewards and upgrade caps; date rollover; deterministic 180-second simulation with population/position bounds.
- Desktop hangar and live gameplay screenshots.
- Mobile 360×800, 390×844, 412×915, 430×932 layouts: no horizontal overflow in the game frame.
- Mobile screenshots: hangar, fleet, missions, settings, modes, live gameplay.
- Browser flow: launch, crash, free rescue, shield, boost, pause, end run and collect.
- Daily reward: wallet incremented by 250 and repeat claim disabled.
- Engine upgrade: wallet decreased by 150 and level increased to 1; unaffordable next upgrades disabled.
- Music toggles and persisted settings.
- Shop and premium availability labels, disabled purchase restore, personal record list.
- Fast Flight loaded and responded to drag input; one star collected before crashing at 8 seconds.
- Fixed the switch thumb's double translation and removed a label included in the supplied cyan sprite.

## Limits
- Test browser does not expose document.modelContext; WebMCP tools are feature-detected but live tool validation is unavailable.
- Native Flutter/APK/AAB, store integrations, cloud/online services, and physical Android device performance are not part of this browser deliverable.
- Offline cache coverage is checked against final built assets; offline browser reload under the private HTTPS origin is not exercised by the internal HTTP preview.
- UI follows the supplied artwork with a premium layout adaptation; it is not a certified 0–2px match to the multi-screen reference boards.

The temporary mobile viewport harness is removed from the published source.
