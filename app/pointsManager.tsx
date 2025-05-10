// app/pointsManager.tsx
let incrementFn: (() => void) | null = null;

export const registerIncrement = (fn: () => void) => {
  incrementFn = fn;
};

export const callIncrement = () => {
  if (incrementFn) {
    incrementFn();
  } else {
    console.warn("No increment function registered.");
  }
};
