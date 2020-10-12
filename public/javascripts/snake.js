const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let PARTSIZE = 10;
class Snake{
    constructor() {
        this.parts = [
            {x: 150, y: 150},
            {x: 140, y: 150},
            {x: 130, y: 150},
            {x: 120, y: 150},
            {x: 110, y: 150},]
        this.direction = PARTSIZE
    }
    draw(){
        this.parts.forEach(this.drawPart);
    }
    drawPart(snakePart) {
        ctx.fillStyle = 'lightgreen';
        ctx.strokestyle = 'darkgreen';
        ctx.fillRect(snakePart.x, snakePart.y, PARTSIZE, PARTSIZE);
        ctx.strokeRect(snakePart.x, snakePart.y, PARTSIZE, PARTSIZE);
    }
    move(){
        let head = {x: this.parts[0].x + PARTSIZE, y: this.parts[0].y};
        this.parts.unshift(head);
        this.parts.pop();
    }

}

snake = new Snake();
main();

function main() {
    setTimeout(
        function onTick() {
            clearCanvas();
            snake.draw();
            snake.move();
            main();
        },1000)
}

function clearCanvas() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

