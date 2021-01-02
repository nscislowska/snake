export default class Score{
    constructor(){
        this.score = document.getElementsByClassName("score__content")[0];
        this.score.innerText = "0";
    }

    get(){
        return parseInt(this.score.innerText);
    }

    set(number){
        this.score.innerText = number;
    }

    incrementBy(number){
        this.score.innerText = this.get() + number;
    }
}