const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");

const warnSchema = require("../../schemas/moderation/warnSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Get the logs of a user")
    .addSubcommand((subCmd) =>
      subCmd
        .setName("warns")
        .setDescription("Get the warns of a user")
        .addUserOption((option) => {
          return option
            .setName("user")
            .setDescription("User to get the warn logs for")
            .setRequired(true);
        })
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "warns":
        {
          const user = interaction.options.getUser("user");

          const userWarnings = await warnSchema.find({
            userId: user.id,
            guildId: interaction.guild.id,
          });

          const err = new EmbedBuilder()
            .setTitle("User Warn Logs")
            .setDescription(`${user} has no warn logs`)
            .setColor("Red");

          if (!userWarnings?.length)
            return interaction.reply({ embeds: [err] });

          const embedDescription = userWarnings
            .map((warn) => {
              const moderator = interaction.guild.members.cache.get(
                warn.moderator
              );

              return [
                `<:replyAbove:1022900085002088520> Warn ID: ${warn.id}`,
                `<:replycontinued:1015235683209707534> Moderator: ${
                  `<@${moderator}>` || "Moderator left"
                }`,
                `<:replycontinued:1015235683209707534> User: ${warn.userId}`,
                `<:replycontinued:1015235683209707534> Reason: \`${warn.warnReason}\``,
                `<:reply:1015235235195146301> Date: ${warn.warnDate}`,
              ].join("\n");
            })
            .join("\n\n");

          const embed = new EmbedBuilder()
            .setTitle(`${user.tag}'s warn logs`)
            .setDescription(embedDescription)
            .setColor("#2f3136");

          await interaction.reply({ embeds: [embed] });
        }
        break;

      default:
        break;
    }
  },
};
