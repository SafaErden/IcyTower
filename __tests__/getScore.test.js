import { getScore } from '../src/modules/score';
jest.mock('../src/modules/score');

describe('Testing the fetching scores', () => {
	test('shows the scores returned', async () => {
		getScore.mockResolvedValue({
			result: [
				{
					user: 'Safa',
					score: '1000'
				},
				{
					user: 'Erden',
					score: '350'
				},
				{
					user: 'Muslum',
					score: '500'
				}
			]
		});

		const recievedScore = await getScore();
		expect(recievedScore).toEqual({
			result: [
				{
					user: 'Safa',
					score: '1000'
				},
				{
					user: 'Erden',
					score: '350'
				},
				{
					user: 'Muslum',
					score: '500'
				}
			]
		});
	});

	test('it returns an object of previous results.', async () => {
		let result = await getScore();
		expect(typeof result).toBe('object');
	});
});
