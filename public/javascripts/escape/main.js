window.onload = () => {
    let canvas = document.getElementById('game-canvas');
    let context = canvas.getContext('2d');

    menu()
};

function menu(){
    let menu = document.getElementsByClassName('menu-container')[0];
    menu.classList.remove('hidden');

};


