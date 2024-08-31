require("fetch");
require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const { names, map_urls, name_list } = require('./enums.js');


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

async function fill_game_info(teams, game_data_response, last_game_data, user_id) {

	const players_list = [[],[]]
	const players_civs_list = [[],[]]
	const opponents_elos_list = []
	
	for(const player of teams[0]) {
		players_list[0].push(player.player.name)
		players_civs_list[0].push(player.player.civilization)
	}
	for(const player of teams[1]) {
		players_list[1].push(player.player.name)
		players_civs_list[1].push(player.player.civilization)
		opponents_elos_list.push(await get_elo(player.player.profile_id))
	}
	last_game_data.server = game_data_response.server
	last_game_data.map = game_data_response.map
	last_game_data.teams = players_list
	last_game_data.civs = players_civs_list
	last_game_data.opponents_elos = opponents_elos_list
	let temp_url = `${process.env.PROFILE_URL}${user_id}/games/${game_data_response.game_id}`;
	last_game_data.url = temp_url.replace("api/v0/", "")
	last_game_data.result = get_result(game_data_response)
	last_game_data.time = Number((game_data_response.duration/60).toFixed(0)) + "dk  " + Number(game_data_response.duration%60).toFixed(0) + "sn"
	last_game_data.game_ids = {
		...last_game_data.game_ids,
		...players_list[0]
			.filter((player) => names.includes(player))
			.reduce((acc, player) => {
				acc[name_list[player]] = game_data_response.game_id;
				return acc;
			}, {})
	};
	
	await last_game_data.save()
}

function get_result(game_data_response) {

	return names.includes(game_data_response.teams[0][0].player.name) ? game_data_response.teams[0][0].player.result : game_data_response.teams[1][0].player.result
}

async function get_game_data(user_id) {
	const response = await fetch(`${process.env.PROFILE_URL}/${user_id}/games?limit=1`);
	const data = await response.json();
	
	if(!data || !data.games || data.games.length == 0)
		return null

	return data.games[0];
}

function get_teams_data(game_data_response) {
	const team1 = []
	const team2 = []

	if(names.includes(game_data_response.teams[0][0].player.name)) {
		game_data_response.teams[0].map((player) => {
			team1.push(player);
		});
		game_data_response.teams[1].map((player) => {
			team2.push(player);
		});
	}
	else {
		game_data_response.teams[0].map((player) => {
			team2.push(player);
		});
		game_data_response.teams[1].map((player) => {
			team1.push(player);
		});
	}

	return [team1, team2];
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
	.setDescription(game_data.time)
	.setThumbnail(map_urls[game_data.map])
	.addFields(
		{ name: game_data.server, value: `süre: ${game_data.time}` },
		{ name: '\u200B', value: '\u200B' },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	for (let i = 0; i < game_data.teams[0].length; i++) {
		exampleEmbed.addFields({ name: game_data.teams[0][i] + "  (" + game_data.civs[0][i] + ") ", value:"--", inline: true });
		//exampleEmbed.addFields({ name: '\u200B', value: '\u200B' })
	}
	exampleEmbed.addFields({ name: '\u200B', value: '\u200B',inline: false })
	for (let i = 0; i < game_data.teams[1].length; i++) {
		exampleEmbed.addFields({ name: game_data.teams[1][i] + "  (" + game_data.civs[1][i] + ") ", value: game_data.opponents_elos[i], inline: true });
		//exampleEmbed.addFields({ name: '\u200B', value: '\u200B' })
	}
	exampleEmbed
	.setImage(map_urls[game_data.map])
	.setTimestamp()

	return exampleEmbed; 
}

module.exports = { get_game_data, make_embed, fill_game_info, get_teams_data};