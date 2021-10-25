const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const client = new Client();
const { GiveawaysManager } = require('discord-giveaways');

var http = require('http'); 

http.createServer(function (req, res) {
  res.write("Online"); 
  res.end();
}).listen(8080);

client.on("ready", async () => {
    console.log(`Rosita giveaways opérationnel!`);
    client.user
      .setActivity(`By Yvelt.#0001 ๖̶ζ͜͡Crow Bot`, { type: "LISTENING" })
      .catch(error => console.log(error));
  });
  

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

["aliases", "commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));


client.login(config["Bot_Info"].token);


