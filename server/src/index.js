const app = require('./utils/app')

const uploadVideo = require('./routes/uploadVideo')
const register = require('./routes/profil/register')

const PORT = process.env.PORT || 8080;
app.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
