const { 
    Client, 
    EmbedBuilder, 
    Interaction
} = require('discord.js');

function getRandomColor() {
    return Math.floor(Math.random() * 16777215); // Generates a random number between 0 and 16777215 (hex color range)
}

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    try {
        if (!interaction.isModalSubmit()) return;

        // Retrieve the values passed in the custom ID
        const customId = interaction.customId;  // Example: "embedModal_5_10_12345"
        const [_, level, players, experience] = customId.split('_');  // Extract values

        const title = interaction.fields.getTextInputValue('titleInput');
        const description = interaction.fields.getTextInputValue('descriptionInput');
        const date = interaction.fields.getTextInputValue('dateTimeInput');
        const duration = interaction.fields.getTextInputValue('durationInput');
        const notes = interaction.fields.getTextInputValue('notesInput') || 'Ninguna';

        // Get the role object from the role ID (experience is the role ID)
        const role = interaction.guild.roles.cache.get(experience);
        const roleName = role ? role.name : 'Unknown Role'; // Use role name or fallback if not found

        // Optionally, get the "NotificacionesPartidas" role by name if you need to mention it
        const notificationsRole = interaction.guild.roles.cache.find(r => r.name === 'NotificacionesPartidas');
        const notificationsRoleMention = notificationsRole ? `<@&${notificationsRole.id}>` : '';

        // Mention the role by using <@&roleId>
        const roleMention = role ? `<@&${role.id}>` : 'Unknown Role';

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(getRandomColor())
            .addFields([
                { name: 'Nivel de los personajes', value: level, inline: true },
                { name: 'Fecha y Hora', value: date, inline: true },
                { name: 'Duración', value: duration, inline: true },
                { name: 'Número de jugadores', value: players, inline: true },
                { name: 'Experiencia requerida', value: roleMention, inline: true },
                { name: 'Notas adicionales', value: notes, inline: false }
            ]);

        await interaction.reply({content: `¡Tenemos nueva partida! ${notificationsRoleMention}`, embeds: [embed]});
    } catch (error) {
        console.log(`Error processing the embed: ${error}`);
    }
}