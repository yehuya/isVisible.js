/**
 * isVisible.js
 * https://github.com/yehuya/isVisible.js
 */

(function(){
    
    var _visible = [];
    var _top = 0;
    var _bottom = _top + window.innerHeight;
    var _className = 'isVisible';

    // current scroll Y postiion 
    // @param Object (window event)
    function currentYPosition(event){
        _top = document.body.scrollTop; // Math.abs(document.body.getBoundingClientRect().top);
        _bottom = _top + window.innerHeight * .9;

        nowVisible(event);
    }

    // check if there is elements that right now is visible
    // @param Object (window event)
    function nowVisible(event){
        for(var i = 0 ; i < _visible.length ; i++){
            if(_visible[i].top < _bottom && _visible[i].top > _top){
                if(_visible[i].elem){

                    // add class
                    _visible[i].elem.classList.add(_className);
                    // invok callback
                    if(typeof _visible[i].callback == 'function') _visible[i].callback(event);
                }

                // remove this elem from this checking
                _visible.splice(i,1);
            }
        }
    }

    // add element into visible arr
    function isVisible(elem, callback){
        if(typeof arguments[0] == 'function') callback = arguments[0]; // for: if- this.isVisible(callback)
        if(this instanceof Element) elem = this; // for: Element.prototyp.isVisible
        var pos = elem.getBoundingClientRect();

        var details = {
            elem: elem,
            top: pos.top + document.body.scrollTop,
            left: pos.left,
            callback: callback ? callback.bind(elem) : null
        };

        _visible.push(details);

        return elem;
    }

    // is visible for jQuery
    function isVisibleJquery(callback){
        return this.each(function(){
            this.isVisible(callback);
        });
    }

    // for mobile touch
    window.addEventListener('touchmove', currentYPosition);
    window.addEventListener('touchend', currentYPosition);

    // invok it when window load 
    window.addEventListener('load', currentYPosition);    

    // invok it when document ready
    window.addEventListener('DOMContentLoaded', currentYPosition);

    // scroll
    window.addEventListener('mousewheel', currentYPosition);

    // firefox scroll
    window.addEventListener('DOMMouseScroll', currentYPosition);

    // attach it to document element
    Element.prototype.isVisible = isVisible;

    // create jQuery plugins if exists
    if(typeof jQuery != 'undefined'){
        jQuery.fn.isVisible = isVisibleJquery;
    }

})();
