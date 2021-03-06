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
                    workoutId:    workout.id,
                    exercises:    workout.data().exercises,
                    muscleGroups: workout.data().muscleGroups,
					createdAt:    workout.data().createdAt,
				});
			});
			return response.json(previousWorkouts);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getOnePreviousWorkout = (request, response) => {
	db
        .doc(`/previousWorkouts/${request.params.previousWorkoutId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json(
                    { 
                        error: 'Previous Workout not found' 
                    });
            }
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
			previousWorkoutData = doc.data();
			previousWorkoutData.previousWorkoutId = doc.id;
			return response.json(previousWorkoutData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
};

exports.createPreviousWorkout = (request, response) => {
	
	if (request.body.exercises.length === 0) {
		return response.status(400).json({ exercises: 'Must not be empty' });
	}
        
    const newPreviousWorkout = {
        username: request.user.username,
        exercises: request.body.exercises,
        muscleGroups: request.body.muscleGroups,
        createdAt: new Date().toISOString()
    }
    db
        .collection('previousWorkouts')
        .add(newPreviousWorkout)
        .then((doc)=>{
            const responsePreviousWorkout = newPreviousWorkout;
            responsePreviousWorkout.id = doc.id;
            return response.json(responsePreviousWorkout);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};

exports.deletePreviousWorkout = (request, response) => {
    const document = db.doc(`/previousWorkouts/${request.params.previousWorkoutId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Previous Workout not found' })
            }
            if (doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};