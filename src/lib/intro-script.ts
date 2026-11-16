/** Server-safe pieces of the opening sequence (see lib/intro.ts). */
export const INTRO_KEY = "ark-intro";
export const introScript = `try{if(!sessionStorage.getItem("${INTRO_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="1"}catch(e){}`;
