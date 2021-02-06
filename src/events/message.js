//Define that Discord requires discord.js package.
const Discord = require("discord.js");

exports.run = (client, message) => {
  //Check if the message author is a bot.
  if (message.author.bot) {
    return;
  }

  //Check if the message is in a guild.
  if (message.guild) {
    //Create the variable score.
    let score = client.getScore.get(message.author.id, message.guild.id);
    //Check if there is data for this user in the database, if not create it.
    if (!score) {
      score = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      }
    }

    //Create the formula to increment the experience every message.
    const experienceIncrement = Math.floor(Math.random() * 1) + 500;
    //Create a constant of the current experience.
    const currentExperience = score.points;
    //Create a constant of the current level.
    const currentLevel = score.level;
    //Create a formula for the next level.
    const nextLevel = 5000 * (Math.pow(2, score.level) - 1);
    //Add experience every message.
    score.points = currentExperience + experienceIncrement;
    //Check if nextLevel is bigger than score.points to increase the level
    if (nextLevel <= score.points) {
      //Increase the level by one.
      score.level = currentLevel + 1;

      //Create an embed to say that the user level up
      const memberLevelMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTitle("Lithium - Niveles")
        .setTimestamp()
        .setFooter(`Enviado a ${message.member.displayName}`)
        .setDescription(`¡Has subido a nivel ${currentLevel + 1}!`);

      message.channel.send({ embed: memberLevelMessage });
    }

    //Set the new experience and level value in the database.
    client.setScore.run(score);

    //Check if the level is 15 or bigger.
    if (score.level >= 15) {
      //Add the prestige role if it is bigger or equal.
      message.member.roles.add(message.guild.roles.cache.find((x) => x.name === "⁃ Prestigio"));
    }
  }
}