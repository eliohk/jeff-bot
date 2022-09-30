const Discord = require ('discord.js');
const cron = require('node-cron');
const { parse } = require('path');
const client = new Discord.Client();

const divInfo = [
	{kanal: '855839348242645012', platform: 'pc',  series: 'f1', div: '1',  role: '782034670568079390', readyTime: '21:00', invites: '20:45', dag: 'Søndag',  res: 'Lørdag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371987824975912/1.DIV.png'},
	{kanal: '855839458859679764', platform: 'pc',  series: 'f1', div: '2',  role: '782034894515470346', readyTime: '21:15', invites: '21:00', dag: 'Tirsdag', res: 'Mandag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371991058792478/2.DIV.png'},
	{kanal: '879807272384077894', platform: 'pc',  series: 'f1', div: '3',  role: '782034947249537026', readyTime: '21:15', invites: '21:00', dag: 'Onsdag',  res: 'Tirsdag', thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371998918934558/Untitled-3.png'},
	{kanal: '879807320157216798', platform: 'pc',  series: 'f1', div: '4',  role: '796109083353808917', readyTime: '19:45', invites: '19:30', dag: 'Onsdag',  res: 'Tirsdag', thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371994514915389/4.div.png'},
	{kanal: '935588218190061598', platform: 'pc',  series: 'f1', div: '5',  role: '935589262756294666', readyTime: '19:45', invites: '19:30', dag: 'Tirsdag', res: 'Mandag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371996620456016/5.div.png'},
	{kanal: '883140763750400000', platform: 'ps4', series: 'f1', div: '0',  role: '819142833915166741', readyTime: '20:30', invites: '20:20', dag: 'Torsdag', res: 'Onsdag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/883045527929880586/No_ass.png'},
	{kanal: '883140306588041276', platform: 'ps4', series: 'f1', div: '1',  role: '788105255207960597', readyTime: '20:00', invites: '19:50', dag: 'Søndag',  res: 'Lørdag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371987824975912/1.DIV.png'},
	{kanal: '883140967971049553', platform: 'ps4', series: 'f1', div: '2',  role: '788105255207960596', readyTime: '20:00', invites: '19:50', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371991058792478/2.DIV.png'},
	{kanal: '883141462307532832', platform: 'ps4', series: 'f1', div: '3',  role: '788105255170736147', readyTime: '21:30', invites: '21:20', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371998918934558/Untitled-3.png'},
	{kanal: '883141725017739315', platform: 'ps4', series: 'f1', div: '4',  role: '788110682108985374', readyTime: '20:00', invites: '19:50', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371994514915389/4.div.png'},
	{kanal: '883141895021277216', platform: 'ps4', series: 'f1', div: '5',  role: '788115068030156820', readyTime: '21:30', invites: '21:20', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870371996620456016/5.div.png'},
	{kanal: '883142384974696498', platform: 'ps4', series: 'f1', div: '6',  role: '788115280445964369', readyTime: '21:30', invites: '21:20', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870771877197541416/6.png'},
	{kanal: '883142632900018206', platform: 'ps4', series: 'f1', div: '7',  role: '788115420183789599', readyTime: '20:00', invites: '19:50', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870771895321108601/7.png'},
	{kanal: '883142762063614002', platform: 'ps4', series: 'f1', div: '8',  role: '788115497232105512', readyTime: '21:30', invites: '21:20', dag: 'Tirsdag', res: 'Mandag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870771915499905045/8.png'},
	{kanal: '883142900198821888', platform: 'ps4', series: 'f1', div: '9',  role: '879818860952440923', readyTime: '20:00', invites: '19:50', dag: 'Tirsdag', res: 'Mandag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870771940024000604/9.png'},
	{kanal: '883143030616506378', platform: 'ps4', series: 'f1', div: '10', role: '879819011653779486', readyTime: '21:30', invites: '21:20', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/744296274131550358/870771958797717564/10.png'},
	{kanal: '939960939921412106', platform: 'ps4', series: 'f1', div: '11', role: '939960040574574634', readyTime: '20:00', invites: '19:50', dag: 'Mandag',  res: 'Søndag',  thumbnail: 'https://cdn.discordapp.com/attachments/712395652558225408/932268974673133598/11.div.png'},
	{kanal: '956976283357704192', platform: 'pc',  series: 'f2', div: '1',  role: '956927151016411177', readyTime: '20:30', invites: '20:15', dag: 'Torsdag', res: 'Onsdag',  thumbnail: 'https://img.redbull.com/images/e_trim:10:transparent/redbullcom/2020/5/29/dr0wsisnomqykmgi6q84/formula-2-logo'}
]

const teamInfo = [
	{name:'Mercedes', 				filteredName:'mercedes', 	series: 'f1', carIcon:'<:mercedesbil:879435118987575306>', 		logo:'<:mercedes:782048636053749760>',		index:null},
	{name:'Red Bull', 				filteredName:'redbull', 	series: 'f1', carIcon:'<:redbullbil:879435119021162546>', 		logo:'<:redbull:782048635973795880>',		index:null},
	{name:'Ferrari', 				filteredName:'ferrari', 	series: 'f1', carIcon:'<:ferraribil:879435118958231612>', 		logo:'<:ferrari:782048635859763210>', 		index:null},
	{name:'McLaren', 				filteredName:'mclaren', 	series: 'f1', carIcon:'<:mclarenbil:879435118970798140>', 		logo:'<:mclaren:782048635700641885>', 		index:null},
	{name:'Aston Martin',  	   	 	filteredName:'astonmartin', series: 'f1', carIcon:'<:astonmartinbil:879435119247630376>', 	logo:'<:astonmartin:879404728449130526>', 	index:null},
	{name:'Alpine', 				filteredName:'alpine', 		series: 'f1', carIcon:'<:alpinebil:879435118614290463>', 		logo:'<:Alpine:879404727551537172>', 		index:null},
	{name:'Alpha Tauri',    		filteredName:'alphatauri',  series: 'f1', carIcon:'<:alphatauribil:879435119079849984>', 	logo:'<:alphatauri:782048635314896916>', 	index:null},
	{name:'Haas',		   			filteredName:'haas', 		series: 'f1', carIcon:'<:haasbil:879435118731755591>', 			logo:'<:haas:782048636402008093>', 			index:null},
	{name:'Alfa Romeo', 			filteredName:'alfaromeo', 	series: 'f1', carIcon:'<:alfaromeobil:879435119021133906>', 	logo:'<:alfaromeo:782048635747172374>', 	index:null},
	{name:'Williams', 				filteredName:'williams', 	series: 'f1', carIcon:'<:williamsbil:879435119067283489>', 		logo:'<:williams:782048635441512468>', 		index:null},
	{name:'Kan ikke delta', 	    filteredName:'❌', 		   series: 'f1', carIcon:'❌', 									 logo:'❌', 								   index:null},
	// <====================== F1 / F2 ===========================================>
	{name:'Campos Racing',          filteredName:'camposracing', series: 'f2', carIcon:'Campos Racing', 			logo:'<:camposracing:966365725948260392>', 	index:null},
	{name:'DAMS',                   filteredName:'dams',         series: 'f2', carIcon:'DAMS', 			  			logo:'<:dams:966365725872754698>', 			index:null},
	{name:'Prema Racing',           filteredName:'prema',  		 series: 'f2', carIcon:'Prema Racing',   		  	logo:'<:prema:966365725822443540>',			index:null},
	{name:'Trident',                filteredName:'tridentracing',series: 'f2', carIcon:'Trident Racing',   			logo:'<:tridentracing:966365980412489798>', index:null},
	{name:'ART Grand Prix',         filteredName:'artgp',    	 series: 'f2', carIcon:'Art GP',     		  		logo:'<:artgp:966365725872750662>', 		index:null},
	{name:'UNI-Virtuosi Racing',    filteredName:'virtuosi', 	 series: 'f2', carIcon:'UNI-Virtuosi Racing',  		logo:'<:virtuosi:966365725826633738>', 		index:null},
	{name:'Hitech Grand Prix',      filteredName:'hitechgp', 	 series: 'f2', carIcon:'Hitech GP', 		    	logo:'<:hitechgp:966365725927297064>', 		index:null},
	{name:'MP Motorsport',          filteredName:'mpmotorsport', series: 'f2', carIcon:'MP Motorsport',     		logo:'<:mpmotorsport:966365726296408084>', 	index:null},
	{name:'HWA Racelab',            filteredName:'hwa',    		 series: 'f2', carIcon:'Hwa Racelab',         	  	logo:'<:hwa:966365725759529020>', 			index:null},
	{name:'Charouz Racing System',  filteredName:'charouz',		 series: 'f2', carIcon:'Charouz Racing System',     logo:'<:charouz:966365725876977674>', 	 	index:null},
	{name:'Carlin',                 filteredName:'carlin', 		 series: 'f2', carIcon:'Carlin',  		  	        logo:'<:carlin:966365725751144458>', 		index:null},
	{name:'Kan ikke delta',         filteredName:'❌',    	   series: 'f2', carIcon:'❌',                        logo:'❌', 			                       index:null}
]

const jeffid ='777918171411775498';
var teller=0;

//Notifies the user that the bot is online upon start-up.
client.once('ready', () => {
	console.log("To post next race check-in, type '!LETSGO (imagelink)\n");
	console.log("In order to create a new manual grid, type '!make (division)space(platform(pc/ps4))space(imagelink)' in the appropiate division channel.\n");
	console.log("To send a custom message type: '.jeff (custom message)'\n");
	console.log("To edit a custom message by Jeff type: '.editJeff (MessageID) (new custom message)\n");
	console.log("Do not use parenthesis () in the commands and properly use spaces    and commas ,,,");
	console.log("----------------------------------------------------------------------------------------------------------------------\n\n\n");
	client.user.setPresence({
		status: 'dnd', //You can show online, idle, dnd....
		activity: {
		 type: 'PLAYING', //PLAYING: WATCHING: LISTENING: STREAMING:
		 name: 'F1 2021', //The message shown
		},
	   });

});

//Basically a "main" function, all of the functionality is executed here.
client.on('message', message => {
	//NOTE: Write "!make division platform imagineURL" to make an embed for check-in in the server the bot is in.
	if (message.content.startsWith('!make') && (message.member.roles.cache.has('782033550270529546') || message.member.roles.cache.has('788105255229194325') || message.author.id == '777918171411775498' || message.author.id == '172846906584596480')) {
		message.delete({ timeout:500});
		//await message.guild.members.fetch().then(console.log("YAY")).catch(console.error("ERRORED FFS"))

		let bite = message.content.split(" ")

		if (!(divInfo.find(div => div.series === bite[1] && divInfo.find(div => div.div === bite[2]) && divInfo.find(div => div.platform === bite[3])))) {
			message.channel.send("Command failed. Correct usage is: !make <series> <division> <pc> <picture>\n" +
			"Example usage for F1, 1. div pc: !make f1 1 pc https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640\n\n" +
			"Ask <@237979592332279811> or <@197477450031038464> for assistance if required.")
		} else{
			checkInCreator(message, makeEmbed(message));
		} 
	}
	else if (message.content.startsWith('!LETSGO') && (message.member.roles.cache.has('782033550270529546') || message.member.roles.cache.has('788105255229194325') || message.author.id == '777918171411775498')) {	
		let bite = message.content.split(" ")
		if (bite.length != 3) {
			message.channel.send("Command failed. Correct usage is: !LETSGO <series> <picture>\n" +
			"Example usage: !LETSGO f1 https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640\n\n" +
			"Ask <@237979592332279811> or <@197477450031038464> for assistance if required.")
		} else {
			for(let div of divInfo){
				if((div.platform == 'ps4' && div.div == '0') || div.series == 'f2'){
					continue;
				} else {
					let bite = message.content.split(" ")
					client.channels.cache.get(div.kanal).send(`!make ${bite[1]} ${div.div} ${div.platform} ${bite[2]}`);
				}
			}
		}
	} 
	//TODO: TEMPORARY MEASURE FOR PS4 DUE TO UNSYNCED CALENDARS.
	else if (message.content.startsWith('!PS4LETSGO') && (message.member.roles.cache.has('782033550270529546') || message.member.roles.cache.has('788105255229194325') || message.author.id == '777918171411775498')) {
		if (message.content.split(" ").length != 3) {
			message.channel.send("Command failed. Correct usage is: !PS4LETSGO <series> <picture>\n" +
			"Example usage: !LETSGO f1 https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640\n\n" +
			"Ask <@237979592332279811> or <@197477450031038464> for assistance if required.")
		} else {
			for(let div of divInfo){
				if((div.platform == 'ps4' && div.div == '0') || div.series == 'f2' || div.platform == 'pc'){
					continue;
				} else {
					let bite = message.content.split(" ")
					client.channels.cache.get(div.kanal).send(`!make ${bite[1]} ${div.div} ${div.platform} ${bite[2]}`);
				}
			}
		}
	}
	//TODO: TEMPORARY MEASURE FOR PC DUE TO UNSYNCED CALENDARS.
	else if (message.content.startsWith('!PCLETSGO') && (message.member.roles.cache.has('782033550270529546') || message.member.roles.cache.has('788105255229194325') || message.author.id == '777918171411775498')) {
		if (message.content.split(" ").length != 3) {
			message.channel.send("Command failed. Correct usage is: !PCLETSGO <series> <picture>\n" +
			"Example usage: !LETSGO f1 https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640\n\n" +
			"Ask <@237979592332279811> or <@197477450031038464> for assistance if required.")
		} else {
			for(let div of divInfo){
				if((div.platform == 'ps4' && div.div == '0') || div.series == 'f2' || div.platform == 'ps4'){
					continue;
				} else {
					let bite = message.content.split(" ")
					client.channels.cache.get(div.kanal).send(`!make ${bite[1]} ${div.div} ${div.platform} ${bite[2]}`);
				}
			}
		}
	}
}); 

/*
  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | month
  | | | day of month
  | | hour
  | minute
  second ( optional )
*/
// ref: https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
function messageReserves(message, series, division, platform) {
	var min;
	var hour;
	var day;
	var role;
	var kanal;

	for(let div of divInfo) {
		if (div.platform == platform && div.div == division && div.series == series) {
			switch (div.dag) {
				case 'Søndag':
					day = 6
					break;
				case 'Mandag':
					day = 7
					break;
				case 'Tirsdag':
					day = 1
					break;
				case 'Onsdag':
					day = 2
					break;
				case 'Torsdag':
					day = 3
					break;
			}
			var str = div.readyTime.split(":")
			hour = str[0]
			min = str[1]

			if (div.platform == 'pc') {
				role = '<@&788905660326477824>'
			} else if (div.platform == 'ps4') {
				role = '<@&821055107395223626>'
			}
			kanal = div.kanal
		}
	}

	return cron.schedule(`${min} ${hour} * * ${day}`, function() {
		message.channel.send(`${role} \nReserveførere kan nå reagere i Check-in! <#${kanal}>`)
	});
}


// Creates and returns a default embed
function makeEmbed(message) {
	//Slices required information from the message content.
	let bite = message.content.split(" ");
	let series = bite[1];
	let division = bite[2];
	let platform = bite[3];
	let flag = bite[4];

	console.log("Making Check-in for: " + series + " division: " + division + ". div on " + platform)

	for(let div of divInfo){
		if(div.div.includes(division) && div.platform.includes(platform) && div.series == series){
			message.channel.send(`<@&${div.role}>`)
			break;
		}
	}

	//Initializes the embed in order to be edited correctly in the latter stages.
	let embed = new Discord.MessageEmbed()

	//Loops through the different divisions
	for(let div of divInfo){
		//If the necessary information in the message content corresponds with a division, it itself is selected and added to the embed with
		//relevant information.
		if(div.div.includes(division) && div.platform.includes(platform) && div.series == series){
			embed.setColor('#F8E71C')
			.setTitle(`**Påmelding til neste løp \nførstkommende ${div.dag}**`)                                                             
			.setDescription(`**Lobby up: kl ${div.invites}**\n**Ready up: kl ${div.readyTime}** \n\nReager med ikonet til din bil!\nDersom du ikke kan stille reager med :x:\nReserver kan reagere på en ledig bil etter ${div.res} kl ${div.readyTime}\n\n Antall førere påmeldt: 0`)
			.setThumbnail(`${div.thumbnail}`)
			.setImage(flag)
			//BREAK OUT IMMEDIATELY AFTER EDITING AN EMBED DUE TO A POSSIBLE CHANCE OF OVERWRITING.
			break;
		}
	}

	// Add the teams to the embed
	// Indexes and counters has to be tracked in order to align the different teamnames within the embed.
	let counter = 1;
	let index = 0;	
	for (let team of teamInfo) {
		if (team.series == series) {
			embed.addField("__" + team.name + ":__ " + " \u200b" + team.logo, "\u200b", true);
			team.index = index;
			index++;
			counter++;
			
			// Adds whitespace, to have just two col of teams
			if (counter == 2) {
				embed.addField('\u200b', '\u200b', true);
				counter = 0;
				index++;
			}
		}
	}
	return embed
}	

function checkInCreator(message, enDivisjonEmbed){
	// Use a promise to wait for the question to reach Discord first
	message.channel.send(enDivisjonEmbed).then((question) => {
		let bite = message.content.split(" ");
		let series = bite[1];
		let division = bite[2];
		let platform = bite[3];

		// TODO: REMOVE THIS COMMENT IN ORDER FOR PINGS TO WORK FOR RESERVES
		let job = messageReserves(message, series, division, platform)


		// Have our bot guide the user by reacting with the correct reactions
		for (let team of teamInfo) {
			if (team.series == series) {
				question.react(team.logo);
			}
		}

		// Set a filter to ONLY grab those reactions & discard the reactions from the bot
		// I.e the only filters we want to grab are programmed as objects in the array teamInfo
		const filter = (reaction, user) => {
			if (user.bot) {
				return false;
			}
			for (let team of teamInfo) {
				if (team.series == series == team.filteredName.includes(reaction.emoji.name)) {
					return true;
				}
			}
			return true;
		};

		// Create the collector, then add the filter.
		const collector = question.createReactionCollector(filter, {
			//604800000 = 7 days
			time: 604800000
		});

		//This is where the magic happens, when the users actually react, and what the bot does when this occurs.
		collector.on('collect', (reaction, user) => {
			let userName = message.guild.members.cache.get(user.id);
			
			//Get teampositions in embed
			let teamObj = null;
			for (let team of teamInfo) {
				if (team.series === series && team.filteredName.includes(reaction.emoji.name)) {
					teamObj = team;
					break;
				}
			}

			if(addName(enDivisjonEmbed, userName, user.discriminator, question, teamObj, reaction.emoji.name, series)){
				console.log("=> Checked in: " + userName.displayName + "#" + user.discriminator + " ID: " + user.id);
			}
			else{
				removeName(enDivisjonEmbed, userName, user.discriminator, question, teamObj, reaction.emoji.name)
				console.log("-> Checked out: " + userName.displayName + "#" + user.discriminator + " ID: " + user.id);
			}


			//Removes the reaction from the user to always maintain 1:1 ratio
			reaction.users.remove(user)
			
		});

		//When the collector ends.
		collector.on('end', (collected, reason) => {
			if (reason === 'time') {
				console.log("Collector finished. Bot will no longer edit embed nor collect reactions")
			} else {
				console.log("Collector finished. Bot will no longer edit embed nor collect reactions")
			}
			console.log("Division:", division, "platform:", platform, "'s job was stopped!");
			job.stop();
		});
	});
}

function updateParticipants(embed, bool) {
	var cntr = embed.description.slice(-2)
	var parsedString = parseInt(cntr) 

	if (bool && parsedString >= 0 && parsedString <= 21) {
		var number = parsedString + 1
	} else if (!bool && parsedString >= 0 && parsedString <= 21) {
		var number = parsedString - 1
	} else {
		var number = 21
	}

	if (parsedString > 9) {
		embed.setDescription(embed.description.slice(0, -2) + number)
	} else {
		embed.setDescription(embed.description.slice(0, -1) + number)
	}
}

//Adds the users name to a specific embed.
function addName(embed, user, tag, question, team, emoji, series){
	if(!findNameInMsg(embed, user.displayName + "#" + tag) && parseInt(embed.description.slice(-2)) <= 21){
		if (emoji != '❌') {
			updateParticipants(embed, true)
		}
		embed.fields[team.index].value += `${user.displayName}#${tag}\n`

		question.edit(embed)
		return true;
	}else{
		for(let team of teamInfo){
			if((team.series == series && embed.fields[team.index].value.includes(user.displayName) && team.filteredName != emoji)){
					user.send(`Du må fjerne reaksjonen din på ${team.name} før du reagerer på et annet lag <@!${user.id}>`)
					break;
			}
		}
		return false;
	}
}


//Removes the users name in a specific embed.
function removeName(embed, user, tag, question, team, emoji){
	if(findNameInMsg(embed, user.displayName + "#" + tag) && parseInt(embed.description.slice(-2)) >= 0){
		let bites = embed.fields[team.index].value.split("\n");
		for(let i = 0; i < bites.length - 1; i++){
			if((bites[i] === user.displayName + "#" + tag || bites[i] === "\u200b" + user.displayName + "#" + tag) && bites.length - 1 > 1){
				if (emoji != '❌') {
					updateParticipants(embed, false)
				}
				bites.splice(i, 1);
				embed.fields[team.index].value = bites.join("\n");
				//console.log("removeName(): " + bites);
				question.edit(embed)
				break;
			}else if(bites.length - 1 == 1 && (bites[i] === user.displayName + "#" + tag || bites[i] === "\u200b" + user.displayName + "#" + tag)){
				if (emoji != '❌') {
					updateParticipants(embed, false)
				}
				embed.fields[team.index].value = "\u200b"
				question.edit(embed)
				break;
			}
		}

		return true;
	}else{
		//If you arrive here, and this code is ran, there has occured a logical error in the code.
		//message.channel.send("This name is not on the embed mate =)");
		console.log("Error occured in function: removeName()")
	}
	return false;
}

//Finds the name of a user in the embed. 
function findNameInMsg(embed, name){
	for(let i = 0; i < embed.fields.length; i++){
		if(embed.fields[i].value.includes(name)){
			return true;
		}
	}
	return false;
}

// id removed due to privacy reasons
//client.login('xxxxxxxxxxxxxxxxxx');

