const shapes = ["orange", "lemon", "apple", "pear"];
const max_fails = 10;
const init_money = 100;

window.onload = () => {
    setWalletState(init_money);
    setLivesLeft(max_fails);
    $( "#bet" ).slider({
        step: 10,
        min: 10,
        max: 100,
        slide: function( event, ui ) {
            document.getElementById("bet-value").innerText=ui.value;
        }
    });
    document.getElementById("handle").addEventListener("click",pullHandle);
    document.getElementById("start").addEventListener("click", start);

    showMenu();

};
function start(){
    hideMenu();
    setWalletState(init_money);
    setLivesLeft(max_fails);
}
function hideMenu(){
    let menu = document.getElementById('menu');
    menu.classList.add('hidden');
}
function showMenu(){
    let menu = document.getElementById('menu');
    menu.classList.remove('hidden');
};

function end(){
    showMenu();
}

function pullHandle(){
    let rand = Math.floor((Math.random() * 5));
    let won = rand === 0;
    let bet = parseInt($("#bet").slider("value"));
    let shape1 = randShapeIndex();
    if (won){
        setShapes(shape1,shape1,shape1);
        setWalletState(getWalletState()+bet);
    } else{
        let shape2 = randShapeIndex();
        let shape3 = randShapeIndex();
        while (shape3 === shape1){
            shape3 = randShapeIndex();
        }
        if (Math.floor((Math.random() * 2)) === 0){
            setShapes(shape1,shape2,shape3);
        }
        else{
            setShapes(shape1,shape3,shape2);
        }
        setLivesLeft(getLivesLeft()-1);
        setWalletState(getWalletState()-bet);
    }

    if(getLivesLeft() === 0 || getWalletState() === 0){
        end();
    }
}

function setShapes(shape1,shape2,shape3){
    console.log(shapes[shape1], shapes[shape2], shapes[shape3]);
}

function randShapeIndex(){
    return Math.floor((Math.random() * shapes.length));
}

function setWalletState(money){
    document.getElementById("money").innerText = money;
}
function getWalletState(){
    return parseInt(document.getElementById("money").innerText);
}
function setLivesLeft(lives){
    document.getElementById("lives-left").innerText = lives;
}
function getLivesLeft(){
    return parseInt(document.getElementById("lives-left").innerText);
}
