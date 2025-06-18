const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load assets here (background, towers, characters)
}

function create() {
    this.add.text(300, 250, 'Chog Defender', { fontSize: '32px', fill: '#fff' });
}

function update() {
    // Game logic goes here
}
