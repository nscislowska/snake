import GameObject from "./GameObject.js";

export default class Food extends GameObject{
    constructor(x, y, size) {
        super(x,y,size,size, "#ebc400", "#c99a00");
    }


}