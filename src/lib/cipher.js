// Stand-in characters for text that hasn't been "decoded" yet (the intro
// name and every DripText heading).
const GLYPHS = "01<>/[]{}#%&*+=ΔΣΩΞ";

export const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
