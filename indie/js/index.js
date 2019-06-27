'use strict';

;(function(){

    jQuery(document).ready(function ($) {
        realTime();
        window.realTimeTimer = setInterval(realTime, 500);
    });

    function realTime(){
        let d = new Date();
        let timeDom = document.querySelector('#realTime');
        if(timeDom){
            timeDom.innerHTML = d.toLocaleString();
        }
    }

}());

;(function(){
    /* -- 创建游戏 -- */
    function createGame(id = 'app'){

        var game = new GameInit(id);
        return game;
    }

    /* -- 游戏主体构造函数 -- */
    function GameInit(id){
        this.id=id;
        this.dom = document.querySelector('#'+id);
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.domEventList = [];

        bindEvents(this);
    }
    GameInit.prototype = {
        constructor: GameInit,
        reset(){
            this.player.reset();
            this.enemy.reset();
        },
        destroy(){
            this.reset();
            this.refreshView();
            //解绑所有事件
            this.domEventList.forEach((el)=>{
                // console.log(this)
                el.eventList.forEach((eventObj)=>{
                    el.removeEventListener(eventObj.type,eventObj.handler);
                });
            });
            //销毁游戏实例对象属性
            for(let key in this){
                delete this[key];
            }
            return null;
        },
        refreshView(){
            this.player.refreshView();
        },
    }
    
    /* -- 角色类 -- */
    function Character(target){
        this.gameInstance = target;
        this.life = 1;
        //power
        let powerVal = 0;
        Object.defineProperty(this, 'power', {
            configurable:true,
            enumerable:true,
            get:function(){
                return powerVal;
            },
            set:function(value){
                powerVal = value;
            },
        });
        
    };
    Character.prototype = Object.assign(Character.prototype,{
        constructor:Character,
        addPower(num = 1){
            this.power += 1;
            return this;
        },
        reset(){
            this.power = 0;
        },
        refreshView(){
            //player_power
            this.view.power.innerHTML = this.power;
            //player_skill_ul
            let skillList = this.gameInstance.dom.querySelectorAll('#player_skill_ul >li');
            skillList.forEach((el,i)=>{
                if(i<=this.power){
                    el.classList.remove('hide');
                    el.classList.add('show');
                }else{
                    el.classList.remove('show');
                    el.classList.add('hide');
                }
            })
        },
    });

    function Player(target){
        Character.call(this, target);
        this.dom = target.dom.querySelector('#player');
        this.view={
            power: this.dom?this.dom.querySelector('#player_power'):null,
        };
    };
    inherits(Player,Character);

    function Enemy(props){
        Character.call(this, props);
    };
    inherits(Enemy,Character);


    /* -- 构建功能函数 -- */
    //事件绑定
    function bindEvents(target){
        //reset button #resetBtn
        let resetBtn = target.dom.querySelector('#resetBtn');
        if(resetBtn){
            let handler = function(event){
                target.reset();
                target.refreshView();
            }
            let type = 'click';
            addEvent(resetBtn,type,handler);
            target.domEventList.push(resetBtn);
        }

        // 玩家蓄气 button #player_charge
        let chargeBtn = target.dom.querySelector('#player_charge');
        if(chargeBtn){
            let handler = function(event){
                target.player.addPower();
                target.refreshView();
            }
            addEvent(chargeBtn,'click',handler);
            target.domEventList.push(chargeBtn);
        }
    }

    /* -- 构建工具函数 -- */
    function inherits(Child, Parent){
        var F = function(){};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
    }

    function addEvent(dom,type,handler){
        dom.addEventListener(type,handler);
        if(!dom.eventList){
            dom.eventList = [];
        };
        dom.eventList.push({
            type,
            handler,
        });
    }

    
    window.createGame = createGame;

}());

