# MISSILE RUSH: SKY ESCAPE

A playable, portrait browser adaptation of the supplied MISSILE RUSH game brief. Built with React, TypeScript, Phaser 3, and the Sites Vinext starter. The supplied brief calls for Flutter + Flame on native Android. Flutter/Dart were unavailable in this environment; this source is the browser adaptation and does not produce an APK/AAB.

## Play

- Drag across the sky to steer. The plane keeps moving.
- Arrow keys or WASD also steer. Space activates boost; E activates a shield; Escape pauses.
- Joystick and left/right controls are selectable in Settings.
- Dodge homing missiles, pass close for combos, and bring missiles together to destroy them.
- Collect stars, earn coins, buy upgrades, unlock aircraft, claim missions and daily supplies.
- One free rescue per run. All four flight modes are playable.

## Implemented

- Splash, hangar, mode select, live HUD, pause, rescue, results, fleet, upgrades, missions, daily supplies, shop, premium availability screen, local flight records, settings.
- Four aircraft with different movement characteristics; five shared upgrade tracks and cosmetic trails.
- Turn-rate-limited missiles, fast/heavy/splitter/EMP/swarm behaviors, boss cluster patterns and survival waves.
- Fair body hitbox, missile collisions, one near-miss award per missile, combos, shield, boost, magnet, slow time and jammer pickups.
- Capped entity and particle pools, fixed timestep simulation, lazy gameplay loading, reduced effects on Low graphics.
- Device-local progression, daily/weekly rollover, idempotent run rewards and one daily claim per local date.
- Synthesized sound effects and optional quiet procedural music; haptics where supported.
- Generated offline asset manifest and versioned service worker. Open online once and allow asset caching before offline play. Offline behavior still depends on browser storage availability and site access.
- Progressive WebMCP feature detection for reading flight status and navigating menus. The available test browser did not expose document.modelContext, so live WebMCP validation was unavailable.

## Intentionally unavailable integrations

No real-money checkout, rewarded-video provider, Google Play Billing, restore-purchase service, cloud sync, online leaderboard, remote analytics, or live events are connected. UI labels this explicitly. There is no AdMob or Unity Ads. No paid entitlements are granted from a button click.

## Source boundaries

- `game/config.ts`: gameplay and economy configuration.
- `game/simulation.ts`: deterministic simulation and flight state machine.
- `game/renderer.ts`: Phaser scene, input and capped visual effects.
- `game/store.ts`: save validation, progression and rewards.
- `game/audio.ts`: sound and music.
- `components/game/MissileRush.tsx`: menu/HUD composition and navigation.
- `DESIGN.md`: reference analysis and Stitch-compatible design rules.
- `tests/game.test.ts`: nine focused simulation and economy regression tests.

## Development

Use Node 22+ and the package manager declared in package.json. `pnpm dev` starts the app. `pnpm build` creates the Worker/client build and offline manifest. `pnpm test:game` runs the gameplay tests. `pnpm exec tsc --noEmit` verifies types. Sites preview and hosting are handled by the installed Sites workflow.

## Artwork and fonts

Aircraft and game sprites come from the user-supplied MISSILE RUSH atlas and aircraft ZIP. The cyan aircraft label was removed during normalization. Cropped sprites exclude atlas labels. The ocean is original generated artwork. Font: Outfit from @fontsource/outfit; see the packaged font license. Phaser and other dependency licenses remain with their packages.

## Validation limits

The desktop game and 360×800, 390×844, 412×915 and 430×932 portrait layouts were inspected in a browser. Reward claims, upgrade spending, rescue, boost, shield and pause were exercised. Nine simulation/economy tests pass. Actual low-end Android hardware performance, installed offline operation, native purchases and store release requirements have not been certified.
