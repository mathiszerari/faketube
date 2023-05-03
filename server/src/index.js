const app = require('./utils/app')

// const uploadVideo = require('./routes/recherche/uploadVideo')
const searchVideo = require('./routes/recherche/searchVideo')
const getUser = require('./routes/recherche/getUserById')
const uploadVideo = require('./routes/uploadVideo')
const searchPage = require('./routes/searchPage')
<<<<<<< HEAD
=======

>>>>>>> 7c5ed54 (i have to ameliore it)


const PORT = process.env.PORT || 1010;
app.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
