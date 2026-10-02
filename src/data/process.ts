// The Process section's content.

export type ProcessStep = {
  title: string;
  description: string;
  /** The animation frame where this step's part of the loop starts. */
  start: number;
  /** A frame with this step's scene fully built: the still for reduced motion. */
  still: number;
};

/** `mobileSrc` is the portrait version for phones; both share the frame count and step markers. */
export type ProcessAnimation = { src: string; mobileSrc: string; frames: number };

export const eyebrow = "Process";
export const title = "From brief to launch in four steps";

// Your final animation (2026-10-02): a 474-frame (15.8 s) loop on a 1270×600 canvas. On the left it
// draws these four steps (the same words) as cards whose gold bars fill in turn; on the right a row of
// three tiles per step lights up and feeds a "Your store" panel that builds up to a live sales chart.
// At the end it fades out and back in. Phones get your portrait version (400×740, the same frames and
// markers): a step tracker, then one step's text and tiles at a time, sliding in at each marker, above
// the same store panel. If you change a step's words here, change them in both animation files too.
export const animation: ProcessAnimation = {
  src: "/animations/process-flow.lottie",
  mobileSrc: "/animations/process-flow-mobile.lottie",
  frames: 474,
};

// Each step owns the frames from its `start` to the next step's (from the file's markers: design 120,
// develop 216, launch 312); `still` is a frame with its card and tiles lit and its part of the panel
// built (the Launch still has everything done).
export const steps: ProcessStep[] = [
  {
    title: "Discover",
    description: "We learn your products, customers and goals, and agree what to build.",
    start: 0,
    still: 104,
  },
  {
    title: "Design",
    description: "We plan structure and design, or work from your Figma files.",
    start: 120,
    still: 208,
  },
  {
    title: "Develop",
    description: "We build, test on real devices and share progress as we go.",
    start: 216,
    still: 306,
  },
  {
    title: "Launch",
    description: "We launch, check everything live and hand over what you need to run it.",
    start: 312,
    still: 440,
  },
];
