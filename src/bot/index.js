const { Client, GatewayIntentBits } = require('discord.js');
const { User, Service } = require('../models/index');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady', () => {
    console.log(`🤖 Discord Bot connected successfully as ${client.user.tag}`);
});

// Slash Commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    try {
        // 1. /ppcreateuser
        if (commandName === 'ppcreateuser') {
            const username = interaction.options.getString('username');
            const password = interaction.options.getString('password');

            if (password.length < 8) {
                return await interaction.reply({ 
                    content: '❌ Password must be at least 8 characters long.', 
                    ephemeral: true 
                });
            }
            if (username.length < 3) {
                return await interaction.reply({ 
                    content: '❌ Username must be at least 3 characters long.', 
                    ephemeral: true 
                });
            }
            
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return await interaction.reply({ 
                    content: `❌ Username **${username}** is already taken.`, 
                    ephemeral: true 
                });
            }

            await User.create({ username, password });

            return await interaction.reply({ 
                content: `✅ User **${username}** successfully created via Discord!`, 
                ephemeral: true 
            });
        } // 👈 Este era el que faltaba

        // 2. /ppcreateservice
        if (commandName === 'ppcreateservice') {
            const name = interaction.options.getString('name');
            const description = interaction.options.getString('description') || 'No description provided';

            await Service.create({ name, description });
            return await interaction.reply({ content: `✅ Service **${name}** created successfully!` });
        }

        // 3. /ppgetuser
        if (commandName === 'ppgetuser') {
            const username = interaction.options.getString('username');

            const user = await User.findOne({ where: { username } });
            if (!user) {
                return await interaction.reply({ 
                    content: `❌ User **${username}** not found in the database.`, 
                    ephemeral: true 
                });
            }

            return await interaction.reply({ 
                content: `🔍 **User Found:**\n• **ID:** ${user.id}\n• **Username:** ${user.username}\n• **Created At:** ${user.createdAt}` 
            });
        }

    } catch (error) {
        console.error(`❌ Error executing command ${commandName}:`, error.message);
        if (!interaction.replied) {
            await interaction.reply({ 
                content: '❌ There was an error executing this command.', 
                ephemeral: true 
            });
        }
    }
});

const startBot = async () => {
    try {
        if (!process.env.DISCORD_TOKEN) {
            console.error('❌ Missing DISCORD_TOKEN in environment variables.');
            return;
        }
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('❌ Failed to start Discord Bot:', error.message);
    }
};

module.exports = { client, startBot };