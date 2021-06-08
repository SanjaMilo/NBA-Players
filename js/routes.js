// First Check: If user is not logged im, than cannot access other pages, and user is redirected on HomePage to login 

let homeScreen = document.getElementById('home');
let playersScreen = document.getElementById('players');
let teamScreen = document.getElementById('team');


function handleRoute(e) {
	e.preventDefault();
	let _hash = location.hash;

	if (!localStorage.getItem('userName') && _hash != "") {
		location.hash = "";
	};
	// possible Routs options and non-valid route redirects on Home Page (default)
	switch (_hash) {
		case '':
			homeScreen.style.display = 'block';
			playersScreen.style.display = 'none';
			teamScreen.style.display = 'none';
			break;
		case '#playerslist':
			homeScreen.style.display = 'none';
			playersScreen.style.display = 'block';
			teamScreen.style.display = 'none';
			break;
        case '#myteam':
            homeScreen.style.display = 'none';
            playersScreen.style.display = 'none';
            teamScreen.style.display = 'block';
            break;   
		default:
			location.hash = '';
			break;
	}

	//invoke fetching data on page load and hashchange, only if data array is empty (no data fetched)
	if (playersList.length === 0) {
		fetchData();
	};
	
};

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);