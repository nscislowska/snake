export default class Message {
    constructor(){
        this.message = document.getElementsByClassName("message__content")[0];
    }

    set(text){
        this.message.innerText = text;
    }

    get(){
        return this.message.innerText;
    }

}