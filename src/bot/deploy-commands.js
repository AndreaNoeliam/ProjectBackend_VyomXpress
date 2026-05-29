const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder()
        .setName('ppcreateuser')
        .setDescription('Registers a new user in the database via Discord')
        .addStringOption(option => 
            option.setName('username').setDescription('The username for the new account').setRequired(true))
        .addStringOption(option => 
            option.setName('password').setDescription('The password for the new account').setRequired(true)),

    new SlashCommandBuilder()
        .setName('ppcreateservice')
        .setDescription('Creates a new service in the database via Discord')
        .addStringOption(option => 
            option.setName('name').setDescription('The name of the service').setRequired(true))
        .addStringOption(option => 
            option.setName('description').setDescription('A brief description of the service').setRequired(false)),

    new SlashCommandBuilder()
        .setName('ppgetuser')
        .setDescription('Retrieves user details from the database')
        .addStringOption(option => 
            option.setName('username').setDescription('The username to search for').setRequired(true))
].map(command => command.toJSON());

const deployCommands = async () => {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('🔄 Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
            { body: commands },
        );

        console.log('✅ Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('❌ Error deploying Discord commands:', error.message);
    }
};

module.exports = deployCommands;