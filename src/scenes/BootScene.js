export default class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }

    preload() {
        this.load.image("circle", "assets/fx/circle.png");
        this.load.image("burst", "assets/fx/burst.png");

        // 4 skins chibi para los jugadores
        this.load.image("pink", "assets/chibis/pink.png");
        this.load.image("blue", "assets/chibis/blue.png");
        this.load.image("yellow", "assets/chibis/yellow.png");
        this.load.image("green", "assets/chibis/green.png");

        this.load.audio("summon", "assets/sfx/summon.wav");
        this.load.audio("pop", "assets/sfx/pop.wav");
        this.load.audio("bgm", "assets/sfx/bgm.mp3");
    }

    create() {
        this.scene.start("Menu");
    }
}
