window.onload = (event) => {
    let links = document.getElementsByClassName('js-link--click-on-load');
    for (let i in links){
        links[i].click();
    }
};

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);