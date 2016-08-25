class Bhv {

    static testStr(str) {
        console.log(str || `This is ${this.name} class in Behaviour`);
    }


    static whereami(str) {
        console.log(str || "I'm here!!!");
    }

    get debug() { console.log(this) }
    set debug(obj) {
        console.log(obj)
    }


}


