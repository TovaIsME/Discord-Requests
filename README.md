# Discord api Requests

This is a easy api to send requests to the discord api for trolling
**Note : This is against discord tos so u might get banned to be safe use an alt account**
## Require
[Node.js +v16](https://nodejs.org/en/download)
## Installation

Run the install.bat file to download the packages or open the cmd/terminal and run

```bash
npm install
```

## Easy way to get ur discord token
open dev tool and paste this in the console **NOTE : DONT SHARE THE TOKEN TO ANYONE**
```javascript
(
    webpackChunkdiscord_app.push(
        [
            [''],
            {},
            e => {
                m=[];
                for(let c in e.c)
                    m.push(e.c[c])
            }
        ]
    ),
    m
).find(
    m => m?.exports?.default?.getToken !== void 0
).exports.default.getToken()
```
##Run the project

simply run the file **run.bat** or open terminal/cmd and run the command npm start

##How to use the api

1-Typing Request :
https://localhost:3000/typing/ur token/channel ID/time

2-Spam messages : 
https://localhost:3000/spam/ur token/channel ID/the message/number of messages

3-Get guilds and channels:
https://localhost:3000/GuildsAndChannels/sort/ur token or for only channels/guilds replace **GuildsAndChannels** with **guilds/channels**