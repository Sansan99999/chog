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
let bullets;
let enemies;
let score = 0;
let scoreText;
let spacebar;

const game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('player', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Pixel_circle.svg');
    this.load.image('enemy', 'https://upload.wikimedia.org/wikipedia/commons/5/55/Red_circle.svg');
    this.load.image('bullet', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Blue_circle.svg');
}

function create() {
    // Tambahkan player
    player = this.physics.add.sprite(200, 550, 'player');
    player.setCollideWorldBounds(true);

    // Input keyboard
    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Buat musuh
    enemies = this.physics.add.group();
    spawnEnemy(this);

    // Buat peluru
    bullets = this.physics.add.group();

    // Collider: Bullet vs Enemy
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);

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

    // Tembak peluru
    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        fireBullet(this);
    }

    // Hapus peluru yang keluar layar
    bullets.children.iterate(function (bullet) {
        if (bullet && bullet.y < 0) {
            bullet.destroy();
        }
    });
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

// Fungsi tembak peluru
function fireBullet(scene) {
    let bullet = bullets.create(player.x, player.y - 20, 'bullet');
    bullet.setVelocityY(-300);
}

// Fungsi ketika peluru kena musuh
function hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();

    // Tambah skor
    score += 10;
    scoreText.setText('Score: ' + score);
    }
