const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    getAllExercises,
    getOneExercise,
    deleteExercise,
    editExercise,
    createExercise
} = require('./api/exercises')

app.get('/exercises', auth, getAllExercises);
app.get('/exercises/:exerciseId', auth, getOneExercise);
app.delete('/exercises/:exerciseId', auth, deleteExercise);
app.put('/exercises/:exerciseId', auth, editExercise);
app.post('/exercises', auth, createExercise);


const {
    loginUser,
    signUpUser,
    getUserDetail,
    updateUserDetails,
    uploadProfilePhoto
} = require('./api/users')

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

const {
    getAllMuscleGroups
} = require('./api/muscleGroups')

app.get('/muscleGroups', auth, getAllMuscleGroups)

exports.api = functions.https.onRequest(app);