
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'apply_button') {
      const modal = new ModalBuilder()
        .setCustomId('application_form')
        .setTitle('Apply Management Menu')
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('name')
              .setLabel("Your Name")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('age')
              .setLabel("Your Age")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('hours')
              .setLabel("Work Hours")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('experience')
              .setLabel("Your Experience")
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('problem')
              .setLabel("Administrative Problem")
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          )
        );
      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'application_form') {
      const name = interaction.fields.getTextInputValue('name');
      const age = interaction.fields.getTextInputValue('age');
      const hours = interaction.fields.getTextInputValue('hours');
      const experience = interaction.fields.getTextInputValue('experience');
      const problem = interaction.fields.getTextInputValue('problem');

      const channel = await interaction.guild.channels.fetch('ID_القناة_الي_تبغى_ترسل_فيها');

      await channel.send({
        content: `📥 **New Application:**\n👤 Name: ${name}\n🎂 Age: ${age}\n🕒 Hours: ${hours}\n💼 Experience: ${experience}\n⚠️ Problem: ${problem}`
      });

      await interaction.reply({ content: '✅ تم إرسال طلبك بنجاح!', ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
