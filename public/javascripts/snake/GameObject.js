export default class GameObject{
    constructor(x, y, dx, dy, fillColor, borderColor){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
    }

    isSamePosition(gameObject){
        if(this.x === gameObject.x && this.y === gameObject.y){
            return true;
        } else return false;
    }
}