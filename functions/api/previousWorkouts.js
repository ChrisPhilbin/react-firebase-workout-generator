const { db } = require('../util/admin');

exports.getAllPreviousWorkouts = (request, response) => {
	db
		.collection('previousWorkouts')
		.where('username', '==', request.user.username)
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let previousWorkouts = [];
			data.forEach((workout) => {
				previousWorkouts.push({
                    workoutId: workout.id,
                    exercises: workout.data().exercises,
					createdAt: workout.data().createdAt,
				});
			});
			return response.json(previousWorkouts);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};