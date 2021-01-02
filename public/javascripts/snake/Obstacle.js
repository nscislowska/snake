import GameObject from "./GameObject.js";

export default class Obstacle extends GameObject{
    constructor(x, y, size) {
        super(x,y,size,size, "#ff0000", "#772e0f");
        this.name = "obstacle";
        this.image = document.getElementsByClassName("obstacle-image")[0];

    }

}