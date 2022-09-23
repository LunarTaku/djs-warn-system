![BannerImage](https://cdn.discordapp.com/attachments/1022912249427402803/1022912656564293632/WARN_SYSTEM_BANNER.png)

![GitHub forks](https://img.shields.io/github/forks/LunarTaku/djs-warn-system?style=for-the-badge) ![GitHub Repo stars](https://img.shields.io/github/stars/LunarTaku/djs-warn-system?style=for-the-badge) ![GitHub issues](https://img.shields.io/github/issues/LunarTaku/djs-warn-system?style=for-the-badge)

# DJS Warn System (Discord.js V14)
A simple warn system for v14 bots using javascript, mongoDB, and nodejs!


## Dependencies
- discord.js: `npm i discord.js`
- mongoose: `npm i mongoose`

## Instructions
1. Install all the dependencies.
2. Copy the command files into your command folder.
3. Create a folder called `schemas` and copy the schema files into it.
4. Correct all the paths to the schemas folder.
5. Try the commands!

## MongoDB Code

```
    // Add this to the top of the file
    const { connect } = require('mongoose')
    
    // Add this to your ready.js file
    await connect(MONGO_URI)
      .then(() => {
        console.log(`✅ >>> Successfully connected to MongoDB!`);
      })
      .catch((err) => {
        console.log(err);
      });
```

## previews

![image](https://cdn.discordapp.com/attachments/1022912249427402803/1022912373587198004/Screen_Shot_2022-09-23_at_7.47.18_PM.png)
![image2](https://cdn.discordapp.com/attachments/1022912249427402803/1022912374044364840/Screen_Shot_2022-09-23_at_7.47.43_PM.png)
![image3](https://cdn.discordapp.com/attachments/1022912249427402803/1022912374749012069/Screen_Shot_2022-09-23_at_7.47.56_PM.png)
