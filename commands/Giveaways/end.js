module.exports = {
    config: {
        name: "end",
        description: "Ends a giveaway.",
        usage: "[message-id]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Tu dois avoir la permission \`MANAGE_MESSAGES\` pour finir les giveaways.');
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
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.channel.send('Le giveaway va se terminer dans moins de  ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' secondes...');
            })
            .catch((e) => {
                if (e.startsWith(`Le giveaway avec l\'ID ${giveaway.messageID} est déjà terminé.`)) {

                    message.channel.send('Ce giveaway est déjà terminé!');

                } else {
                    console.error(e);
                    message.channel.send('Une erreur s\'est produite...');
                }
            });
    },
}
