'use strict';

;(function(){

    jQuery(document).ready(function ($) {
        realTime();
        window.realTimeTimer = setInterval(realTime, 500);
    });
    //实时时间
    function realTime(){
        let d = new Date();
        let timeDom = document.querySelector('#realTime');
        if(timeDom){
            timeDom.innerHTML = d.toLocaleString();
        }
    }

}());
