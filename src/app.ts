import express, { Request, Response } from 'express';
import axios from 'axios';
const app = express()
const PORT = 3000 || process.env.PORT

app.get('/typing/:token/:channelId/:time', (req: Request, res: Response) => {
    const { token, channelId, time } = req.params;
    if (!token || !channelId || !time) {
        return res.status(400).send('Missing required parameters');
      }
      const tokenRegex = /^OD.{57}$/;
      if (!tokenRegex.test(token)) {
        return res.status(400).send('Invalid token format');
      }
      
      const channelIdRegex = /^\d+$/;
      if (!channelIdRegex.test(channelId)) {
        return res.status(400).send('Invalid channelId format');
      }
      
      const timeRegex = /^\d+$/;
      if (!timeRegex.test(time)) {
        return res.status(400).send('Invalid time format');
      }
    const realTime = parseInt(time, 10);
    const url = `https://discord.com/api/v9/channels/${channelId}/typing`
    async function postData() {
        try {
            const headers = {
                Authorization: `${token}`,
              };
      
          const response = await axios.post(url, {}, {headers});
        } catch (error) {
          console.error(error);
          res.status(500).send('Error sending POST request to Discord API');
          res.send('Something went wrong make sure its /typing/ur token/channel id/time in miliseconds');
        }
      }
      setInterval(postData, realTime);
      res.send('POST request sent to Discord API');
  });
  app.get('/spam/:token/:channelId/:message/:number', (req: Request, res: Response) => {
    const { token, channelId, number, message } = req.params;
    if (!token || !channelId || !number|| !message) {
        return res.status(400).send('Missing required parameters');
      }
      const tokenRegex = /^OD.{57}$/;
      if (!tokenRegex.test(token)) {
        return res.status(400).send('Invalid token format');
      }
      
      const channelIdRegex = /^\d+$/;
      if (!channelIdRegex.test(channelId)) {
        return res.status(400).send('Invalid channelId format');
      }
      
      const timeRegex = /^\d+$/;
      if (!timeRegex.test(number)) {
        return res.status(400).send('Invalid number of message format');
      }
    const numberofMessage = parseInt(number);
    const url = `https://discord.com/api/v9/channels/${channelId}/messages`
    async function postData() {
        try {
            const headers = {
                Authorization: `${token}`,
              };
              const body = {
                    content: message,
              }
      
          const response = await axios.post(url, body, {headers});
        } catch (error) {
          console.error(error);
          res.status(500).send('Error sending POST request to Discord API');
          res.send('Something went wrong make sure its /typing/ur token/channel id/number of messages');
        }
      }
      for (let i = 0;i < numberofMessage; i++){
        postData()
      }
      res.send('POST request sent to Discord API');
  });


app.listen(PORT, () => {
    console.log('app is working on', PORT)
})