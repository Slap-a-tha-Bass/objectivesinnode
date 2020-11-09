const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

const redditPushPath = path.join(__dirname, './popular-articles.json');

rp('https://reddit.com/r/popular.json')
    .then(json => {
        const raw = JSON.parse(json);

        const postData = raw.data.children.map(article => {
            return { author: article.data.author, title: article.data.title, url: article.data.url };
        });
        fs.writeFile(redditPushPath, JSON.stringify(postData), (err) => {
            
            if(err){
                console.log(err);
                return;
            }
            console.log("IT WORKED!")
        });
    })
    .catch(e => console.log(e))