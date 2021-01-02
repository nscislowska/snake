export default class Canvas{
    constructor(){
        this.canvas = document.getElementsByClassName('game__canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.background = "hsl(43,45%,31%)";
        updateCanvas();
    }

    getHeight(){
        return this.canvas.height;
    }

    getWidth(){
        return this.canvas.width;
    }

    draw(gameObject){
        if(gameObject.isImage()){
            this.ctx.drawImage(gameObject.image, gameObject.x, gameObject.y, gameObject.dx,gameObject.dy);
        }
        else {
            this.ctx.fillStyle = gameObject.fillColor;
            this.ctx.strokestyle = gameObject.borderColor;
            this.ctx.fillRect(gameObject.x, gameObject.y, gameObject.dx, gameObject.dy);
            this.ctx.strokeRect(gameObject.x, gameObject.y, gameObject.dx, gameObject.dy);
        }
    }

    clear(){
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    appendHTML(htmlObject){
        this.canvas.append(htmlObject);
    }
}

function updateCanvas(){
        var canvas = document.getElementsByClassName('game__canvas')[0];
        var cs = getComputedStyle(canvas);
        canvas.height = parseInt( cs.getPropertyValue('height'), 10);
        canvas.width = parseInt( cs.getPropertyValue('width'), 10);
}