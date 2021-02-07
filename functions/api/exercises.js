const { db } = require('../util/admin');

// #GET all exercises /exercises
exports.getAllExercises = (request, response) => {
	db
		.collection('exercises')
		.where('username', '==', request.user.username)
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let exercises = [];
			data.forEach((exercise) => {
				exercises.push({
                    exerciseId: exercise.id,
                    name: exercise.data().name,
					muscleGroup: exercise.data().muscleGroup,
					createdAt: exercise.data().createdAt,
				});
			});
			return response.json(exercises);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

// #GET one exercise /exercises/:exerciseId
exports.getOneExercise = (request, response) => {
	db
        .doc(`/exercises/${request.params.exerciseId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json(
                    { 
                        error: 'Exercise not found' 
                    });
            }
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
			ExerciseData = doc.data();
			ExerciseData.exerciseId = doc.id;
			return response.json(ExerciseData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
};

// Create a new exercise #POST /exercises
exports.createExercise = (request, response) => {
	if (request.body.name.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
    }
    
    if(request.body.muscleGroup.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    
    const newExercise = {
        username: request.user.username,
        name: request.body.name,
        muscleGroup: request.body.muscleGroup,
        createdAt: new Date().toISOString()
    }
    db
        .collection('exercises')
        .add(newExercise)
        .then((doc)=>{
            const responseExercise = newExercise;
            responseExercise.id = doc.id;
            return response.json(responseExercise);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};

// Update an exercise #PUT /exercises/:exerciseId
exports.editExercise = ( request, response ) => { 
    if(request.body.exerciseId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('exercise').doc(`${request.params.exerciseId}`);
    document.update(request.body)
    .then(()=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};

// Delete an exercise #DESTROY /exercises/:exerciseId
exports.deleteExercise = (request, response) => {
    const document = db.doc(`/exercises/${request.params.exerciseId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Exercise not found' })
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