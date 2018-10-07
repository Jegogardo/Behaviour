/*const NEWEL_ENABLE = true; // true|false;
const BHV_ENABLE = true; // true|false;
const CLASSIE_ENABLE = true; // true|false;
const POLYFILLS_ENABLE = true; // true|false;
*//*
const POLYFILL_STARTSWITH_ENABLE = true;
const POLYFILL_ENDSWITH_ENABLE = true;
const POLYFILL_OBJECT_ASSIGN_ENABLE = true;
const POLYFILL_OBJECT___PROTO___ENABLE = true;
const POLYFILL_OBJECT_ISEMPTY_ENABLE = true;
*/

//if( BHV_ENABLE ){
class Bhv {

    static whoami(str) {
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

//}



//}
//}


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
        if ( string[3] != undefined) {
            string[3].indexOf(" ") == 0 ? string[3] = string[3].substr(1) : false;
            var dataset = string[3].split(" ");
            for (var i in dataset) {
                var s = dataset[i].split("=")
                var attr = document.createAttribute(s[0]);
                // Don't use setAttribute( string, string) cause
                // doesn't respect the uppercase
                if(s[1])
                    attr.value = s[1]
                el.setAttributeNode(attr);
            }
                
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
                    if(node.data[i])
                        attr.value = node.data[i];
                    el.setAttributeNode(attr);
                }
            }


        }
    }
    if( typeof toWrite != "undefined" )
        toWrite.appendChild( el );
        

    /*
        Permette di chiamare i setter degli HTMLElement
        Es.: newEl('div').call('textContent','testo di esempio')
    */
    el.call = function(prop,value){
        prop in el? (el[prop] = value): console.log('Key not defined')
        return el
    }

    /*
        Permette di inserire un HTMLElement più elementi in un volta.
        È usato insieme al repeatEl
        Es.:
        newEl('div,,photo')
            .appendChildren(repeatEl('img',3,
                {
                    src:[
                        "uploads/IMG_20180607_185856.jpg",
                        "uploads/IMG_20180611_135255.jpg",
                        "uploads/prova1.jpg"
                    ]
                }
            )),
    */
    el.appendChildren = function(array){
        array.forEach(element => {
            this.appendChild(element)    
        });

        return el
    }

    return el;
}



/*
    Permette di ripete la funzione newEl per n volte
    rispettando i data-set. Restituisce un array ricavato
    da una HTMLCollection (Array.from())
    
    repeatEl('a',2, {"data-init": ["prova","prova2"], "href": ["link1","link2"]})
    ↓       ↓           ↓
    [
        <a data-init="prova" href="link1"></a>,
        <a data-init="prova2" href="link2"></a>
    ]
*/
function repeatEl(el, n, data = null, toWrite = undefined){
    if(data){
        var props = Object.keys(data)
    }
    let d = document.createElement('div')
    for(let i=0;i<n; i++){
        let attrs = {}
        if(props){
            for(c=0;c<props.length;c++){
                let key = props[c]
                attrs[key] = data[key][i]
            }
        }

        let e = newEl({el:el, data: attrs}, toWrite)

        d.appendChild(e)
    }
    return [].slice.call(d.children)
}

//if(POLYFILL_ENDSWITH_ENABLE){
if(!( "endsWith" in String.prototype ) ){
    Object.defineProperty(String.prototype, "endsWith", {
        enumerable: false,
        value: 
        function( wd ){
            if( typeof wd == "undefined" )
                return false;
            var lengthStr = this.length;
            var lengthWd = wd.length;
            if( lengthWd > lengthStr ){
                return false
            }
            else
                if(  this.substring( lengthStr - lengthWd )== wd )
                    return true
                    else
                        return false
                        }
    } );

}
//}

//if(POLYFILL_STARTSWITH_ENABLE){
if(!( "startsWith" in String.prototype ) ){

    Object.defineProperty(String.prototype, "startsWith", {
        enumerable: false,
        value: 
        function( wd ){
            if( typeof wd == "undefined" )
                return false;
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
    } );

}
//}
/*
(function () {
    const DEBUG = false
    var oldLog = console.log;
    if (DEBUG)
        console.log = function (message) {
            // DO MESSAGE HERE.
            document.body.innerHTML += message + "<br>"
        };
})();*/

//if(POLYFILL_OBJECT_ASSIGN_ENABLE){
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
//}


//}

if( ! ("isEmpty" in Object.prototype )){
    Object.defineProperty(Object.prototype, "isEmpty", {
        enumerable: false,
        value: 
        function(  ){
            if(Object.keys(this).length > 0){
                return false;
            }
            else
                return true;
        }
    } );
}





//if( POLYFILL_OBJECT_ISEMPTY_ENABLE ){
if( ! ("__proto__" in Object.prototype )){
        Object.defineProperty( Object.prototype, '__proto__', {
            enumerable:false,
            get: function(){                
                return this.constructor.prototype;
                
            }
        });

    }
//}


// Classie API
/*
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )

 * Multiple classes are accepted in add, remove and toggle methods if they
 * are separated from ',' (comma)
 */

window.classie = undefined;

//if( CLASSIE_ENABLE ){
window.classie = {
    //     if( 'classList' in document.documentElement )
    add : function( el, classes ){
        if( !( el instanceof HTMLElement) )
            console.error(`--- Need an HTMLelement to add class`);
        
        if( this.has(el, classes) )
            return;
        
        classes=classes.trim();
        if( classes.indexOf(",") > -1 ){
            classes = classes.split(",");
            for( let i=0; i< classes.length; i++){
                if( !this.has( el, classes[i] ) )
                    el.className += classes[i];
            }
        }
        else
            el.className += ' ' + classes;
        
        el.className = el.className.trim();
        return el;  
    },

    remove: function(el, classes){
        if( !( el instanceof HTMLElement) )
            console.error(`--- Need an HTMLelement to add class`);
        
        if( !this.has(el, classes) )
            return;
        
        classes=classes.replace(' ','')
        if( classes.indexOf(",") > -1 ){
            classes = classes.split(",");
            for( let i=0; i< classes.length; i++){
                if( this.has( el, classes[i] ) ){
                    let classReg = new RegExp("(^|\\s+)" + classes[i] + "(\\s+|$)");
                    el.className = el.className.replace(classReg, ' ');
                }
            }
            el.className = el.className.trim();
        }
        else{
            let classReg = new RegExp("(^|\\s+)" + classes + "(\\s+|$)");
            el.className = el.className.replace(classReg, ' ');
        }

        return el;
    },

    has: function( el, theclass ){
        if( !( el instanceof HTMLElement) )
            console.error(`--- Need an HTMLelement to add class`);

        let classReg = new RegExp("(^|\\s+)" + theclass + "(\\s+|$)");
        return classReg.test(el.className);

    },

    toggle: function(el, classes){
        if( !( el instanceof HTMLElement) )
            console.error(`--- Need an HTMLelement to add class`);

        classes = classes.replace(' ','')
        if( classes.indexOf(",") > -1 ){
            classes = classes.split(",");
            for( let i=0; i< classes.length; i++){
                if( this.has( el, classes[i] ) )
                    this.remove(el, classes[i]);
                else
                    this.add(el, classes[i]);                  

            }
            el.className = el.className.trim();
        }
        else{
            if( this.has(el, classes) )
                this.remove(el, classes)
                else
                    this.add(el, classes)
                    }

        return el;
    }
}