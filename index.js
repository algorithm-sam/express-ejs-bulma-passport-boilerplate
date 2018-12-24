const express = require('express');
const app = express();



// console.log(ENV);
app.listen(process.env.port || 3000, () => {
    console.log(`App listening on port ${process.env.port||3000}`);

})