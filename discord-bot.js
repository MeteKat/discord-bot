const Discord = require("discord.js");
require("fetch");
require("dotenv").config();
const {name_list, game_info} = require('./enums.js')
const {get_opponents_data, get_game_data, make_embed} = require('./api-requests.js');


const client = new Discord.Client(
	{
		intents: [
			Discord.IntentsBitField.Flags.Guilds,
			Discord.IntentsBitField.Flags.GuildMessages,
			Discord.IntentsBitField.Flags.GuildMembers,
			Discord.IntentsBitField.Flags.MessageContent,
		]
	}
);




client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const bot = client.channels.cache.find((abc) => abc.name == "bot-test");
	//bot.send("Sa")
});

//Rakip elo = ${player_data.modes.rm_solo.rank_level}
client.on("interactionCreate", async (interaction) => {
	if(interaction.commandName === "test")
	{
		
		Promise.all([game_data, player_data]).then((values) => {
			interaction.reply(`Server: ${values[0].games[0].server}/t${values[1][0].name} civ = ${values[1][0].civ} elo = ??`);
		});
	}
	else if(interaction.commandName === "embed")
	{
		await interaction.deferReply();
		const game_data = get_game_data(interaction.user.username);
		await get_opponents_data(game_data)
		
		return make_embed(interaction);
	}
	else if(interaction.commandName === "deneme")
	{
		//console.log(interaction.user.username);
		console.log(interaction);
		return interaction.reply("Çağlar market");
	}
})

client.login(`${process.env.TOKEN}`);