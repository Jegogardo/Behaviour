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

if(!( "endsWith" in String.prototype ) ){

    String.prototype.endsWith = function( wd ){

        var lengthStr = this.length;
        var lengthWd = wd.length;
        if( lengthWd > lengthStr ){
            return false
        }
        else
            if( this.substring( 0, lengthWd ) == wd )
                return true
                else
                    return false
                    }

    }

if(!( "startsWith" in String.prototype ) ){
        String.prototype.startsWith = function( wd ){

        var lengthStr = this.length;
        var lengthWd = wd.length;
        if( lengthWd > lengthStr ){
            return false
        }
        else
            if( this.substring( lengthStr - lengthWd ) == wd )
                return true
                else
                    return false
                    }

    }

(function () {
    const DEBUG = false
    var oldLog = console.log;
    if (DEBUG)
        console.log = function (message) {
            // DO MESSAGE HERE.
            document.body.innerHTML += message + "<br>"
        };
})();


//Polyfill Object.assign
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
