export function updateScore(score) {
	score += 10;
	return score;
}

export function saveScore(score, user) {
	let url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/gv40Y9XXDktliqpcA0vA/scores';
	let data = {
		user: user,
		score: score
	};
	fetch(url, {
		mode: 'cors',
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function getScore() {
	const fetch = require('node-fetch');
	let url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/gv40Y9XXDktliqpcA0vA/scores/';
	let result = await fetch(url, {
		mode: 'cors'
	});

	const data = await result.json();
	result = data.result;
	result = result.sort((a, b) => +b.score - +a.score);

	return result;
}
