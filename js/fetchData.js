// LOADING 
let loader = document.getElementById('loader');
// Showing Loader while fetching data
function showLoader() {
	loader.style.display = 'block';
};
// Hide loader when fetching finishes
function hideLoader() {
	loader.style.display = 'none';
};

let tableBody = document.querySelector('.players-list-body');
let playersList = [];
let myTeamList = [];
let filteredListOfPlayers = [];
const apiKey = '3f2ff3e3-75f3-4cd2-b755-c9a33da04399';

// Fetching data from API url:   https://www.balldontlie.io/api/v1/players
const fetchData = () => {
	showLoader(); 

	fetch('https://api.balldontlie.io/v1/players', {
		headers:{
			Authorization: apiKey
		}
	})
		.then((res) => res.json())
		.then((data) => {
			hideLoader(); 
			console.log(data);
			playersList = data.data.slice(); // data
			myTeamList = data.data.slice();
			console.log(playersList); 

			renderPlayersList();
			removeDuplicateTeams();
		});
};

function drawTableRows(player, index) {
	let tRow = document.createElement('tr');
	tRow.setAttribute('data-id', player.id);
	tableBody.appendChild(tRow);
	let tData1 = document.createElement('td');
	tData1.innerText = index + 1;
	tRow.appendChild(tData1);
	let tData2 = document.createElement('td');
	tData2.innerText = player.id;
	tRow.appendChild(tData2);
	let tData3 = document.createElement('td');
	tData3.innerText = `${player.first_name} ${player.last_name}`;
	tRow.appendChild(tData3);
	let tData4 = document.createElement('td');
	tData4.innerText = player.position;
	tRow.appendChild(tData4);
	let tData5 = document.createElement('td');
	tData5.innerText = player.team.name;
	tRow.appendChild(tData5);
	let tData6 = document.createElement('td');
	tData6.innerText = player.team.city;
	tRow.appendChild(tData6);
	let tData7 = document.createElement('td');
	tRow.appendChild(tData7);
	let btnAddPlayer = document.createElement('button');
	btnAddPlayer.innerHTML = 'Add Player';
	btnAddPlayer.classList.add('btn-cell');
	btnAddPlayer.setAttribute('data-id', player.id)
	btnAddPlayer.addEventListener('click', addPlayerToMyTeam);
	tData7.appendChild(btnAddPlayer);
	let tData8 = document.createElement('td');
	tData8.innerHTML = `<i class="fas fa-times"></i>`;
	tRow.appendChild(tData8);

	return tRow;
};


function renderPlayersList() {
	if (playersList.length > 0) {
		playersList.map((player, index) => {
			drawTableRows(player, index);
		});
	};
};


// FILTER PLAYERS BY CRITERIA:

let searchPlayers = document.getElementById('search');
let keyword;

function searchPlayersByName(e) {
	tableBody.innerHTML = ''; 
	keyword = e.target.value;
	
	filteredListOfPlayers = playersList.filter((player, index) => {
		if (player.first_name.toLowerCase().includes(keyword.toLowerCase())) {
			drawTableRows(player, index);
		} 
	});
};

searchPlayers.addEventListener('keyup', searchPlayersByName);



let selectPosition = document.getElementById('positions');
let keyPosition;

function selectPlayersByPosition(e) {
	tableBody.innerHTML = ''; 
	keyPosition = e.target.value;

	filteredListOfPlayers = playersList.filter((player, index) => {
		if (player.position && (player.position === keyPosition) 
		|| (keyPosition === "empty" && player.position === "") 
		|| (keyPosition === "")) {
			drawTableRows(player, index);
		}
	});
};

selectPosition.addEventListener('change', selectPlayersByPosition);


let selectTeams = document.getElementById('teams');
let teams = [];
let filteredTeams = [];
let keyTeam;

function removeDuplicateTeams() {
	playersList.forEach((player) => {
		teams.push(player.team.name);
		filteredTeams = teams.filter((team, index) => teams.indexOf(team) === index)
	});
	// console.log(teams); // 25 items
	// console.log(filteredTeams); // 16 items

	createOptionTags();
};

function createOptionTags () {
	if (filteredTeams.length > 0) {
		filteredTeams.forEach((team) => {
			let option = document.createElement('option');
			option.innerText = team;
			option.setAttribute('value', team);
			selectTeams.appendChild(option);
		});
	};	
};

function selectPlayersByTeam (e) {
	tableBody.innerHTML = ''; 
	keyTeam = e.target.value;

	filteredListOfPlayers = playersList.filter((player, index) => {
		if (player.team && (player.team.name === keyTeam) || (keyTeam === "") ) {
			drawTableRows(player, index);
		} 
		
	});
};

selectTeams.addEventListener('change', selectPlayersByTeam);


let selectOrder = document.getElementById('order');

function orderPlayersByAscendDescend(e) {
	tableBody.innerHTML = ''; 

	if (e.target.value === 'ascending') {
		filteredListOfPlayers = playersList.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
		filteredListOfPlayers.forEach((player, index) => {
			drawTableRows(player, index);
		});	
	} else if (e.target.value === 'descending') {
		filteredListOfPlayers = playersList.sort((a, b) => (a.first_name < b.first_name ? 1 : -1));
		filteredListOfPlayers.forEach((player, index) => {
			drawTableRows(player, index);
		});
	} else if (e.target.value === "") {
		playersList.forEach((player, index) => {
			drawTableRows(player, index);
		});
	};
};

selectOrder.addEventListener('change', orderPlayersByAscendDescend);

// MY TEAM 

let myTeamTableBody = document.getElementById('my-team');

function drawTableRowsMyTeam(player, index) {
	let tRow = document.createElement('tr');
	myTeamTableBody.appendChild(tRow);
	let tData1 = document.createElement('td');
	tData1.innerText = index + 1;
	tRow.appendChild(tData1);
	let tData2 = document.createElement('td');
	tData2.innerText = player.id;
	tRow.appendChild(tData2);
	let tData3 = document.createElement('td');
	tData3.innerText = `${player.first_name} ${player.last_name}`;
	tRow.appendChild(tData3);
	let tData4 = document.createElement('td');
	tData4.innerText = player.position;
	tRow.appendChild(tData4);
	let tData5 = document.createElement('td');
	tData5.innerText = player.team.name;
	tRow.appendChild(tData5);
	let tData6 = document.createElement('td');
	tData6.innerText = player.team.city;
	tRow.appendChild(tData6);
	let tData7 = document.createElement('td');
	tRow.appendChild(tData7);
	let btnAddPlayer = document.createElement('button');
	btnAddPlayer.innerHTML = 'Remove Player';
	btnAddPlayer.classList.add('btn-cell');
	btnAddPlayer.setAttribute('data-id', player.id)
	btnAddPlayer.addEventListener('click', removePlayerFromMyTeam);
	tData7.appendChild(btnAddPlayer);

	return tRow;
};


let myTeam = []; // array of players IDs
let tableRowsArray = [];

function addPlayerToMyTeam(e) {
	//console.log(e.currentTarget.getAttribute('data-id'));
	let myPlayerId = e.currentTarget.getAttribute('data-id');

	// Not to duplicate Players in My Team list
	if (myTeam.indexOf(myPlayerId) < 0 ) {
		myTeam.push(myPlayerId);
	};

	myTeam.forEach(elem => {
		tableRowsArray.push(this.parentElement.parentElement);
	});

	myTeamTableBody.innerHTML = '';

	// Draw My Team Table
	myTeam.forEach((elem, indx) => {
		filteredListOfPlayers = playersList.filter((player, index) => {
			if (elem == player.id  && indx < 12) {
				drawTableRowsMyTeam(player, index);
			} 
		});
	});

	e.target.parentElement.parentElement.classList.add("colored-row");
	this.parentElement.parentElement.lastChild.innerHTML = `<i class="fas fa-check"></i>`;

	if (myTeam.length < 13) {
		tableRowsArray.push(this.parentElement.parentElement);
	} else {
		myTeam.splice(myTeam.length - 1, 1) // remove the last element)
		window.confirm('You Have Chosen 12 Players For Your Dream Team');
		this.parentElement.parentElement.classList.remove("colored-row");
		this.parentElement.parentElement.lastChild.innerHTML = `<i class="fas fa-times"></i>`;
	};
};


function removePlayerFromMyTeam(e) {
	e.target.parentElement.parentElement.remove();

	myTeam = myTeam.filter((elem) => elem !== e.currentTarget.getAttribute('data-id'));

	tableRowsArray.filter(row => {
		row !== e.target.parentElement.parentElement;
	});
	
	// In the Players List table, implement the changes: 
	tableRowsArray.forEach(row => {
		row.classList = ""; // remove colored-row class
		row.lastChild.innerHTML = `<i class="fas fa-times"></i>`;
	});
	myTeam.forEach(elem => {
		tableRowsArray.find(row => {
			if(elem == row.getAttribute('data-id')) {
				row.classList = "colored-row";
				row.lastChild.innerHTML = `<i class="fas fa-check"></i>`
			};
		});
	});
};












