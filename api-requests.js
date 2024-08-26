require("fetch");
require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const { names, map_urls } = require('./enums.js');

async function get_players(last_game_data, game_data_response) {
	const players = [];

	for (let i = 0; i < game_data_response.teams.length; i++) {
		game_data_response.teams[i].map((player) => {
			let newPlayer = {
				id: player.player.profile_id,
				name: player.player.name,
				civ: player.player.civilization
			};
			if(!last_game_data.result)
				names.includes(player.player.name) ? last_game_data.result = player.player.result : null
			players.push(newPlayer);
		});
	}
	//console.log(players);
	
	return players;
}

async function get_elo(id) {
	const response = await fetch(`${process.env.PROFILE_URL}/${id}`);
	const data = await response.json();
	

	if(Object.keys(data.modes).length == 0)
		return "unranked";
	let relevant_elo = Object.keys(data.modes)[0]
	let elo = data.modes[relevant_elo].rank_level;
	if(elo == "unranked")
		elo = data.modes[relevant_elo].rating;
	if (!elo) {
		elo = "unranked";
	}

	return elo;
}	

async function fill_game_info(opponents, game_data, last_game_data, user_id) {	

	const opponents_list = []
	const opponents_civs_list = []
	const opponents_elos_list = []
	for (const player of opponents) {
		opponents_list.push(player.name);
		opponents_civs_list.push(player.civ);
		opponents_elos_list.push(await get_elo(player.id));
	}
	let temp_url = `${process.env.PROFILE_URL}/${user_id}/games/${game_data.game_id}`;
	last_game_data.opponents = opponents_list
	last_game_data.opponents_civs =opponents_civs_list
	last_game_data.opponents_elos = opponents_elos_list
	last_game_data.url = temp_url.replace("api/v0/", "")
	last_game_data.server = game_data.server
	last_game_data.map = game_data.map
	last_game_data.time = Number((game_data.duration/60).toFixed(2))
	last_game_data.game_ids = {...last_game_data.game_ids,[user_id] : game_data.game_id}

	await last_game_data.save()
}

//TODO - debugger öğren
async function get_game_data(user_id) {
	const response = await fetch(`${process.env.PROFILE_URL}/${user_id}/games`);
	const data = await response.json();
	
	if(!data || !data.games || data.games.length == 0)
		return null

	return data.games[0];
}

async function get_opponents_data(last_game_data, game_data_response) {
	const players = await get_players(last_game_data, game_data_response);
	const opponents = players.filter(player => !names.includes(player.name));

	return opponents
}


async function make_embed(game_data) {

	const exampleEmbed = new EmbedBuilder();
	exampleEmbed.setColor(0xff0000)
	if(game_data.result == "win")
		exampleEmbed.setColor(0x009900)
	exampleEmbed
	.setTitle(game_data.map)
	.setURL(game_data.url)
	//.setAuthor({ name: game_data.result , url: "filler" })
	.setDescription(game_data.time.toString())
	.setThumbnail(map_urls[game_data.map])
	.addFields(
		{ name: game_data.server, value: `süre: ${game_data.time.toString()}` },
		{ name: '\u200B', value: '\u200B' },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	for (let i = 0; i < game_data.opponents.length; i++) {
		exampleEmbed.addFields({ name: game_data.opponents[i] + "  (" + game_data.opponents_civs[i] + ") ", value: game_data.opponents_elos[i], inline: true });
		//exampleEmbed.addFields({ name: '\u200B', value: '\u200B' })
	}
	exampleEmbed
	.setImage(map_urls[game_data.map])
	.setTimestamp()
	//reset_game_info();

	return exampleEmbed; 
}

module.exports = { get_game_data, get_opponents_data, make_embed, fill_game_info};