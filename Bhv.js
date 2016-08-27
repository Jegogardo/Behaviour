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

/*
 * Example usage newEl
 * el:"div",
 * id:"theid",
 * theclass:"box expanded",
 * data:{
    "data-init": "prova",
    "href": "prova"
 *  }
 * !!! Respect the uppercase of attributes such as viewBox and not viewbox !!!
 */

function newEl(node, toWrite) {
    // Crea Html element per comodità
    if( typeof node == "string"){
        var string = node.split(",");

        var el = document.createElement( string[0].trim() );
        if( string[1] != undefined )
            string[1].trim() == "" ? false : el.id = string[1].trim();
        if ( string[2] != undefined) {
                string[2].indexOf(" ") == 0 ? string[2] = string[2].substr(1) : false;
                var theclass = string[2].split(" ");
                for (var i in theclass)
                    classie.add(el, theclass[i]);
            }
    }

    if( typeof node == "object" ){

        if (node.el == null ) {
            console.error("--- Need a name of HTMLElement at least");
            return;
        }
        else {
            var el = document.createElement(node.el);

            node.id === undefined ? false : el.id = node.id;

            if (node.theclass != undefined) {
                node.theclass = node.theclass.split(" ");
                for (var i in node.theclass)
                    classie.add(el, node.theclass[i]);
            }

            if (node.data != undefined) {
                for (var i in node.data) {
                    var attr = document.createAttribute(i);
                    // Don't use setAttribute( string, string) cause
                    // doesn't respect the uppercase
                    attr.value = node.data[i];
                    el.setAttributeNode(attr);
                }
            }


        }
    }
    if( typeof toWrite != "undefined" )
            toWrite.appendChild( el );
    return el;
}

