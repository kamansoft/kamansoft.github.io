# Graphics that explain Kamansoft at a glance

## Goal
A visitor should get **what we do** (better operations), **how** (business first, engineers lead, AI assists, humans review), and **why** (it keeps working as you grow) from motion alone, before reading anything.

## UX principles (from research on explainer and marketing sites)
- **One idea per graphic.** Each animation explains a single concept. No decorative motion.
- **Animate on scroll, play once.** Graphics start when they come into view, finish in 1–2.5 s, then stay still. Only small "alive" signals (a pulse, a breath) keep looping.
- **Show before and after.** People grasp change faster when they see messy turn into ordered than when they read about it.
- **Draw in reading order.** Left to right, top to bottom, step by step, with words appearing next to each step as it lights up.
- **Fewer words, bigger shapes.** Labels of 1–3 words. Text stays real (selectable, readable by search engines), not baked into images.
- **Respect "reduce motion".** People who turn animation off see the finished picture straight away.
- **Fast and light.** Hand-made line drawings and simple shapes, no videos or heavy libraries, so the page stays quick on phones.
- **Works on phones.** Horizontal sequences become vertical ones on small screens.

## What changes, section by section

### 1. Top of page: "Business first" map, brought to life
The 3-step diagram already there becomes a guided sequence:
- Step 1 lights up first, and a small tangle of lines (your current process) appears beside it.
- A signal travels down to step 2. Design, Plan, Build and Deliver light up one after another, with a small engineer icon "directing" an AI icon.
- Step 3 gets a check-mark stamp ("reviewed"), then the loop arrow along the left side animates back to the top, showing iteration.
- After that it rests, with a slow pulse running along the loop.

### 2. What we solve: three small "before and after" scenes
Each of the 3 cards gets a tiny animated scene above its title:
- **Operate better:** tangled lines straighten into one clean flow.
- **Build software:** scattered blocks snap together into a screen.
- **Secure and scale:** a small structure grows taller while a shield stays locked around it.
The scene plays when the card comes into view and replays when someone hovers over it.

### 3. We understand / We command / We review (kept big and central)
- A line of light runs through the three cards in order, so the trio reads as one sequence.
- Each icon gets its own small motion: a magnifier scanning (understand), a command line typing (command), a check being drawn (review).
- "The troop" strip becomes a visual: 1 engineer node joined to several human and AI-agent dots that light up in turn.

### 4. Other agencies vs Kamansoft
- Both growth lines draw at the same time, side by side, so the contrast lands together.
- On the "other agencies" line, small cracks appear at the peak, then the line drops.
- On the Kamansoft line, small markers (Plan, Prove, Architect) appear along the line as it climbs.
- A small caption in the middle: "same start, different future".

### 5. How we work: a track that fills as you scroll
- The process line fills step by step as the visitor scrolls through the section. Each step lights up when the fill reaches it.
- A small "deliverable" box drops out under each sprint step.
- The last step (Iterate) shows a loop arrow that sends a pulse back to the start.
- On phones the track runs vertically.

## Out of scope
- No change to the wording, the blue logo or its glow, the team section, or which sections are switched on.
- No stock photos or video.

## Technical details
- One shared `useInView` hook (generalised from the current `useRevealOnScroll` in Approach) and a `useScrollProgress` hook for the process track; both use IntersectionObserver / rAF with passive listeners.
- New presentational SVG components under `src/components/graphics/` (e.g. `TangleToFlow`, `BlocksToScreen`, `ScaleShield`, `TroopNetwork`); sections pass an `active` flag. Each scene's name comes from the section JSON (`"scene"` field) through the existing adapters and services, so content stays data-driven.
- Motion with CSS keyframes and SVG `stroke-dashoffset` added to `tailwind.config.ts`; no new animation library. Respect the existing rule: elements running keyframes never carry `duration-*` classes.
- All colours via existing tokens (`primary`, `signal`, `destructive`, `ink-*`); a `prefers-reduced-motion` block in `index.css` shows final states.
- Verify with Playwright on desktop and mobile, light and dark, plus reduced motion: no layout overflow, no console errors.
