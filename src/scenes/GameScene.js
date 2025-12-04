import Chibi from "../objects/Chibi.js";
import { spawnCircleFX, spawnBurstFX } from "../utils/particleFX.js";

export default class GameScene extends Phaser.Scene {
    constructor() { super("Game"); }

    create(data) {
        this.names = data.names;
        this.chibis = [];

        // Música
        this.sound.play("bgm", { loop: true, volume: 0.3 });

        // Chibis caminando en círculo
        this.spawnChibis();

        // Botón invocar
        const summonBtn = this.add.text(400, 540, "INVOCAR", {
            fontSize: "32px",
            backgroundColor: "#ff88d8",
            padding: 12
        }).setOrigin(0.5).setInteractive();

        summonBtn.on("pointerdown", () => this.invokeOne());
    }

    spawnChibis() {
        const skins = ["pink", "blue", "yellow", "green"];

        this.names.forEach((name, i) => {
            const angle = (i / this.names.length) * 6.28;
            const x = 400 + Math.cos(angle) * 200;
            const y = 300 + Math.sin(angle) * 200;

            const chibi = new Chibi(this, x, y, skins[i % skins.length], name);
            this.chibis.push(chibi);
        });
    }

    invokeOne() {
        if (this.chibis.length === 0) return;

        this.sound.play("summon");

        const circle = spawnCircleFX(this, 400, 300);

        this.time.delayedCall(800, () => {
            const chosen = Phaser.Utils.Array.GetRandom(this.chibis);

            chosen.getSummonedEffect();

            spawnBurstFX(this, chosen.x, chosen.y);
            this.sound.play("pop");

            this.chibis = this.chibis.filter(c => c !== chosen);
            chosen.destroy();
            circle.destroy();
        });
    }
}
