import Canvas from "./Canvas.js"
import Snake from "./Snake.js"
import Food from "./Food.js"
const LEFT_KEY = "ArrowLeft";
const RIGHT_KEY = "ArrowRight";
const UP_KEY = "ArrowUp";
const DOWN_KEY = "ArrowDown";

let partSize = 10;
let speed = 100;
let points = 0;
let canvas = new Canvas();
let snake = new Snake(
    {x: 0, y: canvas.height/2},
    5,
    partSize);

const foodEvent = new Event("food");
document.addEventListener("food", function(){snake.elongateBy(1)});
document.addEventListener("keydown", changeDirection);

let interactiveObjects = [new Food(50,50,10),new Food(100,50,10),new Food(200,200,10)];

main();

function main() {
    setTimeout(
        function onTick() {
            canvas.clear();
            drawInteractiveObjects();
            drawSnake();
            snake.move(canvas.width, canvas.height);
            checkCollision();
            if(snake.isDead()) return;
            main();
        },speed)
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
            if(object.className = "Food"){
                document.dispatchEvent(foodEvent);
                interactiveObjects.splice(
                    interactiveObjects.findIndex(value => object === value),
                    1
                )
            }
        }
    }
}

function changeDirection(event) {
    const keyPressed = event.key;
    const goingUp = snake.direction.y === -partSize;
    const goingDown = snake.direction.y === partSize;
    const goingRight = snake.direction.x === partSize;
    const goingLeft = snake.direction.x === -partSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        snake.direction.x = -10;
        snake.direction.y = 0;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        snake.direction.x = 10;
        snake.direction.y = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        snake.direction.x = 0;
        snake.direction.y = -10;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        snake.direction.x = 0;
        snake.direction.y = 10;
    }
}
