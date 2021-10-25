const ms = require('ms');
const config = require("../../config.json")

module.exports = {
    config: {
        name: "start",
        description: "Lance un giveaway.",
        usage: "[salon] [durée] [gagnants] [prix]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (config["Giveaway_Options"].giveawayManagerID) {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.id === config["Giveaway_Options"].giveawayManagerID)) {
                return message.channel.send(':boom: Tu dois avoir la permission \`MANAGE_MESSAGES\` pour lancer le giveaway.');
            }
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
                return message.channel.send(':boom: Tu dois avoir la permission \`MANAGE_MESSAGES\` pour lancer le giveaway.');
            }
        }

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send(':boom: Oh oh, je n\'ai pas trouvé ce salon! Réessaie encore!');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':boom: Hmmm. Tu n\as pas donné de durée. Peux-tu réessayer?');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send(':boom: Uh... tu n\'as pas donné le nombre de gagnants.');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(':boom: Oh, on dirait que tu ne m\'as pas donné de prix valide!');
        }
        if (!config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            giveawayChannel.send(`<@&${config["Giveaway_Options"].giveawayRoleID}>`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY TERMINÉ** :tada:",
                    timeRemaining: "Temps restant: **{duration}**!",
                    inviteToParticipate: "Réagis avec 🎉 pour participer!",
                    winMessage: "Bravo, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créé par: {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Terminé",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "Temps restant: **{duration}**!",
                    inviteToParticipate: "Réagis avec 🎉 pour participer!",
                    winMessage: "Bravo, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créé par: {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Terminé",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });

        } else if (!config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            giveawayChannel.send(`@everyone`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY TERMINÉ** :tada:",
                    timeRemaining: "Temps restant: **{duration}**!",
                    inviteToParticipate: "R éagis avec🎉 pour participer!",
                    winMessage: "Bravo, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créé par: {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Terminé",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY TERMINÉ** :tada:",
                    timeRemaining: "Temps restant: **{duration}**!",
                    inviteToParticipate: "Réagis avec 🎉 pour participer!",
                    winMessage: "Bravo, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de partticipants pour déterminer un gagnant!",
                    hostedBy: "Créé par: {user}",
                    winners: "Gagnants(s)",
                    endedAt: "Terminé",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });
        } else if (!config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY TERMINÉ** :tada:",
                    timeRemaining: "Temps restant: **{duration}**!",
                    inviteToParticipate: "Réagis avec 🎉 pour participer!",
                    winMessage: "Bravo, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créé par: {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Terminé",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });
        }


        message.channel.send(`:tada: Fini! Le giveaway pour \`${giveawayPrize}\` a été lancé dans ${giveawayChannel}!`);
    }
}
