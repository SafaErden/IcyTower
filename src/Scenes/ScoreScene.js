import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

const updatePanel = (panel, content) => {
	const sizer = panel.getElement('panel');
	const { scene } = panel;

	sizer.clear(true);
	const lines = content.split('\n');
	for (let li = 0, lcnt = lines.length; li < lcnt; li += 1) {
		const words = lines[li].split(' ');
		for (let wi = 0, wcnt = words.length; wi < wcnt; wi += 1) {
			sizer.add(
				scene.add
					.text(0, 0, words[wi], {
						fontSize: 28
					})
					.setInteractive()
					.on('pointerdown', () => {
						this.scene.print.text = this.text;
						this.setTint(Phaser.Math.Between(0, 0xffffff));
					})
			);
		}
		if (li < lcnt - 1) {
			sizer.addNewLine();
		}
	}

	panel.layout();
	return panel;
};

export default class ScoreScene extends Phaser.Scene {
	constructor() {
		super('ScoreBoard');
	}

	preload() {
		this.add.image(config.width / 2, config.height / 2, 'background');
	}

	async create() {
		/*
    */
		this.COLOR_PRIMARY = 0x4e342e;
		this.COLOR_LIGHT = 0x7b5e57;
		this.COLOR_DARK = 0x260e04;

		this.text = this.add.text(config.width / 2 - 150, 20, 'GAME OVER!', {
			fill: '#fff',
			font: '800 50px monospace',
			stroke: '#fff',
			strokeThickness: 2
		});

		const scrollablePanel = this.rexUI.add
			.scrollablePanel({
				x: config.width / 2,
				y: config.height / 2,
				width: 350,
				height: 420,

				scrollMode: 0,

				background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, this.COLOR_PRIMARY),

				panel: {
					child: this.rexUI.add.fixWidthSizer({
						space: {
							left: 3,
							right: 3,
							top: 3,
							bottom: 3,
							item: 8,
							line: 8
						}
					}),

					mask: {
						padding: 1
					}
				},

				slider: {
					track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, this.COLOR_DARK),
					thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, this.COLOR_LIGHT)
				},

				space: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 10,

					panel: 10
				}
			})
			.layout();
		updatePanel(scrollablePanel, 'LEADERBOARD \n \n \n Loading.');

		this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/gv40Y9XXDktliqpcA0vA/scores';
		this.data = {
			user: localStorage.getItem('name'),
			score: localStorage.getItem('score')
		};
		await fetch(this.url, {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify(this.data),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		updatePanel(scrollablePanel, 'LEADERBOARD \n \n \n Loading..');
		let result = await fetch(this.url, {
			mode: 'cors'
		});
		updatePanel(scrollablePanel, 'LEADERBOARD \n \n \n Loading...');
		const data = await result.json();
		result = data.result;
		result = result.sort((a, b) => +b.score - +a.score);
		const answer = {};
		result.forEach((element) => {
			if (!answer[element.user]) {
				answer[element.user] = element.score;
			} else if (+element.score > +answer[element.user]) {
				answer[element.user] = element.score;
			}
		});

		let output = 'LEADERBOARD \n \n Scroll the board to see more scores \n \n';

		/* eslint-disable */

		var firstN = 15;
		// var o = { a: 7, b: 8, c: 9 };
		var filteredResult = {};

		for (var index = 0; index < firstN; index++) {
			var key = Object.keys(answer)[index];
			filteredResult[key] = answer[key];
		}

		console.log(filteredResult);
		for (const el in filteredResult) {
			output += `${el} - ${filteredResult[el]} \n`;
		}
		/* eslint-enable */

		updatePanel(scrollablePanel, output);
	}
}
