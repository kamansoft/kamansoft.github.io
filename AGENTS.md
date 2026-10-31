 # Project conventions

- Hero diagram labels and icon names come from the hero JSON through its adapter and data service; the diagram renders typed steps so content remains source-independent.
- Tailwind `duration-*` utilities also override `animation-duration`, so an element that runs a keyframe animation must not carry a `duration-*` class; put the animation on a wrapper instead so it keeps its own speed.