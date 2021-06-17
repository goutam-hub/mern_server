const mongoose = require('mongoose');

//DB connection
const DB = process.env.DATABASE;


mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`Connection Successful`);
}).catch((err) => console.log(`not connected`,err));
