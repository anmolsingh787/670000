# Design System: MISSILE RUSH — SKY ESCAPE

## 1. Visual Theme & Atmosphere
A bright, premium illustrated arcade cockpit: a little red airplane over a painted turquoise ocean, soft edge clouds, tactile controls and restrained flight instrumentation. Density 4, variance 3, motion 5. The supplied asset atlas and 15-screen references are authoritative. This is a playable game surface, with no marketing hero. Preserve the illustrated artwork; never flatten screens into screenshots. The reference's multiple semantic game colors override generic one-accent website rules.

## 2. Color Palette & Roles
- Deep Ocean Ink #10374B: text and outer desktop shell.
- Ocean Water #3CBCCB: world, sky and selected surfaces.
- Cloud White #F5FBFC: text on dark surfaces and pale panels.
- Signal Green #B3DF60: the primary PLAY control, positive progress.
- Raptor Red #EE443F: plane branding, crash and warning states.
- Coin Gold #FFCB55: coins, stars and reward graphics.
- Steel Blue #719CAA: secondary supporting labels.
Keep the ocean luminous and saturated to match supplied assets; reserve gradients for game surfaces and restrained depth. Avoid purple neon, heavy glow and decorative dashboard chrome.

## 3. Typography Rules
Outfit, self-hosted with a rounded geometric silhouette. Display uppercase 30–46px weight 800; titles 22–28px weight 700; body 16px; labels 14px; quiet metadata 12px. Numerical counters use tabular figures. Tight titles, generous readable supporting text. No generic serif or emoji icons.

## 4. Component Stylings
Buttons: 14–18px radius, at least 44px touch targets, raised lower edge, light top highlight. PLAY is large lime with dark text and a clear flight icon. Press moves down 2px. Other controls are deep teal or translucent white. Cards: soft pale blue tinted backing, 1px sky border; use only for stats, rewards, and selectable items. Plane artwork floats over open sky rather than inside nested cards. Active aircraft selection has one clear lime outline. Tabs, dialogs, progress, and switches use installed accessible primitives.

## 5. Layout Principles
Portrait 390 × 844 reference. Responsive at 360, 390, 412 and 430px; content scrolls on compact screens. On desktop the portrait game sits centered in a broad illustrated ocean stage with quiet wing panels for daily mission, local records and controls. The game never becomes a dashboard. On mobile wing panels disappear. Keep center gameplay unobstructed. Header has compact score, survival time, pause; abilities sit at the lower right. Navigation lives beneath the main screen, not on the active playfield.

## 6. Motion & Interaction
Plane gently floats while parked; gameplay banking follows velocity. Sparse clouds drift. UI transitions use opacity and transform. Strong effects only on collision, shield absorption and reward. Respect prefers-reduced-motion in menus and cap gameplay particles in low graphics. Touch drag, joystick and turn controls plus keyboard arrows/WASD. Pause on visibility loss. Menus must gate game input.

## 7. Anti-Patterns
No SaaS layout, marketing sections, fake online leaderboard, simulated payments presented as real, screenshot-only UI, stock plane shapes, noisy central HUD, nested card clusters, tiny unreadable type, broken asset links, endless decorative motion, or invented stats. All economy values and results come from device-local save state. Paid services remain explicitly unavailable until a real provider is configured.

## Reference analysis
The atlas supplies a wide red ribbon logo, four upward-facing top-down aircraft, right-facing missiles, gold collectibles and beveled toy-like icons. Screen references use a 1:2.16 portrait ratio, blue atmosphere, strong centered aircraft focus, top wallet, bottom action/nav and red ribbon headers. Implement these relationships with real DOM controls and Phaser gameplay, not a stretched board image. Premium treatment simplifies bevel noise and gives aircraft more breathing room while preserving all supplied illustration.

## Runtime adaptation
The brief requests Flutter + Flame for native Android. Flutter/Dart are unavailable in this environment, while Sites and the requested live browser experience are supported. This deliverable is a React + Phaser browser adaptation, with local progression and offline game assets. It is not a Flutter project, APK, Play Billing integration or production ad integration.
