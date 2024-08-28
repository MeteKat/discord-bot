require("dotenv").config();
const Discord = require("discord.js");
const { name_list } = require('./enums.js')
const { get_opponents_data, get_game_data, make_embed, fill_game_info} = require('./api-requests.js');
const { connectDb } = require('./db_connection.js');
const { create_db } = require('./game_data.js');


async function check_for_new_data(client, game_datas) {
	let client_obj = client.channels.cache.find((abc) => abc.name == "bot-test");
	let user;
	for (let i = 0; i < 3; i++) {
		user = name_list[Object.keys(name_list)[i]];
		console.log("Checking for new data for " + user + "\n");
		const last_game_data = await game_datas.findOne()
		const game_data_response = await get_game_data(user);
		if(!game_data_response)
		{
			console.log("No new data for " + user + "\n");
			continue
		}
		if(!last_game_data)
			continue
		if (last_game_data.game_ids == undefined)
			last_game_data.game_ids = {}
		if(Object.values(last_game_data.game_ids).includes(game_data_response.game_id) || game_data_response.ongoing == true || game_data_response.just_finished == true)
			continue
		const opponents = await get_opponents_data(last_game_data, game_data_response);
		await fill_game_info(opponents, game_data_response, last_game_data, user);
		let embed = await make_embed(last_game_data);
		reset_game_info(game_datas);
		console.log("New data found for " + user + "\n");

		
		return (client_obj.send({embeds: [embed]}));
	}
}

function reset_game_info(game_datas) {
	game_datas.findOneAndUpdate({},{
		server : "",
		map : "",
		opponents : [],
		opponents_civs : [],
		opponents_elos : [],
		url : "",
		result : "",
		time : "",
	});
}
async function main() {
	
	await connectDb(`${process.env.DB_URI}`);
	const game_datas = await create_db();
	
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
	
	client.on("ready", async () => {
		console.log(`Logged in as ${client.user.tag}!`);
		check_for_new_data( client, game_datas)
		setInterval(()=>check_for_new_data( client, game_datas), 1000 * 20 * 1);
	});

	client.login(`${process.env.TOKEN}`);
}

main();