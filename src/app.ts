import express, { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
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

  app.get('/GuildsAndChannels/sort/:token', async (req: Request, res: Response) => {
    const { token } = req.params;
    if (!token) return res.send('No Token Bad REQUEST');
  
    interface Guild {
      id: string;
      name: string;
    }
  
    interface Channel {
      id: string;
      name: string;
    }
  
    const headers = {
      Authorization: token,
    };
  
    let delay = 300;
  
    try {
      let guildsResponse: AxiosResponse<Guild[]>;
      let guilds: Guild[];
  
      do {
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
  
        guildsResponse = await axios.get('https://discord.com/api/v10/users/@me/guilds', { headers });
        guilds = guildsResponse.data;
  
        if (guildsResponse.headers['retry-after']) {
          delay = parseInt(guildsResponse.headers['retry-after']) * 1000;
        }
      } while (guildsResponse.status === 429); 
  
      const sortedGuilds = guilds.sort((a, b) => a.name.localeCompare(b.name));
  
      const sortedGuildsAndChannels: Record<string, Channel[]> = {};
  
      for (const guild of sortedGuilds) {
        const guildId = guild.id;
  
        let channelsResponse: AxiosResponse<Channel[]>;
        let channels: Channel[];
  
        do {
          if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
  
          channelsResponse = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers });
          channels = channelsResponse.data;
  
          if (channelsResponse.headers['retry-after']) {
            delay = parseInt(channelsResponse.headers['retry-after']) * 1000;
          }
        } while (channelsResponse.status === 429);
  
        const sortedChannels = channels.sort((a, b) => a.name.localeCompare(b.name));
        sortedGuildsAndChannels[guild.name] = sortedChannels;
      }
  
      res.json(sortedGuildsAndChannels);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('This error might be caused by discord api Reason : Rate Limit, However You Can Try Another Request After 0.5 seconds');
    }
  });
  app.get('/guilds/sort/:token', async (req: Request, res: Response) => {
    const { token } = req.params;
    if (!token) return res.send('No Token Bad REQUEST');
  
    interface Guild {
      id: string;
      name: string;
    }
  
    const headers = {
      Authorization: token,
    };
  
    let delay = 300;
  
    try {
      let guildsResponse: AxiosResponse<Guild[]>;
      let guilds: Guild[];
  
      do {
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
  
        guildsResponse = await axios.get('https://discord.com/api/v10/users/@me/guilds', { headers });
        guilds = guildsResponse.data;
  
        if (guildsResponse.headers['retry-after']) {
          delay = parseInt(guildsResponse.headers['retry-after']) * 1000;
        }
      } while (guildsResponse.status === 429);
  
      const sortedGuilds = guilds.sort((a, b) => a.name.localeCompare(b.name));
  
      res.json(sortedGuilds);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/channels/sort/:token/:guildId', async (req: Request, res: Response) => {
    const { guildId, token } = req.params;
    if (!guildId) return res.send('No Guild ID Bad REQUEST');
    if (!token) return res.send('No token Bad REQUEST')
  
    interface Channel {
      id: string;
      name: string;
    }
  
    const headers = {
      Authorization: token,
    };
  
    let delay = 300;
  
    try {
      let channelsResponse: AxiosResponse<Channel[]>;
      let channels: Channel[];
  
      do {
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
  
        channelsResponse = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers });
        channels = channelsResponse.data;
  
        if (channelsResponse.headers['retry-after']) {
          delay = parseInt(channelsResponse.headers['retry-after']) * 1000;
        }
      } while (channelsResponse.status === 429);
  
      const sortedChannels = channels.sort((a, b) => a.name.localeCompare(b.name));
  
      res.json(sortedChannels);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  

app.listen(PORT, () => {
    console.log('app is working on', PORT)
})