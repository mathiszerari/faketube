const app = require('./utils/app')

const uploadVideo = require('./routes/uploadVideo')
const getTimelineVideo = require('./routes/Timeline/getTimelineVideo')
const getAdvancedTimelineVideo = require('./routes/Timeline/getAdvancedTimelineVideo')


const PORT = process.env.PORT || 8080;
app.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
