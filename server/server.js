const fs = require('fs');
const path = require('path');

const chirpPath = path.join(__dirname, '../chirps.json');

fs.readFile(chirpPath, (err, data) => {

    if(err){
        console.log('Uh oh');
        console.log(err);
        return;
    };

    const chirps = JSON.parse(data);

    console.log(chirps);

});