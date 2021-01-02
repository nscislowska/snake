export default class GameObject{
    constructor(x, y, dx, dy, fillColor, borderColor, image){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.image = image;

    }

    isSamePosition(gameObject){
        let diffX  = gameObject.x - this.x;
        let diffY = gameObject.y - this.y;
        if(Math.abs(diffX) < this.dx-1 && Math.abs(diffY) < this.dy-1){
            return true;
        } else return false;
    }

    changeCoordToRandom(maxH,maxW, blockSize){
        let x = Math.floor(Math.random() * ((maxW/blockSize)-4))+ 2;
        let y = Math.floor(Math.random() * ((maxH/blockSize)-4))+ 2;
        this.x = x*blockSize;
        this.y = y*blockSize;
    }

    setCoord(x,y){
        this.x = x;
        this.y = y;
    }

    isImage(){
        return this.image !== undefined;
    }
}