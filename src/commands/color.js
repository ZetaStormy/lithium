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

      //Send the embed because the code is executed successfully.
      msg.channel.send({embed}).catch(console.error);
      break; //Stop the switch execution.
    case "azul": //If the color selected is blue.
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
        //Loop again.
        for (let n = 0; n < colorRoles.length; n++) {
          //Find the color role in the member roles.
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue; //If the role is undefined, continue and search for another color.
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the color if the member has it.
          }
        }
      }

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
      //Go through all the color roles array.
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false; //Boolean to check if the member has too much colors.
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]); //Find the color role in the member.
        if (!colorRole) {
          continue; //If the user doesn't has the color role, then continue the loop.
        } else { //If the user has the role.
          if (memberRolesArray.includes(colorRole)) { //Check if the member roles array includes the color role.
            excessColors = true; //The member has too much colors.
            break; //Break the loop.
          } else {
            continue; //Continue to loop to search another color role.
          }
        }
      }
      
      //If the user has too much colors.
      if (excessColors) {
        //Loop again.
        for (let n = 0; n < colorRoles.length; n++) {
          //Find the color role in the member roles.
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue; //If the role is undefined, continue and search for another color.
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the color if the member has it.
          }
        }
      }

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
      //Go through the color roles array.
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false; //Boolean to check if the member has too much colors.
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]); //Find the color role in the member roles.
        if (!colorRole) { //If the member doesn't have the color role.
          continue; //Continue the loop to search for another color role.
        } else { //Else.....
          if (memberRolesArray.includes(colorRole)) { //If the array of member roles include the color role.
            excessColors = true; //Too much colors is true.
            break; //Break the loop
          } else { //again, else..
            continue; //Continue and search for another role.
          }
        }
      }
      
      //If the user has too much colors.
      if (excessColors) {
        //Loop again.
        for (let n = 0; n < colorRoles.length; n++) {
          //Find the color role in the member roles.
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue; //If the role is undefined, continue and search for another color.
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the color if the member has it.
          }
        }
      }

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
      //Go through all the color roles array.. again.
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false; //If the user has too much colors this will be true (if it works)
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]); //Find the color role
        if (!colorRole) { //if the member doesn't have the color role
          continue; //continue through the loop
        } else { //elseee
          if (memberRolesArray.includes(colorRole)) { //if the member roles array includes a color role
            excessColors = true; //the member has too much colors
            break; //break the loop, BREAK DIWFNMWF
          } else { //elsseeddfwf
            continue; //continue, please
          }
        }
      }
      
      //If the user has too much colors.
      if (excessColors) {
        //Loop again.
        for (let n = 0; n < colorRoles.length; n++) {
          //Find the color role in the member roles.
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue; //If the role is undefined, continue and search for another color.
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the color if the member has it.
          }
        }
      }

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
      //Go through the loop, you know, the for loop that i comment everytime i see it
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false; //will be true if the user want to much colors
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]); //Get the color role in the member roles
        if (!colorRole) { // if the member doesn't have the color role
          continue; //continue the execution of the loop
        } else { //el
          if (memberRolesArray.includes(colorRole)) { //check if the member roles array includes the color role
            excessColors = true; //the member does have too much colors
            break; //break the execution of the loop
          } else {
            continue; //continue the loop if akdfmwufjqngew
          }
        }
      }
      
      //If the user has too much colors.
      if (excessColors) {
        //Loop again.
        for (let n = 0; n < colorRoles.length; n++) {
          //Find the color role in the member roles.
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue; //If the role is undefined, continue and search for another color.
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the color if the member has it.
          }
        }
      }

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
     //the for that goes through all the color roles array
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false; //boolean that is useful
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]); //find the role in the member roles
        if (!colorRole) {
          continue; //if the member doesn't have the role, continue the loop
        } else { //Ellse
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true; //if the member has too much roles this is true
            break; //break the execution of the loop
          } else {
            continue; //continue the loop because the member roles arrays doesn't includes the color role.
          }
        }
      }
      
      //If the user has too much colors.
      if (excessColors) {
        //Loop again.
        for (let n = 0; n < colorRoles.length; n++) {
          //Find the color role in the member roles.
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue; //If the role is undefined, continue and search for another color.
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the color if the member has it.
          }
        }
      }

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
      //go through all the color roles array
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false; //this boolean is true if the user does have too much colors
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]); //find the color role
        if (!colorRole) {
          continue; //if the user doesn't have the color role, continue the execution of the loop-
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true; //this is true because the user has too much colors.
            break; //break the loop
          } else {
            continue; //continue the loop because we didn't find any color that is included in the member roles array
          }
        }
      }
      
      //If the user has too much colors.
      if (excessColors) {
        //Loop again.
        for (let n = 0; n < colorRoles.length; n++) {
          //Find the color role in the member roles.
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue; //If the role is undefined, continue and search for another color.
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error); //Remove the color if the member has it.
          }
        }
      }

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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }

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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }
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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }
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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }

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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }

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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }

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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }

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
      for (let h = 0; h < colorRoles.length; h++) {
        var excessColors = false;
        var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[h]);
        if (!colorRole) {
          continue;
        } else {
          if (memberRolesArray.includes(colorRole)) {
            excessColors = true;
            break;
          } else {
            continue;
          }
        }
      }
      
      if (excessColors) {
        for (let n = 0; n < colorRoles.length; n++) {
          var colorRole = msg.member.roles.cache.find(r => r.name === colorRoles[n]);
          if (!colorRole) {
            continue;
          } else {
            msg.member.roles.remove(colorRole.id).catch(console.error);
          }
        }
      }

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