const app = require('./utils/app')

// const uploadVideo = require('./routes/recherche/uploadVideo')
const searchVideo = require('./routes/recherche/searchVideo')
const uploadVideo = require('./routes/uploadVideo')
const searchVideo = require('./routes/recherche/searchVideo')
const getTimelineVideo = require('./routes/Timeline/getTimelineVideo')
const getAdvancedTimelineVideo = require('./routes/Timeline/getAdvancedTimelineVideo')
const searchPage = require('./routes/recherche/searchPage')
const getUserById = require('./routes/recherche_users/getUserById')


const PORT = process.env.PORT || 8080;
app.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
