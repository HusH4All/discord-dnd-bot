require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(interaction.customId);
    
        await interaction.deferReply({ ephemeral: true });
        if (!role) {
            interaction.editReply({
                content: "I couldn't find that role",
            })
            return;
        }
    
        const hasRole = interaction.member.roles.cache.has(role.id);
    
        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`The role ${role} has been removed.`);
            return;
        }
    
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);
      }
    
      else if (!interaction.isChatInputCommand()) return;
    
      if (interaction.commandName === "embed") {
        const embed = new EmbedBuilder()
          .setTitle("Embed Title")
          .setDescription("This is an embed description")
          .setColor("Random")
          .addFields({
            name: "Field title",
            value: "Some random value",
            inline: true,
          },
          {
            name: "Field title",
            value: "Some random value",
            inline: true,
          });
    
        interaction.reply({ embeds: [embed] });
      }
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
