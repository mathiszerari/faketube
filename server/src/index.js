const app = require('./utils/app')

const register = require('./routes/profil/register')
const login = require('./routes/profil/login')

const PORT = process.env.PORT || 8080;
app.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
