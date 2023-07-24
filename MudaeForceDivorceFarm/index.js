const { Client } = require('discord.js-selfbot-v13');
const bot = new Client({ checkUpdate: false });
require('dotenv').config();

// Access the token using the fallback mechanism:
const token = process.env.token

// Settings
const config = require('./config'); // Import the configuration JavaScript file

// Access the configurable options from config.js as usual
const category_id = config.category_id;
const watch_these_channels_Ids = config.watch_these_channels_Ids;
const FD_Channel_Id = config.FD_Channel_Id;
const Character_Name = config.Character_Name;

// Messages
bot.on(`messageCreate`, async msg => {
    try {
        if (msg.channel.id.toString() === FD_Channel_Id && msg.content.includes("do you want to force the divorce?")) {
            msg.channel.send("y");
            return;
        }
        if (!category_id && !(watch_these_channels_Ids.some(i => msg.channel.id.includes(i)))) { return }
        if (category_id && msg.channel.parent.id !== category_id) { return }

        if (msg.embeds.length > 0) {
            let embeds = msg.embeds[0];
            if (embeds.footer && embeds.footer.text && embeds.footer.text.includes("Belongs to")) {
                // Checks the character is in the list to forcedivorce
                if (Array.isArray(Character_Name) && Character_Name.includes(embeds.author.name.toString())) {
                    const FD_Channel = bot.channels.cache.get(FD_Channel_Id);
                    //FD_Channel.send(`$forcedivorce ${embeds.author.name.toString()}`);
                    console.log(`\nChannel: ${FD_Channel_Id}\nCommand: $forcedivorce ${embeds.author.name.toString()}`);
                
                // Checks if the string name is equal to the character name
                }  else if (typeof Character_Name === "string" && embeds.author.name.toString() === Character_Name) {
                    const FD_Channel = bot.channels.cache.get(FD_Channel_Id);
                    //FD_Channel.send(`$forcedivorce ${Character_Name}`);
                    console.log(`\nChannel: ${FD_Channel_Id}\nCommand: $forcedivorce ${Character_Name}`);
                }
            }
        }
    } catch { 
        return
    }
});

// Message edits when claiming
bot.on('messageUpdate', async (oldmsg, newmsg) => {
    try {
        if (!category_id && !(watch_these_channels_Ids.some(i => newmsg.channel.id.includes(i)))) { return }
        if (category_id && newmsg.channel.parent.id !== category_id) { return }
        if (newmsg.embeds.length > 0) {
            let embeds = newmsg.embeds[0];
            if (embeds.footer && embeds.footer.text && embeds.footer.text.includes("Belongs to")) {
                if (embeds.author.name.toString() === Character_Name) {
                    const FD_Channel = bot.channels.cache.get(FD_Channel_Id);
                    //FD_Channel.send(`$forcedivorce ${Character_Name}`)
                    console.log(`\nChannel: ${FD_Channel_Id}\nCommand: $forcedivorce ${Character_Name}`);
                }
            }
        }
    } catch { 
        return
    }
});

// On startup
bot.on('ready', async () => {
    console.log(`[USER]: ${bot.user.username}\n`);
});
console.log("Please Wait...")
// startup
bot.login(token);