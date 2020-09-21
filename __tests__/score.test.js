import { updateScore, saveScore } from '../src/modules/score';

describe('updates the current score', () => {
	let currentScore = 0;

	test('it receives an integer as the current score, adds 10 and returns the updated score', () => {
		expect(updateScore(currentScore)).toEqual(10);
	});
	test('it receives an integer as the current score, adds 10 and returns the updated score', () => {
		expect(updateScore(currentScore)).not.toEqual(20);
	});
});
