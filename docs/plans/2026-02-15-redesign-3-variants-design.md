# Pack-Wise Redesign: 3 Design Variants

**Date:** 2026-02-15
**Scope:** Full visual overhaul + different UX flows for each variant
**Approach:** 3 parallel git worktrees, each running on a different localhost port

## Execution Plan

Each variant runs in its own git worktree on its own branch, served on a unique port:
- **Design A (Horizon):** branch `redesign/horizon`, port 3001
- **Design B (Neon Atlas):** branch `redesign/neon-atlas`, port 3002
- **Design C (Postcard):** branch `redesign/postcard`, port 3003

Files changed per variant: `globals.css`, `page.tsx`, all components in `src/components/` (excluding `src/components/ui/`). Types and API routes remain unchanged.

---

## Design A: "Horizon" — Minimal Editorial

**Aesthetic:** Clean, spacious, editorial magazine feel.

**Colors:** Muted earth tones — warm sand, slate grey, soft sage. Near-white backgrounds with subtle warm tints.

**Typography:** Large serif headlines (Playfair Display from Google Fonts), clean sans-serif body (Inter). Generous whitespace.

**Layout:** Full-width vertical scroll. Weather data as large typographic cards with temperatures displayed huge (120px+). Packing list as a minimal checklist sidebar that slides in from the right.

**UX Flow:** Single continuous scroll. City search is a big centered search bar (Google-style). Selecting city + dates smoothly scrolls into the forecast. No form card — everything flows naturally as sections.

---

## Design B: "Neon Atlas" — Bold Dashboard

**Aesthetic:** Dark-first data dashboard with vibrant accents.

**Colors:** Deep charcoal/near-black base. Neon cyan, electric purple, hot pink accents. Glassmorphism panels with backdrop blur.

**Typography:** Geometric sans-serif throughout (Space Grotesk from Google Fonts). Monospace for data values. Bold weight hierarchy.

**Layout:** Split-panel — left sidebar is control center (city search, date picker, settings), right panel shows weather in a dense grid. Temperature shown as gradient bars. Packing list as expandable accordion sections.

**UX Flow:** Persistent sidebar. Selecting a city immediately populates the right panel (reactive, no submit button). Animated check states on packing items.

---

## Design C: "Postcard" — Playful Illustrated

**Aesthetic:** Warm, friendly, illustrated travel journal feel.

**Colors:** Soft pastels — peachy coral, sky blue, lavender, mint. Warm cream backgrounds. Rounded everything (large border-radius).

**Typography:** Friendly rounded sans-serif (Nunito from Google Fonts). Playful but readable.

**Layout:** Multi-step wizard. Step 1: "Where are you going?" (city search with destination feel). Step 2: "When?" (calendar with weather preview). Step 3: Results as illustrated "postcard" cards per day. Packing list shown as a visual suitcase that fills up.

**UX Flow:** Guided step-by-step with smooth transitions. Progress indicator at top. Results feel like flipping through postcards.

---

## Constraints

- All 3 variants keep the same API routes (`/api/geocode`, `/api/weather`) and types unchanged
- shadcn/ui primitives in `src/components/ui/` are not modified directly
- Each variant installs its own Google Fonts via `next/font/google` in layout.tsx
- 16-day forecast limit and 300ms debounce remain
