const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
module.exports = {
  config: {
    name: "help",
    description: "Liste de toutes les commandes disponibles.",
    usage: "help",
    category: "Main",
    accessableby: "Everyone",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
  },
  run: async (client, message, args) => {
    let avatarOptions = {
      format: 'png',
      dynamic: true,
      size: 1024
    }

    const embed = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ ...avatarOptions }),
        'https://github.com/ghaku/discord-giveaway-bot'
      )
      .setThumbnail(client.user.displayAvatarURL({ ...avatarOptions }))
      .setTitle('Help')
      .setColor('7289da')
      .addFields({
        name: `🎉 ${config["Bot_Info"].prefix}start [salon] [durée] [nombre de gagnants] [prix]`,
        value: [
          'Le bot doit avoir accès au salon',
          'La durée doit être donnée uniquement sous format [chiffre] [lettre]',
          'Le nombre de gagnants doit être positif.',
        ].join('\n')
      }, {
        name: '👥 Example:',
        value: [
          `⌨️ ${config["Bot_Info"].prefix}start #general 10m 1 $9.99 Nitro`,
          `➡️ Créé un giveaway de  \`10 minutes\` avec \`1\` gagnant et un `,
          `\`$9.99 Nitro\` comme prix dans  \`#general\`.`
        ].join('\n')
      }, {
        name: `❌ ${config["Bot_Info"].prefix}end [message-id]`,
        value: 'Il faut utiliser l\' **ID** du message du giveaway.\n**Pas le lien !**'
      }, {
        name: '👥 Exemple:',
        value: `⌨️ ${config["Bot_Info"].prefix}end 892678258946659587\n➡️  Finit le giveaway qui a pour ID \`892678258946659587\`.`
      }, {
        name: `🔍 ${config["Bot_Info"].prefix}reroll [message-id]`,
        value: 'Il faut utiliser l\' **ID** du message du giveaway.\n**Pas le lien !**'
      }, {
        name: '👥 Exemple:',
        value: `⌨️ ${config["Bot_Info"].prefix}reroll 892678258946659587\n➡️ Choisit un nouveau gagnant pour le giveaway qui a pour ID \`892678258946659587\`.`
      })
      .setFooter('๖̶ζ͜͡Crow Bot - Yvelt.#0001', client.user.displayAvatarURL({avatarOptions, }));

    if (message.guild) {
      message.channel.send('Consulte tes messages privés!');
      message.delete();
      message.author.send(embed);
    } else {
      message.author.send(embed)
    }
  },
};