export default class Chibi extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, skin, name) {
        super(scene, x, y, skin);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.name = name;

        this.setScale(0.5);
        this.setBounce(1);
        this.setCollideWorldBounds(true);

        // movimiento random
        const speed = 60;
        this.setVelocity(
            Phaser.Math.Between(-speed, speed),
            Phaser.Math.Between(-speed, speed)
        );

        // pequeña animación flotante
        scene.tweens.add({
            targets: this,
            y: this.y - 10,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }

    getSummonedEffect() {
        this.scene.tweens.add({
            targets: this,
            scale: 0,
            alpha: 0,
            duration: 300
        });
    }
}
