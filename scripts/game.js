// scripts/game.js

// Buat konfigurasi Phaser
const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    backgroundColor: '#800080',
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
let gameOver = false;
let gameOverText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Pixel_circle.svg');
    this.load.image('enemy', 'https://upload.wikimedia.org/wikipedia/commons/5/55/Red_circle.svg');
    this.load.image('bullet', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Blue_circle.svg');
}

function create() {
    player = this.physics.add.sprite(200, 550, 'player');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    enemies = this.physics.add.group();
    spawnEnemy(this);

    bullets = this.physics.add.group();

    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);

    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });

    // Game Over Text (sembunyi dulu)
    gameOverText = this.add.text(200, 300, 'GAME OVER', { fontSize: '40px', fill: '#fff' });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);
}

function update() {
    if (gameOver) {
        return; // Stop semua update kalau game over
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        fireBullet(this);
    }

    bullets.children.iterate(function (bullet) {
        if (bullet && bullet.y < 0) {
            bullet.destroy();
        }
    });

    // Cek apakah musuh sampai bawah
    enemies.children.iterate(function (enemy) {
        if (enemy && enemy.y > 580) {
            endGame();
        }
    });
}

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

function fireBullet(scene) {
    let bullet = bullets.create(player.x, player.y - 20, 'bullet');
    bullet.setVelocityY(-300);
}

function hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();

    score += 10;
    scoreText.setText('Score: ' + score);
}

function endGame() {
    gameOver = true;
    player.setVelocityX(0);
    enemies.clear(true, true);
    bullets.clear(true, true);
    gameOverText.setVisible(true);
    }
