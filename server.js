require('dotenv').config();
require('./src/constants/globals');

const app = require('./src/app');
const {connectRedis} = require('./src/config/redis');

(async () => {
    await connectRedis();

    app.listen(process.env.PORT || 8080, (err) => {
    if(err) {
        console.log(`🔴 Error Occurred: ${err}` );
        return;
    }

    console.log(`🟢 Server running on http://${process.env.APP_URI}:${process.env.PORT}`)
});
}
)();

