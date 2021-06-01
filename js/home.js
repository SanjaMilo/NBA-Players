// Typing text 

let textBox = document.getElementById('type_text');
let typingText = "2021 NBA PLAYOFFS";
let textArray = typingText.split("");
let loopTimer;

function loopFrame() {
    if(textArray.length > 0) {
        textBox.innerHTML += textArray.shift();
    } else {
        clearTimeout(loopTimer);
        return false;
    }
     loopTimer = setTimeout('loopFrame()', 80); 
};

loopFrame();

// Modal functionality

let modal = document.getElementById('modal');
let btnOpenModal = document.getElementById('modal-opener');
let btnCloseModal = document.querySelector('.close');
let userLocalStorage;

const handleModalOpen = (e) => {
    e.stopPropagation();
    modal.style.display = "block";
};

const handleModalClose = () => {
    modal.style.display = "none";
};

btnOpenModal.addEventListener('click', handleModalOpen);
btnCloseModal.addEventListener('click', handleModalClose);
document.body.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
      }
});

// Login Form and Local Storage 

let form = document.getElementById('login');
let inputField = document.getElementById('name');
let small = document.querySelector('.small');
let userLogged = document.getElementById('user');
let linkPlayer = document.getElementById('link-players');
let linkTeam = document.getElementById('link-team');
let dropDownLogout = document.querySelector('.drop-down');
let btnLogout = document.getElementById('logout');
let userName; 
let toggle = false;

function onSignIn(e) {
	e.preventDefault();
	userName = inputField.value;
	if (userName === '' || userName.length < 3 || userName[0] != userName[0].toUpperCase() || !userName.match(/^[a-zA-Z\s]+$/)) {
		small.style.display = 'block';
	} else {
		small.style.display = 'none';
		localStorage.setItem('userName', userName);
        userLogged.innerText = localStorage.getItem('userName');
        linkPlayer.style.display = 'block';
        linkTeam.style.display = 'block';
		location.hash = '#playerslist';
	};
	inputField.value = '';

    if (localStorage.getItem('userName')) {
        handleModalClose();
    };
    
};

function logoutUser() {
    if (localStorage.getItem('userName')) {
        localStorage.removeItem('userName');
        linkPlayer.style.display = 'none';
        linkTeam.style.display = 'none';
        location.hash = '#';
        dropDownLogout.style.display = 'none';
        userLogged.innerHTML = '<i class="fas fa-user"></i> Profile';
    }
    
};

function showDropDown() {
    if(localStorage.getItem('userName')) {
        toggle = !toggle;
        toggle ? dropDownLogout.style.display = 'block' :  dropDownLogout.style.display = 'none'
    }
}

form.addEventListener('submit', onSignIn);
btnLogout.addEventListener('click', logoutUser);
userLogged.addEventListener('click', showDropDown);


const pageLoad = () => {
    if (localStorage.getItem('userName')) {
        userLogged.innerText = localStorage.getItem('userName');
        linkPlayer.style.display = 'block';
        linkTeam.style.display = 'block';
    }
    return;
};

window.addEventListener('load', pageLoad);



