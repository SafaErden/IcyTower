import 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default {
	type: Phaser.AUTO,
	width: 500,
	height: 800,
	backgroundColor: 0x44f4f4,
	physics: {
		default: 'arcade'
	},
	plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
	}
};
