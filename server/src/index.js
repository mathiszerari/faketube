const app = require('./utils/app')

// const uploadVideo = require('./routes/recherche/uploadVideo')
const searchVideo = require('./routes/recherche/searchVideo')
const getUser = require('./routes/recherche/getUserById')

const PORT = process.env.PORT || 8080;
app.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
