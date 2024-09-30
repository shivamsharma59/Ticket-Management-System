const connectDb = require('./db/db.config.js');
const app = require('./app.js');
require('dotenv').config();

connectDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on PORT no : ${process.env.PORT}`)
        });
    })
    .catch(() => {
        console.log('MongoDb connection failed');
    })