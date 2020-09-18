import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

const CreateLoginDialog = (scene, config) => {
	const COLOR_PRIMARY = 0x305556;
	const COLOR_LIGHT = 0x40798e;
	const COLOR_DARK = 0x89bac7;

	let username = 'safa';
	const title = 'titlesss';
	const x = 0;
	const y = 0;
	const width = 300;
	const height = 150;

	const background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
	const titleField = scene.add.text(0, 0, title);
	const userNameField = scene.rexUI.add
		.label({
			orientation: 'x',
			background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
			text: scene.rexUI.add.BBCodeText(0, 0, username, { fixedWidth: 150, fixedHeight: 36, valign: 'center' }),
			space: { left: 50, bottom: 50, top: -30 }
		})
		.setInteractive()
		.on('pointerdown', () => {
			const config = {
				onTextChanged(textObject, text) {
					username = text;
					textObject.text = text;
				}
			};
			scene.rexUI.edit(userNameField.getElement('text'), config);
		});

	const loginButton = scene.rexUI.add
		.label({
			orientation: 'x',
			background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
			text: scene.add.text(0, 0, 'SUBMIT'),
			space: {
				top: 8,
				bottom: 8,
				left: 8,
				right: 8
			}
		})
		.setInteractive()
		.on('pointerdown', () => {
			loginDialog.emit('login', username); /* eslint-disable-line */
		});

	const loginDialog = scene.rexUI.add
		.sizer({
			orientation: 'y',
			x,
			y,
			width,
			height
		})
		.addBackground(background)
		.add(
			titleField,
			0,
			'center',
			{
				top: 10,
				bottom: 10,
				left: 10,
				right: 10
			},
			false
		)
		.add(userNameField, 0, 'top', { bottom: 10, left: 10, right: 10 }, true)
		.add(loginButton, 0, 'center', { bottom: 10, left: 10, right: 10 }, false)
		.layout();

	return loginDialog;
};

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super('Title');
	}

	preload() {
		this.add.image(config.width / 2, config.height / 2, 'background');
	}

	create() {
		// Game
		this.gameButton = new Button(
			this,
			config.width / 2,
			config.height / 2 - 200,
			'blueButton1',
			'blueButton2',
			'Play',
			'Game'
		);

		// Options
		this.optionsButton = new Button(
			this,
			config.width / 2,
			config.height / 2 - 100,
			'blueButton1',
			'blueButton2',
			'Options',
			'Options'
		);

		// Credits
		this.creditsButton = new Button(
			this,
			config.width / 2,
			config.height / 2,
			'blueButton1',
			'blueButton2',
			'Credits',
			'Credits'
		);

		// Scoreboard
		this.creditsButton = new Button(
			this,
			config.width / 2,
			config.height / 2 + 100,
			'blueButton1',
			'blueButton2',
			'ScoreBoard',
			'ScoreBoard'
		);

		this.model = this.sys.game.globals.model;
		if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
			this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
			this.bgMusic.play();
			this.model.bgMusicPlaying = true;
			this.sys.game.globals.bgMusic = this.bgMusic;
		}
		CreateLoginDialog(this, {
			x: config.width / 2,
			y: 300,
			title: 'Welcome, kindly enter your username',
			username: ''
		})
			.on('login', function played(username) {
				if (username.length > 0) {
					new Userdetails().setUser(username);
					this.scene.scene.start('Title');
				}
			})
			.popUp(1000);
	}

	centerButton(gameObject, offset = 0) {
		Phaser.Display.Align.In.Center(
			gameObject,
			this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height)
		);
	}

	centerButtonText(gameText, gameButton) {
		Phaser.Display.Align.In.Center(gameText, gameButton);
	}
}
