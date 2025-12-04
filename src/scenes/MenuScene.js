export default class MenuScene extends Phaser.Scene {
    constructor() { super("Menu"); }

    create() {
        this.add.text(400, 80, "Chibi Battle Royale", {
            fontSize: "40px", color: "#ff66cc"
        }).setOrigin(0.5);

        this.add.text(400, 150, "Introduce nombres separados por líneas", {
            fontSize: "18px", color: "#663e70"
        }).setOrigin(0.5);

        const textarea = document.createElement("textarea");
        textarea.style.position = "absolute";
        textarea.style.top = "200px";
        textarea.style.left = "50%";
        textarea.style.transform = "translateX(-50%)";
        textarea.style.width = "300px";
        textarea.style.height = "150px";
        textarea.style.borderRadius = "12px";
        textarea.style.padding = "10px";
        textarea.id = "nameInput";

        document.body.appendChild(textarea);

        const startBtn = this.add.text(400, 400, "START", {
            fontSize: "32px", backgroundColor: "#ff99df", padding: 12
        }).setOrigin(0.5).setInteractive();

        startBtn.on("pointerdown", () => {
            const names = textarea.value.split("\n").map(n => n.trim()).filter(n => n);
            textarea.remove();
            this.scene.start("Game", { names });
        });
    }
}
