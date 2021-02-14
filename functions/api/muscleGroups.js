const { db } = require('../util/admin');

// #GET all exercises /exercises
exports.getAllMuscleGroups = (request, response) => {
	db
		.collection('muscleGroups')
		// .where('username', '==', request.user.username)
		.orderBy('name')
		.get()
		.then((data) => {
			let muscleGroups = [];
			data.forEach((muscleGroup) => {
				muscleGroups.push({
                    muscleGroupId: muscleGroup.id,
                    name: muscleGroup.data().name,
				});
			});
			return response.json(muscleGroups);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};