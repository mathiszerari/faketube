const app = require('./utils/app')

const uploadRoute = require('./routes/chaine/uploadRoute')
const videoRoute = require('./routes/chaine/videoRoute')

const PORT = process.env.PORT || 8080;
app.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
