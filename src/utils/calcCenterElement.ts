export const calcCenterElement = (element: HTMLElement): number | undefined => {
  if (window) {
    const topEl = element.getBoundingClientRect().y + window.scrollY;
    const heightEl = element.clientHeight;

    // like {top: 50%, transform: translateY(-50%)} in CSS
    return topEl - window.innerHeight / 2 + heightEl;
  } else {
    console.warn(
      `Window not definite. Perhaps you call this function before the window is initialized`,
    );
  }
  return undefined;
};
