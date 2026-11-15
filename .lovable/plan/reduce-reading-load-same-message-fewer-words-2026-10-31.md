# Reduce reading load — same message, fewer words

Goal: within about 5 seconds a visitor should know three things: **what we do** (we improve operations with software, data, cloud and AI), **how** (engineers lead a team of humans and AI agents and review everything), and **what they get** (a working result every sprint).

## Show, don't tell (visual-first)
- **Top of page graphic**: an animated "operation map" diagram: messy process boxes → engineer + AI agent nodes → clean, fast flow with an upward results chart. It tells the story without words.
- **Big outcome numbers** strip under the top section (e.g. "2-week sprints", "100% human-reviewed", "15+ yrs experience"). Placeholder numbers will be marked so you can confirm them.
- **Comparison as a picture**: two mini charts side by side. "Others" is a line that rises and then crashes as the system grows. "Kamansoft" is a line that keeps rising steadily. Only 3 short labels per side.
- **Services as 3 large illustrated tiles** (Operate / Build / Secure & scale), each with a bold custom icon and tags. No paragraphs.
- **Process as a horizontal animated track**: 6 icon nodes linked by a moving line, ending in a looping arrow. Each node shows its title and duration only.
- **The troop**: a visual of 3 commander avatars connected to small human and agent icons.
- Icons are larger and use the accent color. Elements animate in gently as you scroll. Custom illustrations are made in the site's dark/lime style.

## Rules for all sections
- Heading: 8 words or fewer. One-line subtitle: 20 words or fewer.
- Cards: a 2–4 word title plus one short line (about 12 words or fewer).
- No paragraph repeats an idea another section already makes ("not just developers" appears once, at the top).
- Text gets scanned through icons, numbers and short labels, not prose.

## Section by section

**Top of page**
- Title: "We improve how your operation runs."
- Subtitle: "Engineers using software, data, cloud and AI — every line reviewed."
- Remove the long paragraph. Keep the buttons and the five capability labels.
- Shorten the "loop" panel to 4 steps: Map process → Architect → Agents build → Engineer reviews & ships.

**Why Kamansoft (comparison)**
- Title: "AI speed, without the AI mess." Subtitle is one line.
- 3 points per side instead of 5.
- Four pillar cards: one line each.

**What we solve (services)**
- Group the 9 cards into 3 groups so there are fewer things to read:
  - Improve operations: process engineering, automation, data pipelines
  - Build software: custom apps, mobile, AI and agents
  - Keep it solid: cloud and DevOps, rescue and modernization, code review and security
- Show 3 large cards, each listing its items as short tags. No descriptions per item.

**How we work (process)**
- Keep the 6 steps, but each one gets only a title, a duration and a line of 8 words or fewer. Remove the closing note, or merge it into the subtitle.

**About**
- Shrink to a short strip: one sentence plus 3 values (one line each). Drop the second paragraph and the 6-item checklist, since the hero and comparison already say that.

**Team, Blog, Portfolio, Contact**
- Team: show role + discipline only, and drop the long bios (skill tags stay).
- Portfolio and blog: one line per card.
- Contact: a single-line pitch above the form.

**Order of sections** (simplest story first)
Top → What we solve → Why Kamansoft → How we work → Portfolio → Team → Blog → Contact. About is merged into Team as an intro line, or removed.

## Technical details
- Most changes are edits to the text data files (`hero`, `approach`, `services`, `process`, `about`, `team`, `portfolio`, `blog`, `contact`).
- Services: add a `groups` structure to the data, service and adapter, and render 3 group cards with tags.
- Approach/About: small layout changes for fewer items. Index: new section order.
- Check the result with screenshots at desktop and mobile widths.
