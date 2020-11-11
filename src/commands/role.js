exports.run = (_client, msg, args, _content, _command, Discord) => {
    //Check the channel were the author of message sent the command.
    if (!(msg.channel.name.startsWith(`💻┋comandos`) || msg.channel.name.startsWith(`💫┋off-topic`))) {
        //Create the embed message using MessageEmbed() constructor.
        const incorrectChannelMessage = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Usa comandos en los canales correspondientes.');
      
        //Send the embed to the channel were the command was called.
        msg.channel.send({embed: incorrectChannelMessage}).catch(console.error);
        //The return to exit.
        return;
    }

    //Check if the sender has enough permissions.
    if (!msg.member.hasPermission('MANAGE_ROLES')) {
        const noEnoughPermsMessage = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('No tienes permisos para ejecutar ese comando.');
        
        msg.channel.send({embed: noEnoughPermsMessage}).catch(console.error);
        return;
    }

    //Create the variable where we store the arguments.
    const roleInput = args[0];
    //Check if the role ID is undefined or everyone.
    if (typeof roleInput === 'undefined' || roleInput == '675531469086523436') {
        const defaultRoleMessage = new Discord.MessageEmbed()
            .setColor('#8b0000')
            .setTimestamp()
            .setFooter(`Denegado a ${msg.member.displayName}`)        
            .setTitle(`Error`)
            .setDescription('Por favor, ingresa la ID de un rol que no sea el por defecto o indefinido.');
        
        msg.channel.send({embed: defaultRoleMessage}).catch(console.error);
        return;
    } else {
        //Create a variable where we find the role in the cache.
        const role = msg.guild.roles.cache.find(x => x.id === roleInput);
        //Check if the role is valid or not.
        if (!role) {
            const invalidRoleMessage = new Discord.MessageEmbed()
                .setColor('#8b0000')
                .setTimestamp()
                .setFooter(`Denegado a ${msg.member.displayName}`)        
                .setTitle(`Error`)
                .setDescription('Por favor, ingresa una ID de un rol válido.');
        
            msg.channel.send({embed: invalidRoleMessage}).catch(console.error);
            return;
        } else {
            //Create a variable where we map all the members in the role using their user tag and then we sort them in alphabetical order.
            const mappedMembers = role.members.map(m=>m.user.tag).sort();
            const numberMembers = mappedMembers.length == 1 ? 'miembro' : 'miembros';

            //Create a variable to store the members but with a format.
            let formatMembers = "";
            if (mappedMembers.length <= 0) {
                formatMembers = 'Sin miembros.'
            } else {
                //Using this for loop we can format the length of the mapped members.
                for (let i = 0; i < mappedMembers.length; i++){
                    //Here we append the - and we make a new line.
                    formatMembers += ("\n   - " + String(mappedMembers[i]));
                }
            }
            
            //Create a simple string with the two variables.
            const totalMembers = `\`${mappedMembers.length}\` ${numberMembers}`;

            //Now, we create the embed with all the members of the role and the name of the rol.
            const sucessMessage = new Discord.MessageEmbed()
                .setTitle("Lithium - Administración")
                .setColor('#ff8c00')
                .setDescription(`El rol \`${role.name}\` tiene un total de ${totalMembers}.\nA continuación, se muestran todos los miembros de este rol:\n\`\`\`yaml\nMiembros:${formatMembers}\`\`\``)
                .setTimestamp()
                .setFooter(`Solicitado por ${msg.member.displayName}`);
            
            msg.channel.send({embed: sucessMessage}).catch(console.error);
        }
    }
}

//Create an entry for this command.
exports.help = {
    name: "Role",
    category: "Administración",
    description: "Muestra información del rol.",
    usage: "Role [ID]"
}