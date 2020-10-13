const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let PARTSIZE = 10;
let speed = 100;

const LEFT_KEY = "ArrowLeft";
const RIGHT_KEY = "ArrowRight";
const UP_KEY = "ArrowUp";
const DOWN_KEY = "ArrowDown";

class Snake{
    constructor(length) {
        this.build(length);
        this.direction = {
            x: PARTSIZE,
            y: 0
        }
    }
    build(length){
        this.parts=[];
        let startPoint = {
            x: 0,
            y: canvas.clientHeight/2
        }
        for(let i=0; i<length;i++){
            this.parts.push({
                x: startPoint.x - PARTSIZE*i,
                y: startPoint.y
            });
        }
    }
    draw(){
        this.parts.forEach(this.drawPart);
    }
    drawPart(snakePart, index) {
        if(index === 0){
            ctx.fillStyle = 'darkgreen';
        } else{
            ctx.fillStyle = 'lightgreen';
        }
        ctx.strokestyle = 'darkgreen';
        ctx.fillRect(snakePart.x, snakePart.y, PARTSIZE, PARTSIZE);
        ctx.strokeRect(snakePart.x, snakePart.y, PARTSIZE, PARTSIZE);
    }
    move(){
        let head = {x: this.parts[0].x + this.direction.x, y: this.parts[0].y + this.direction.y};
        if(head.x >= canvas.clientWidth){
            head.x = 0;
        } else if( head.x <= -PARTSIZE){
            head.x = canvas.clientWidth-PARTSIZE;

        } else if(head.y <= -PARTSIZE){
            head.y = canvas.clientHeight-PARTSIZE;
        } else if(head.y >= canvas.clientHeight){
            head.y = 0;
        }
        this.parts.unshift(head);
        this.parts.pop();
    }

}
snake = new Snake(10);

function changeDirection(event) {
    const keyPressed = event.key;
    const goingUp = snake.direction.y === -PARTSIZE;
    const goingDown = snake.direction.y === PARTSIZE;
    const goingRight = snake.direction.x === PARTSIZE;
    const goingLeft = snake.direction.x === -PARTSIZE;

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


document.addEventListener("keydown", changeDirection);
main();
function main() {
    setTimeout(
        function onTick() {
            clearCanvas();
            snake.draw();
            snake.move();
            main();
        },speed)
}

function clearCanvas() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

