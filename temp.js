
const name_list =  {
	TırnakPide:"17078472", 
	KelekKarpuz:"8822751",
	TulumPeyniri:"8822803"
}

const names = [
	"TırnakPide",
	"KelekKarpuz",
	"TulumPeyniri"
]

const players = [
	"TırnakPide",
	"KelekKarpuz",
	"Rakip1",
	"Rakip2"
]


const game_data_response = {
	game_id: "23",
	teams: [
		[
			{player: "TırnakPide", result: "Loss"},
			{player: "KelekKarpuz", result: "Loss"},
		],
		[
			{player: "Rakip1", result: "Win"},
			{player: "Rakip2", result: "Win"},
		]
	]
}
const last_game_data = {
	game_ids: {
		"17078472": "1234",
		"8822751": "1234"
	}
}
last_game_data.game_ids = {
	...last_game_data.game_ids,
	...game_data_response.teams
		.filter((player) => names.includes(player))
		.reduce((acc, player) => {
			acc[name_list[player]] = game_data_response.game_id;
			return acc;
		}, {})
}
console.log(last_game_data.game_ids);
