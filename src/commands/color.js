exports.run = (_client, msg, args, content, _command, Discord) => {
  //Check the channel were the author of message sent the command.
  if (!(msg.channel.name.startsWith("💻┋comandos") || msg.channel.name.startsWith("💫┋off-topic"))) {
    //Create the embed message using MessageEmbed() constructor.
    const incorrectChannelMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("Usa comandos en los canales correspondientes.");

    //Send the embed to the channel were the command was called.
    msg.channel.send({ embed: incorrectChannelMessage });
    //The return to exit.
    return;
  }

  //Check if the member has the special role.
  if (!(msg.member.roles.cache.find((x) => x.name === "⁃ Prestigio") || msg.member.roles.cache.find((x) => x.name === "⁃ Administración"))) {
    const notEnoughPermissionsMessage = new Discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denegado a ${msg.member.displayName}`)
      .setTitle("Error")
      .setDescription("No tienes permisos para hacer esto.");

    msg.channel.send({ embed: notEnoughPermissionsMessage });
    return;
  }

  //Declare an array with all the color roles, there are 15 in total.
  const colorRoles = ["⁃ Azul", "⁃ Naranja", "⁃ Amarillo", "⁃ Morado", "⁃ Cian", "⁃ Lima", "⁃ Fucsia", "⁃ Aqua", "⁃ Oliva", "⁃ Vino Tinto", "⁃ Gris", "⁃ Verde", "⁃ Magenta", "⁃ Rojo", "⁃ Rosa"];
  //Declare an empty string variable for the color list.
  let colorList = "";
  //Get the color list using this for loop.
  for (let i = 0; i < colorRoles.length; i++) {
    colorList += ("   " + String(colorRoles[i]) + "\n");
  }

  //Create a constant embed that we are going to send if the color is invalid or something like that.
  const invalidColorMessage = new Discord.MessageEmbed()
    .setColor("#8b0000")
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)
    .setTitle("Error")
    .setDescription(`
El color que introdujiste es inválido, o directamente no
se ha encontrado un argumento apropiado para obtener el color.
Por favor, introduce un color de la siguiente lista:
\`\`\`yaml
Colores:
${colorList}
\`\`\`
    `);

  //Create the function to remove all colors of the member
  function removeColors() {
    //Loop through all the colors using this for loop.
    for (let n = 0; n < colorRoles.length; n++) {
      //Create the color role variable to check if the user has the color.
      let colorRole = msg.member.roles.cache.find((r) => r.name === colorRoles[n]);
      if (!colorRole) {
        continue; //Continue the loop if the member doesn't have the color.
      } else {
        msg.member.roles.remove(colorRole.id); //Remove the role using the role ID.
      }
    }
  }

  //Create an array of all the member roles.
  const memberRolesArray = msg.member.roles.cache.array();
  let excessColors;
  //Create a function to check if the member has too much colors.
  function colorProcess(colorString, colorEntry) {
    //Loop through all the colors using this for loop.
    for (let h = 0; h < colorRoles.length; h++) {
      //Create a boolean variable to check if the user has too much colors.
      excessColors = false;
      let colorRole = msg.member.roles.cache.find((r) => r.name === colorRoles[h]); //Find the role in the member.
      if (!colorRole) {
        continue; //Continue to the next role if the member doesn't have the role.
      } else {
        //If the array of the member roles includes the color role.
        if (memberRolesArray.includes(colorRole)) {
          excessColors = true; //The excess of colors is true.
          break; //Exit the loop.
        } else {
          continue; //If the array doesn't contains the color role, continue the loop to search for another color role.
        }
      }
    }

    //If the user has too much colors.
    if (excessColors) {
      removeColors(); //Call the function to remove colors.
    }

    const colorSelected = msg.guild.roles.cache.find((k) => k.name === colorRoles[colorEntry]); //Find the role for the color.
    msg.member.roles.add(colorSelected.id); //Add the role color to the member.    

    //Create an embed to say that the color was applied successfully.
    const sucessMessage = new Discord.MessageEmbed()
      .setColor("#ff8c00")
      .setTitle("Lithium - Colores")
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription(`Se te ha colocado el color ${colorString} correctamente.`);

    //Send the message to the channel.
    msg.channel.send({ embed: sucessMessage });
  }

  //Declare a variable where we are going to store the color selected in lower case and skipping the spaces.
  const colorSelection = args.join(" ").trim().toLowerCase();
  //Create a switch for the different cases of colors.
  switch (colorSelection) {
    case "reset": //If the arguments are reset.
      //Create an embed to say that the colors were reset successfully.
      const colorResetMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTitle("Lithium - Colores")
        .setTimestamp()
        .setFooter(`Solicitado por ${msg.member.displayName}`)
        .setDescription("Tus colores han sido reiniciados correctamente.");

      removeColors(); //Call the function to remove the color roles.
      msg.channel.send({ embed: colorResetMessage });
      break; //Stop the switch execution.
    case "azul": //If the color selected is blue.
      colorProcess("Azul", 0); //Execute the color process and give it the color properties.
      break; //Stop the switch execution.
    case "naranja": //If the color is orange.
      colorProcess("Naranja", 1); //Execute the color process and give it the color properties.
      break; //Break the switch.
    case "amarillo": //If the color is yellow
      colorProcess("Amarillo", 2); //Execute the color process and give it the color properties.
      break; //Break the switch statement
    case "morado": //In case the color is purple.
      colorProcess("Morado", 3); //Execute the color process and give it the color properties.
      break; //break the execution of the switch
    case "cian": //cyan color
      colorProcess("Cian", 4); //Execute the color process and give it the color properties.
      break; //break the switch
    case "lima": //lime color
      colorProcess("Lima", 5); //Execute the color process and give it the color properties.
      break;
    case "fucsia": //color... idk how to say this in english, sorry
      colorProcess("Fucsia", 6); //Execute the color process and give it the color properties.
      break;
    case "aqua":
      colorProcess("Aqua", 7); //Execute the color process and give it the color properties.
      break;
    case "oliva":
      colorProcess("Oliva", 8); //Execute the color process and give it the color properties.
      break;
    case "vino tinto":
      colorProcess("Vino Tinto", 9); //Execute the color process and give it the color properties.
      break;
    case "gris":
      colorProcess("Gris", 10); //Execute the color process and give it the color properties.
      break;
    case "verde":
      colorProcess("Verde", 11); //Execute the color process and give it the color properties.
      break;
    case "magenta":
      colorProcess("Magenta", 12); //Execute the color process and give it the color properties.
      break;
    case "rojo":
      colorProcess("Rojo", 13); //Execute the color process and give it the color properties.
      break;
    case "rosa":
      colorProcess("Rosa", 14); //Execute the color process and give it the color properties.
      break;
    default: //Default case, in this case is used for invalid colors.
      msg.channel.send({ embed: invalidColorMessage });
      return;
  }
}

//Add the help entry
exports.help = {
  name: "Color",
  category: "Misceláneo",
  description: "Cambia el color de tu rol.",
  usage: "Color [Color/Reset]"
}