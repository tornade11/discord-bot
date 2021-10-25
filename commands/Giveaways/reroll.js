const ms = require('ms');
const config = require("../../config.json")
module.exports = {
    config: {
        name: "reroll",
        description: "Rerolls a giveaway.",
        usage: "[message-id]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Tu dois avoir la permission \`MANAGE_MESSAGES\` pour reroll ce giveaway.');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Oh oh, je n\'ai pas pu trouver ce message! Réessaie encore!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Hmmm. Je ne trouve pas de giveaway pour l\'ID `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send('Le giveaway a été reroll!');
            })
            .catch((e) => {
                if (e.startsWith(`Le giveaway avec l\'ID ${giveaway.messageID} n'est pas terminé.`)) {
                    message.channel.send('Ce giveaway n\'est pas terminé!');
                } else {
                    console.error(e);
                    message.channel.send('UNe erreur s\'est produite');
                }
            });
    },
}

