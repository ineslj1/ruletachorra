import { loadNamesUI, summonOne } from "./ui.js";
import { initParticles } from "./particles.js";

document.getElementById("load-names-btn").addEventListener("click", loadNamesUI);
document.getElementById("summon-btn").addEventListener("click", summonOne);

initParticles();
