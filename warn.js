const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { Types } = require("mongoose");

const warnSchema = require("../../schemas/moderation/warnSchema");
const modSchema = require("../../schemas/moderation/modSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setName("warn")
    .setDescription("Warn a user")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("The user to warn")
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName("reason")
        .setDescription("The reason for the warn")
        .setRequired(true)
        .setMinLength(5)
        .setMaxLength(500);
    }),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options, guild, member } = interaction;
    const user = options.getUser("user");
    const reason = options.getString("reason");

    const data = await warnSchema.findOne({
      guildId: guild.id,
      userId: member.user.id,
    });

    const modData = await modSchema.findOne({ guildId: guild.id });

    const warnDate = new Date().toTimeString();

    const newSchema = new warnSchema({
      _id: Types.ObjectId(),
      guildId: guild.id,
      userId: user.id,
      warnReason: reason,
      moderator: member.user.id,
      warnDate: warnDate,
    });

    newSchema.save().catch((err) => console.log(err));

    await interaction.deferReply();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("User warned!")
          .setDescription(`<@${user.id}> has been warned for \`${reason}\`!`)
          .setColor("Red"),
      ],
      ephemeral: true,
    });

    user
      .send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`You have been warned in: ${guild.name}`)
            .addFields(
              {
                name: "Warned for",
                value: `\`${reason}\``,
                inline: true,
              },
              {
                name: "Warned at",
                value: `${warnDate}`,
                inline: true,
              }
            )
            .setColor("#2f3136"),
        ],
      })
      .catch(async (err) => {
        console.log(err);
        await interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setTitle("User has dms disabled so no DM was sent.")
              .setColor("Red"),
          ],
        });
      });
  },
};
