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
