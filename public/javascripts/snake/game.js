import Canvas from "./Canvas.js"
import Snake from "./Snake.js"
import Food from "./Food.js"
import Score from "./Scorre.js"
import GameObject from "./GameObject.js";
import {DIRECTION, partSize} from "./Globals.js"
import EventHandler from "./EventHandler.js";
import Timer from "./Timer.js";

let speed = 120;
let gameStart;
let canvas;
let score;
let interactiveObjects;
let snake;
let eventHandler;
let timePassed;
let isPaused = false;

let startBttn = document.getElementsByClassName("play-bttn")[0];
let menu = document.getElementsByClassName("menu")[0];

startBttn.addEventListener("click", ()=>{
        menu.style.display = "none";
        game();
});

let gameClocks = [new Timer(Timer.INTERVAL), new Timer(Timer.TIMEOUT), new Timer(Timer.INTERVAL)];

function game(){
    setup();
    console.log("game start");
    startClock();
    main();
}

function startClock(){
    let clockContent = document.getElementsByClassName("counter__content")[0];
    gameClocks[2].start(()=> {
        let secondsPassed = timePassed/100;
        let min = Math.floor(secondsPassed/60);
        let sec = Math.floor(secondsPassed%60);
        if(sec < 10){
            sec = `0${sec}`;
        }
        clockContent.textContent = `${min}:${sec}`;
        timePassed += 1;
    }, 1);
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
    timePassed = 0;
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
    document.addEventListener('keydown', keyboardEvents);
    gameClocks[0].start(
        function onTick() {
            canvas.clear();
            drawInteractiveObjects();
            drawSnake();
            snake.move(canvas.getWidth(), canvas.getHeight());
            snake.checkCollisionWithTail();
            checkCollision();

            if (!eventHandler.isTriggered() && eventHandler.makeEventFlag) {
                eventHandler.makeEventFlag = false;
                let seconds = Math.floor((Math.random() * 20-4) + 4);
                 gameClocks[1].start(()=> {
                    if(!isGameOver()) eventHandler.trigger();
                    eventHandler.makeEventFlag = true;
                    },seconds*1000);
            }

            if(isGameOver()){
                gameOver();
            }
        },speed)
}

function gameOver(){
    for (let clock of gameClocks){
        clock.clear();
    }
    document.removeEventListener('keydown', keyboardEvents);
    if(eventHandler.isTriggered()){
        eventHandler.finish();
    }
    menu.style.display = "flex";
    console.log('game over');
}

function isGameOver(){
    return snake.isDead();
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

function keyboardEvents(event){
    const keyPressed = event.key;

    if(keyPressed === 'p'){
        let pauseView = document.getElementsByClassName("pause-view")[0];
        isPaused = !isPaused;
        if(!isPaused){
            pauseView.classList.add("hidden");
            eventHandler.resume();
            for (let clock of gameClocks){
                clock.resume();
            }
        }else{
            for (let clock of gameClocks){
                clock.pause();
            }
            pauseView.classList.remove("hidden");
            eventHandler.pause();
        }
        console.log("paused: ", isPaused);
    }
    else{
        changeDirection(keyPressed);
    }

}

function changeDirection(keyPressed){
            let isChanged = false;
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

            if(snake.turnCount.count > 0) {
                if (snake.turnCountTemp === snake.turnCount.count) {
                    document.dispatchEvent(snake.turningEventSuccess);
                }
            }

            if(isChanged === true){
                document.removeEventListener('keydown', changeDirection);
            }

    }