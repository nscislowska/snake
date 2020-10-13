export default class Canvas{
    constructor(){
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.height = this.canvas.clientHeight;
        this.width = this.canvas.clientWidth;
    }
    draw(gameObject){
        this.ctx.fillStyle = gameObject.fillColor;
        this.ctx.strokestyle = gameObject.borderColor;
        this.ctx.fillRect(gameObject.x,gameObject.y,gameObject.dx,gameObject.dy);
        this.ctx.strokeRect(gameObject.x,gameObject.y,gameObject.dx,gameObject.dy);
    }

    clear(){
        this.ctx.fillStyle = "lightgray";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}