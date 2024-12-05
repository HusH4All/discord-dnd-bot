const { 
    Client, 
    ActionRowBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle,
    ApplicationCommandOptionType,
    Interaction,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        // Get options from the slash command
        const level = interaction.options.get('level')?.value;
        const players = interaction.options.get('players')?.value;
        const experience = interaction.options.get('role')?.value;

        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId(`embedModal_${level}_${players}_${experience}`) // Pass options as part of the custom ID
            .setTitle('Creador de Partidas');

        const titleInput = new TextInputBuilder()
            .setCustomId('titleInput')
            .setLabel('Titulo')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('descriptionInput')
            .setLabel('Descripción')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const dateTimeInput = new TextInputBuilder()
            .setCustomId('dateTimeInput')
            .setLabel('Fecha y Hora (YYYY-MM-DD HH:mm)')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const durationInput = new TextInputBuilder()
            .setCustomId('durationInput')
            .setLabel('Duración')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const notesInput = new TextInputBuilder()
            .setCustomId('notesInput')
            .setLabel('Notas adicionales')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);


        const row1 = new ActionRowBuilder().addComponents(titleInput);
        const row2 = new ActionRowBuilder().addComponents(descriptionInput);
        const row3 = new ActionRowBuilder().addComponents(dateTimeInput);
        const row4 = new ActionRowBuilder().addComponents(durationInput);
        const row5 = new ActionRowBuilder().addComponents(notesInput);

        modal.addComponents(row1, row2, row3, row4, row5);

        await interaction.showModal(modal);
    },

    name: "create-game",
    description: "Create an new D&D game.",
    options: [
        {
            name: 'role',
            description: "Experiencia minima para jugar la partida.",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: 'players',
            description: "Número de jugadores.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'level',
            description: "Nivel inicial de los jugadores.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],

    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
};