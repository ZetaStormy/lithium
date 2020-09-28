const fs = require("fs");
exports.run = (_client, msg, args, _content, _command, Discord, config) => {
    //Check the channel were the author of message sent the command.
    if (!msg.channel.name.startsWith(`💻┋comandos`) && !msg.channel.name.startsWith(`💫┋off-topic`)) {
        //Create the embed message using MessageEmbed() constructor.
        var incorrectChannel = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTimestamp()
        .setFooter(`Denegado a ${msg.member.displayName}`)        
        .setTitle(`Error`)
        .setDescription('Usa comandos en los canales correspondientes.');
        
        //Send the embed to the channel were the command was called.
        msg.channel.send({incorrectChannel}).catch(console.error);
        //The return to exit.
        return;
    }
    
    //Use the variable files to read the content of the folder commands.
    var files = fs.readdirSync('./commands/');
    //Create a constant array where we are going to store the commands.
    const commands = [];
    //Store the commands in the array replacing the extension .js with nothing.
    for (i in files) {
        var cmd = files[i];
        commands.push(cmd.replace(".js",""));
    }

    //Create a variable where we are going to store the first argument of the command (the category).
    var categoryArgument = args[0];
    //Check if the argument is undefined or not.
    if (typeof categoryArgument === 'undefined') {
        //Create an array with all the categories.
        var categoryList = [];
        //Create a for loop that is going to read every command category.
        for (i in commands) {
            //Create the variable cmd where we store the commands.
            var cmd = require("../commands/" + commands[i] + ".js");
            //Then read the category of each command and check if the index is lower than zero.
            if (categoryList.indexOf(cmd.help.category) < 0) {categoryList.push(cmd.help.category)}
        }

        //Create a variable to store a string of all the categories that we found before.
        var availableCategories = "";
        //Then store the categories in the availableCategories variable using a for loop with the lenght of the categoryList array.
        for (var i = 0; i < categoryList.length; i++){
            //Append - and create a new line in each category.
            availableCategories += ("   - " + String(categoryList[i] + "\n"));
        }
        
        //Create a embed message with the categories.
        var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setTimestamp()
            .setTitle("Lithium - Comandos")
            .setFooter(`Solicitado por ${msg.member.displayName}`)
            .setDescription(`Obtén la lista de comandos con \`-help [Categoría]\`\nA continuación, se muestran todas las categorías disponibles.\n\`\`\`yaml\nCategorias:\n${availableCategories}\`\`\``);
            msg.channel.send({embed}).catch(console.error);
    } else {
        //Check if the category is restricted to the administration.
        if (categoryArgument.toLowerCase() === "Administración" && !msg.member.roles.cache.find(x => x.name === "⁃ Administración")) {
            var embed = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
        
            msg.channel.send({embed}).catch(console.error);
        } else {
            //Create the category help embed.
            var embed = new Discord.MessageEmbed()
            .setColor('#ff8c00')
            .setTitle(`Lithium - Comandos`)
            .setTimestamp()
            .setFooter(`Solicitado por ${msg.member.displayName}`)
            .setDescription(`En caso de que notes que algo no anda bien con este comando, por favor, hazle saber al Staff o a la administración. A continuación, se muestran los comandos de la categoría **${categoryArgument}**:`)
            //Using a for loop to go for each command.
            for (y in commands) {
                //Create a variable where we store the commands.
                var cmd = require("../commands/" + commands[y] + ".js");
                //Check if the category of the command that we are checking with the for loop equals the category of the args.
                if (cmd.help.category.toLowerCase() === categoryArgument.toLowerCase()) {
                    //Add the command prefix, usage and description.
                    embed.addField(`\`${config.prefix}${cmd.help.usage}\``, `${cmd.help.description}`);
                }
            }
            //Just send the embed that we created before.
            msg.channel.send({embed}).catch(console.error);
        }
    }
}

//Create an entry for this command in -help.
exports.help = {
    name: "Help",
    category: "Información",
    description: "Muestra todos los comandos disponibles.",
    usage: "Help [Categoría]",
    example: "",
    status: "Untested"
};