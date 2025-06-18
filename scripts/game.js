// scripts/game.js

// Buat konfigurasi Phaser
const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    backgroundColor: '#800080', // ungu
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
let enemies;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('player', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Pixel_circle.svg');
    this.load.image('enemy', 'https://upload.wikimedia.org/wikipedia/commons/5/55/Red_circle.svg');
}

function create() {
    // Tambahkan player
    player = this.physics.add.sprite(200, 550, 'player');
    player.setCollideWorldBounds(true);

    // Input keyboard
    cursors = this.input.keyboard.createCursorKeys();

    // Buat musuh
    enemies = this.physics.add.group();
    spawnEnemy(this);

    // Tampilkan skor
    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });
}

function update() {
    // Gerakan player
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }
}

// Fungsi spawn musuh
function spawnEnemy(scene) {
    scene.time.addEvent({
        delay: 1000,
        callback: () => {
            let x = Phaser.Math.Between(50, 350);
            let enemy = enemies.create(x, 0, 'enemy');
            enemy.setVelocityY(100);
        },
        callbackScope: scene,
        loop: true
    });
                                     }
