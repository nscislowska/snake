import Canvas from "./Canvas.js"
import Snake from "./Snake.js"
import Food from "./Food.js"
import Score from "./Scorre.js"
import GameObject from "./GameObject.js";
import {DIRECTION, partSize} from "./Globals.js"
import EventHandler from "./EventHandler.js";

let clientId, clientStyle;
let speed = 120;
let isTimeEnd = false;
let gameStart;
let canvas;
let score;
let interactiveObjects;
let snake;
let eventHandler;

let bttn = document.getElementsByClassName("play-bttn")[0];
let menu = document.getElementsByClassName("menu")[0];

bttn.addEventListener("click", ()=>{
        menu.style.display = "none";
        game();
})


function game(){
    setup();
    console.log("game start");
    startClock();
    main();
}

function startClock(){
    isTimeEnd = false;
    let gameMaxTime = 3*60;
    let timeLeft = gameMaxTime;
    let clockContent = document.getElementsByClassName("counter__content")[0];
    let clock = setInterval(()=> {
        let min = Math.floor(timeLeft/60);
        let sec = timeLeft%60;
        if(sec < 10){
            sec = `0${sec}`;
        }
        clockContent.textContent = `${min}:${sec}`;
        timeLeft -= 1;
        if(timeLeft < 0 || snake.isDead()){
            clearInterval(clock);
            isTimeEnd = true;
        }
    }, 1000);


}

function setup(){
    initOnce();

    for(let object of interactiveObjects){
        object.changeCoordToRandom(canvas.getHeight(),canvas.getWidth(), partSize);
    }

    score.set(0);
     snake = new Snake(
    {x: 0,
        y: Math.floor((Math.random() * ((canvas.getHeight()/partSize)-4)) + 2)*partSize},
        4,
    partSize);
    if(eventHandler === undefined){
        eventHandler = new EventHandler(canvas, snake, interactiveObjects);
    }
    gameStart = Date.now();

    eventHandler.init(gameStart);
}

function initOnce(){
    if (canvas === undefined ){
        canvas = new Canvas();
    }
    if(score === undefined){
        score = new Score();
    }
    if(interactiveObjects === undefined){
        interactiveObjects = new Array(GameObject);
        interactiveObjects = [new Food(50,50,partSize),new Food(100,50,partSize),new Food(200,200,partSize)];
    }
}

function main() {
    let newEventTimeout;
    document.addEventListener('keydown', changeDirection);
    setTimeout(
        function onTick() {
            canvas.clear();
            drawInteractiveObjects();
            drawSnake();
            snake.move(canvas.getWidth(), canvas.getHeight());
            snake.checkCollisionWithTail();
            checkCollision();

            if (!eventHandler.isTriggered() && eventHandler.makeEventFlag) {
                eventHandler.makeEventFlag = false;
                let seconds = Math.floor((Math.random() * 16-4) + 4);
                 newEventTimeout = setTimeout(()=> {
                    if(!isGameOver()) eventHandler.trigger();
                    eventHandler.makeEventFlag = true;
                    },seconds*1000);
            }

            if(isGameOver()){
                gameOver(newEventTimeout);
                return;
            }
            main();
        },speed)
}

function gameOver(newEventTimeout){
    clearTimeout(newEventTimeout);
    if(eventHandler.isTriggered()){
        eventHandler.finish();
    }
    //sendData();
    menu.style.display = "flex";
    console.log('game over');
}

function isGameOver(){
    return isTimeEnd || snake.isDead();
}

function drawInteractiveObjects(){
    for(let object of interactiveObjects){
        canvas.draw(object);
    }
}

function drawSnake() {
    for(let part of snake.parts){
        canvas.draw(part)
    }
}

function checkCollision() {
    let head = snake.parts[0];
    for(let object of interactiveObjects){
        if(head.isSamePosition(object)){
            if(object.name === "food"){
                console.log('food');
                snake.elongateBy(1);
                score.incrementBy(1);
                object.changeCoordToRandom(canvas.getHeight(), canvas.getWidth(),  partSize);
            }
            if(object.name === "obstacle"){
                eventHandler.eventSuccess();
            }
        }
    }
}


function isIdFree(clientId){
    let idOK;
    POST("check_client_id", false, {id:clientId}, (data)=>{
        console.log("name ok: ",data["ok"]);
        idOK = data["ok"];
    });
    return idOK;
}

function sendData(){
    let post_obj = {
        mssg: "message from client",
        events : eventHandler.eventsData,
        client_id: clientId,
        client_style : clientStyle
    }
    POST("game_finished",true, post_obj, ()=>{});
};

function GET(url, async, my_data, onSuccess){
    $.ajax({
		url: "/" + url,
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		async: async,
        data: JSON.stringify(my_data),
		success: function(data){
			onSuccess(data);
		}
	});
}

function POST(url, async, my_data, onSuccess) {
    $.ajax({
		url: "/" + url,
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		async: async,
		data: JSON.stringify(my_data),
		success: (data)=>{
		    onSuccess(data);
		}
	});
}

function changeDirection(event){
            let isChanged = false;
            const keyPressed = event.key;
            const goingUp = snake.direction.y === -partSize;
            const goingDown = snake.direction.y === partSize;
            const goingRight = snake.direction.x === partSize;
            const goingLeft = snake.direction.x === -partSize;

            if (keyPressed === DIRECTION.LEFT.key && !goingRight) {
                snake.direction.x = -partSize;
                snake.direction.y = 0;
                if(snake.turnCount.direction === DIRECTION.LEFT){
                    snake.turnCountTemp +=1;

                }
                isChanged = true;

            }
            if (keyPressed === DIRECTION.RIGHT.key && !goingLeft) {
                snake.direction.x = partSize;
                snake.direction.y = 0;
                if(snake.turnCount.direction === DIRECTION.RIGHT){
                    snake.turnCountTemp +=1;
                }
                isChanged = true;
            }
            if (keyPressed === DIRECTION.UP.key && !goingDown) {
                snake.direction.x = 0;
                snake.direction.y = -partSize;
                if(snake.turnCount.direction === DIRECTION.UP){
                    snake.turnCountTemp +=1;
                }
                isChanged = true;
            }
            if (keyPressed === DIRECTION.DOWN.key && !goingUp) {
                snake.direction.x = 0;
                snake.direction.y = partSize;
                if(snake.turnCount.direction === DIRECTION.DOWN){
                    snake.turnCountTemp +=1;
                }
                isChanged = true;
            }

            if(isChanged && eventHandler.code === eventHandler.eventCodes.obstacle){
                if(eventHandler.event.getTurnTimestamp() === undefined){
                    eventHandler.event.setTurnTimestamp(Date.now() - gameStart);
                }
            }

            if(snake.turnCount.count > 0) {
                if (snake.turnCountTemp === snake.turnCount.count) {
                    document.dispatchEvent(snake.turningEventSuccess);
                }
            }

            if(isChanged === true){
                document.removeEventListener('keydown', changeDirection);
            }

    }