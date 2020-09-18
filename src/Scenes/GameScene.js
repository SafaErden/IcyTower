import 'phaser';
import config from '../Config/config';

var cursors;
var score = 0;
var scoreText;

let gameOptions = {
	platformStartSpeed: 75,
	platformSizeRange: [ 200, 350 ],
	platformCounter: 0
};

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game');
	}

	preload() {
		this.add.image(config.width / 2, config.height / 2, 'background');
		this.load.image('platform', '../src/assets/platform.png');
		this.load.spritesheet('dude', '../src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
		this.sys.game.globals.bgMusic.stop();
		this.jumper = this.sound.add('jumper', { volume: 1, loop: false });
		this.sys.game.globals.jumper = this.jumper;
	}

	create() {
		this.platformGroup = this.add.group({
			removeCallback: function(platform) {
				platform.scene.platformPool.add(platform);
			}
		});

		this.platformPool = this.add.group({
			removeCallback: function(platform) {
				platform.scene.platformGroup.add(platform);
			}
		});

		this.addPlatform(config.width, config.width / 2);

		this.player = this.physics.add.sprite(100, -100, 'dude');
		this.player.body.setGravityY(400);
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dude', frame: 4 } ],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});
		cursors = this.input.keyboard.createCursorKeys();
		this.physics.add.collider(this.player, this.platformGroup);

		scoreText = this.add.text(280, 730, 'Score:0', { fontSize: '40px', fill: '#222' });
	}
	addPlatform(platformWidth, posX) {
		let platform;
		platform = this.physics.add.sprite(posX, config.height * 0, 'platform');
		platform.setImmovable(true);
		platform.setVelocityY(score / 2 + 50);
		this.platformGroup.add(platform);

		platform.displayWidth = platformWidth;
	}

	update() {
		if (this.player.y > config.height) {
			this.scene.start('Title');
		}

		let platform = this.platformGroup.getChildren();
		let canvasWidth = 500;
		for (let i = gameOptions.platformCounter; i < platform.length; i++) {
			if (platform[i].y > 150) {
				var nextPlatformWidth = Phaser.Math.Between(
					gameOptions.platformSizeRange[0],
					gameOptions.platformSizeRange[1]
				);
				let position;

				if (gameOptions.platformCounter % 2 == 0) {
					position = Phaser.Math.Between(0, canvasWidth / 2);
				} else {
					position = Phaser.Math.Between(canvasWidth / 2, canvasWidth);
				}

				this.addPlatform(nextPlatformWidth, position);
				updateScore();
				gameOptions.platformCounter++;
			}
		}
		if (cursors.left.isDown) {
			this.player.setVelocityX(-160);

			this.player.anims.play('left', true);
		} else if (cursors.right.isDown) {
			this.player.setVelocityX(160);

			this.player.anims.play('right', true);
		} else {
			this.player.setVelocityX(0);

			this.player.anims.play('turn');
		}

		if (cursors.up.isDown && this.player.body.touching.down) {
			this.sys.game.globals.jumper.play();
			this.player.setVelocityY(-330);
		}
	}
}

function updateScore() {
	score += 10;
	scoreText.setText('Score:' + score);
}
