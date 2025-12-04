export function spawnCircleFX(scene, x, y) {
    const img = scene.add.image(x, y, "circle").setScale(0.4).setAlpha(0.7);

    scene.tweens.add({
        targets: img,
        scale: 1,
        alpha: 1,
        duration: 800
    });

    return img;
}

export function spawnBurstFX(scene, x, y) {
    const burst = scene.add.particles(x, y, "burst", {
        speed: { min: 100, max: 200 },
        lifespan: 500,
        scale: { start: 0.5, end: 0 },
        quantity: 20
    });
    scene.time.delayedCall(500, () => burst.destroy());
}
