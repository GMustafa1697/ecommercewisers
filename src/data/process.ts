// The Process section's content.

export type ProcessStep = {
  title: string;
  description: string;
  /** The animation frame where this step's part of the loop starts. */
  start: number;
  /** A frame with this step's scene fully built: the still for reduced motion. */
  still: number;
};

/** `speed` is the playback rate: below 1 slows the whole loop down. */
export type ProcessAnimation = { src: string; frames: number; speed: number };

export const eyebrow = "Process";
export const title = "From brief to launch in four steps";

// Your v3 animation (2026-10-03): a 278-frame (9.3 s at 30 fps) loop on a 1270×600 canvas. On the
// left a ring fills one quarter per step, with the step's icon in its centre; on the right a panel
// shows one step at a time (its number, these words and three items). Launch ends on "LIVE", then it
// fades out and back in. Played at 0.6×, so each step stays about 3.2 s (15.5 s a loop), the pace of
// the earlier file. If you change a step's words here, change them in the animation file too.
export const animation: ProcessAnimation = {
  src: "/animations/process-ring.lottie",
  frames: 278,
  speed: 0.6,
};

// Each step owns the frames from its `start` to the next step's (the file's markers: discover 16,
// design 74, develop 132, launch 190); `still` is the last frame before the step fades, with all three
// items shown (the Launch still has the whole ring and "LIVE").
export const steps: ProcessStep[] = [
  {
    title: "Discover",
    description: "We learn your products, customers and goals, and agree what to build.",
    start: 16,
    still: 64,
  },
  {
    title: "Design",
    description: "We plan structure and design, or work from your Figma files.",
    start: 74,
    still: 122,
  },
  {
    title: "Develop",
    description: "We build, test on real devices and share progress as we go.",
    start: 132,
    still: 180,
  },
  {
    title: "Launch",
    description: "We launch, check everything live and hand over what you need to run it.",
    start: 190,
    still: 246,
  },
];
