export function randomizeColors(count: number) {
    return [...Array(count).keys()].map(randomizeColor);
}

// see https://stackoverflow.com/a/20129594
export function randomizeColor(seed: number) {
    const hue = seed * 137.508; // use golden angle approximation
    return `hsl(${hue},100%,50%)`;
}