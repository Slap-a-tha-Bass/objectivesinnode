const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

rp('https://www.reddit.com/r/popular.json')
.then(json => {
    const raw = JSON.parse(json);

    raw.data.children.forEach(article => {
        // console.log(article.data.id);
        const extName = path.extname(article.data.url);
        if(extName === '.jpg' || extName === '.png'){

            rp(article.data.url, { encoding: 'base64' })
            .then(media => {

                fs.writeFile(path.join(__dirname, `./downloads/${article.data.id}${extName}`), media, { encoding: 'base64' },(err) => {

                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('Images Loaded')
                });

            })

        }
    })
})
.catch(e => console.log(e))