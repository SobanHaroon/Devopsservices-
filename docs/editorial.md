# Editorial release

I adapted the reference’s editorial rhythm for DevOps Services: serif display typography, an asymmetric work gallery, dashed section rules, restrained transitions and a full-screen menu. The business copy, identity, project images and campaign films remain specific to the studio.

## Layout

The homepage moves through introduction, practice, selected work, Storm, services, digital marketing, about, process, partnerships, contact invitation, questions and the inquiry form. There is no team section or team navigation link. The existing `/team` route remains available for older links.

At wide widths, featured projects occupy seven columns of a twelve-column grid and alternate sides. Smaller screens use one column with readable type and contained media. Touch devices do not use hover or gallery parallax effects.

## Motion

Lenis smooths wheel scrolling. Native touch scrolling and browser history remain supported. Native programmatic jumps resynchronize Lenis so subsequent wheel events do not return to an old position.

Headings reveal by visual line; body text reveals by word. IntersectionObserver triggers each entrance once. The menu locks background interaction, traps focus, closes with Escape and returns focus to its trigger. FAQ rows have independent measured-height panels.

There are no play, pause or global motion buttons. The operating-system preference simplifies text entrances, scroll movement and transitions without interrupting ambient media.

## Storm

The standalone HTML retains the specified r143 renderer, 50,000 points, 300 atmosphere motes, shaders, three composers and fixed configuration. Its default imports use unpkg. Embedded mode switches to locally served modules, receives normalized parent scroll and pointer coordinates, and keeps rendering after leaving the viewport or opening the menu.

The embedded canvas caps pixel ratio at two. It loads near the scene instead of on the initial page view. Unavailable WebGL uses a static backdrop. Browsers retain control of background-tab scheduling.

## Campaign library

The catalog is defined in `src/data/marketing.ts`. It contains seven client films and three studio films. Portrait and 4:5 clips retain their framing. Every mounted video autoplays muted and loops, including all ten catalog films at once. There are no native controls or play overlays. Opening the menu or scrolling away does not pause playback. The shared player resumes after browser suspension when the tab or video becomes visible again, and retries blocked autoplay after an interaction. Route changes dispose the old players; filtering out a film removes it, and bringing it back starts it automatically.

The supplied desert, campaign artwork and storyboard have optimized web derivatives. Original videos were not edited. The Babay Dee case study includes its launch, farm-to-kitchen and family films.

## Content

Case studies separate the brief, approach, project gallery and delivered scope. They describe the work without invented revenue, conversion or performance figures. The studio is presented as an independent practice led by Muhammad Soban.
