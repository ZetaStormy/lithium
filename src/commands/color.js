exports.run = (_client, msg, args, content, _command, Discord) => {
  //Check if the member has the special role.
  if (!msg.member.roles.cache.find(x => x.name === "⁃ Prestigio")) {
    var embed = new Discord.MessageEmbed()
    .setColor('#8b0000')
    .setTimestamp()
    .setFooter(`Denegado a ${msg.member.displayName}`)        
    .setTitle(`Error`)
    .setDescription('No tienes permisos para hacer esto.');
    
    msg.channel.send({embed}).catch(console.error);
    return;
  }
  
  //Declare an array with all the color roles, there are 15 in total.
  const colorRoles = ["⁃ Azul", "⁃ Naranja", "⁃ Amarillo", "⁃ Morado", "⁃ Cian", "⁃ Lima", "⁃ Fucsia", "⁃ Aqua", "⁃ Oliva", "⁃ Vino Tinto", "⁃ Gris", "⁃ Verde", "⁃ Magenta", "⁃ Rojo", "⁃ Rosa"];
  //Declare an empty string variable for the color list.
  var colorList = "";
  //Get the color list using this for loop.
  for (let i = 0; i < colorRoles.length; i++) {
    colorList += ("   " + String(colorRoles[i]) + "\n");
  }

  //Create a constant embed that we are going to send if the color is invalid or something like that.
  const invalidColor = new Discord.MessageEmbed()
  .setColor('#8b0000')
  .setTimestamp()
  .setFooter(`Denegado a ${msg.member.displayName}`)
  .setTitle('Error')
  .setDescription(`
El color que introdujiste es inválido, o directamente no
se ha encontrado un argumento apropiado para obtener el color.
Por favor, introduce un color de la siguiente lista:
\`\`\`yaml
Colores:
${colorList}
\`\`\`
  `);

  //Check if enough arguments were given.
  if (!args[0] || args.length > 2) {
    msg.channel.send(invalidColor).catch(console.error);
    return;
  }

  //Create the function to remove all colors of the member
  function removeColors() {
    //Loop through all the colors using this for loop.
    for (let n = 0; n < colorRoles.length; n++) {
      //Create the color role variable to check if the user has the color.
      var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
      if (!colorRole) {
        continue; //Continue the loop if the member doesn't have the color.
      } else {
        msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the role using the role ID.
      }
    }
  }

  //Create a function to check if the member has too much colors.
  function checkExcessColors() {
    //Loop through all the colors using this for loop.
    for (let h = 0; h < colorRoles.length; h++) {
      //Create a boolean variable to check if the user has too much colors.
      var excessColors = false;
      var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]); //Find the role in the member.
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
  }

  //Create an array of all the member roles.
  const memberRolesArray = msg.member.roles.cache.array();
  //Declare a variable where we are going to store the color selected in lower case and skipping the spaces.
  let colorSelection = args.join(" ").trim().toLowerCase();
  //Create a switch for the different cases of colors.
  switch (colorSelection) {
    case "reset": //If the arguments are reset.
      //Create an embed to say that the colors were reset successfully.
      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Tus colores han sido reiniciados correctamente.'); 

      removeColors(); //Call the function to remove the color roles.

      //Send the embed because the code is executed successfully.
      msg.channel.send({embed}).catch(console.error);
      break; //Stop the switch execution.
    case "azul": //If the color selected is blue.
      checkExcessColors(); //Check if the member has too much colors.
      //If the user doesn't have too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[0]);
      msg.member.roles.add(colorSelected.id).catch(console.error); //Add the role color to the member.

      //Create an embed to say that the color was applied successfully.
      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Azul correctamente.');

      //Send the message to the channel.
      msg.channel.send({embed}).catch(console.error);
      break; //Stop the switch execution.
    case "naranja": //If the color is orange.
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[1]); //Find the color selected role in the guild.
      msg.member.roles.add(colorSelected.id).catch(console.error); //Add the color selected ID to the member.

      //Create the successfully added color embed
      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Naranja correctamente.');

      //Send the embed.
      msg.channel.send({embed}).catch(console.error);
      break; //Break the loop.
    case "amarillo": //If the color is yellow
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[2]); //The color selected by the user.
      msg.member.roles.add(colorSelected.id).catch(console.error); //Add the color
      
      //Create the embed
      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Amarillo correctamente.');

      msg.channel.send({embed}).catch(console.error); //Send the embed
      break; //Break the switch statement
    case "morado": //In case the color is purple.
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[3]); //the selected color
      msg.member.roles.add(colorSelected.id).catch(console.error); //add the color

      var embed = new Discord.MessageEmbed() //create the message
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Morado correctamente.');

      msg.channel.send({embed}).catch(console.error); //send the message
      break; //break the execution of the switch
    case "cian": //cyan color
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[4]); //the color selected
      msg.member.roles.add(colorSelected.id).catch(console.error); //add the role

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Cian correctamente.');

      msg.channel.send({embed}).catch(console.error); //send the embed that we created before.
      break; //break the switch
    case "lima": //lime color
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[5]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Lima correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "fucsia": //color... idk how to say this in english, sorry
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[6]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Fucsia correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    /* Sorry, but I don't want to comment this anymore.
     * TODO: In the future I will improve this commands with functions and that stuff so it doesn't have too much lines
     * Good night.
     */
    case "aqua":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[7]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Aqua correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "oliva":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[8]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Oliva correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "vino tinto":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[9]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Vino Tinto correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "gris":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[10]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Gris correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "verde":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[11]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

        
      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Verde correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "magenta":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[12]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Magenta correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "rojo":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[13]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Rojo correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;
    case "rosa":
      checkExcessColors(); //Check if the member has too much colors.
      var colorSelected = msg.guild.roles.cache.find(k => k.name === colorRoles[14]);
      msg.member.roles.add(colorSelected.id).catch(console.error);

      var embed = new Discord.MessageEmbed()
      .setColor('#ff8c00')
      .setTitle('Lithium - Colores')
      .setTimestamp()
      .setFooter(`Solicitado por ${msg.member.displayName}`)
      .setDescription('Se te ha colocado el color Rosa correctamente.');

      msg.channel.send({embed}).catch(console.error);
      break;      
    default:
      msg.channel.send(invalidColor).catch(console.error);
      return;
  }
}

//Add the help entry
exports.help = {
    name: "Color",
    category: "Misceláneo",
    description: "Cambia el color de tu rol.",
    usage: "Color [Color/Reset]",
    example: "",
    status: "Ready"
};