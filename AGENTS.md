 # Project conventions

- Hero diagram labels and icon names come from the hero JSON through its adapter and data service; the diagram renders typed steps so content remains source-independent.
- Tailwind `duration-*` utilities also override `animation-duration`, so an element that runs a keyframe animation must not carry a `duration-*` class; put the animation on a wrapper instead so it keeps its own speed.
- The navbar logo's breathing glow is its own layer: the keyframe animation element never carries a scroll-dependent class — the scroll state only changes that layer's opacity, so the glow keeps its phase, quiets while scrolled, and eases back to full when returning to the top.