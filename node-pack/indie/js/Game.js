/* 
    游戏主类
*/

import { Player, Enemy } from './Character.js';
import { Processor } from './Processor.js';

/* -- 创建游戏 -- */
function createGame(id = 'app', payload) {
    var defaultConfig = {
        player: {
            name: '玩家',
        },
        enemy: {
            name: '敌人',
        }
    };
    var config = Object.assign(defaultConfig, payload);
    //新建游戏实例
    var game = new GameInit(id, config);

    return game;
}

/* -- 游戏主体构造函数 -- */
function GameInit(id, config) {
    this.id = id;
    // this.dom = document.querySelector('#' + id);
    this.dom = document.getElementById(id);
    this.characters = {
        player: new Player(this, config.player),
        enemy: new Enemy(this, config.enemy),
    }
    this.processor = new Processor(this),
    this.queue = [];

    bindEvents(this)
}
GameInit.prototype = {
    constructor: GameInit,
    //重置状态
    reset() {
        this.characters.player.reset();
        this.characters.enemy.reset();
        this.processor.execute('reset');
    },
    //销毁游戏实例
    destroy() {
        this.reset();
        this.executeQueue('destroy');
        //解绑所有事件
        Object.keys(this.characters).forEach((k) => {
            console.log(this.characters)
            this.characters[k].clearEvents();
        });
        //销毁游戏实例对象属性
        for (let key in this) {
            delete this[key];
        }
        return null;
    },
    //刷新视图
    refreshView() {
        this.processor.refreshView();
    },
    //执行队列记录
    addQueue(data = null) {
        if (data) {
            data.type == 'character_action' ? console.log(data.context.character.name): '';
            console.log(data.name);
            this.queue.push(data);
        } else {
            console.log('Must logging a queue with arguments!')
            console.log(this);
            return false;
        }
    },
}

/* -- 构建功能函数 -- */
//事件绑定
function bindEvents(obj) {
    //重置数据 button #resetBtn
    let resetBtn = obj.dom.querySelector('#resetBtn');
    if (resetBtn) {
        let handler = function (event) {
            obj.reset();
        }
        let type = 'click';
        addEvent(resetBtn, type, handler);
    }
}

/* -- 构建工具函数 -- */
//原型继承
function inherits(Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

//增加事件
function addEvent(dom, type, handler) {
    dom.addEventListener(type, handler);
    if (!dom.eventList) {
        dom.eventList = [];
    };
    dom.eventList.push({
        type,
        handler,
    });
    return true;
}
//清除事件
function clearEvents(dom) {
    if (dom.eventList) {
        dom.eventList.forEach(el => {
            dom.removeEventListener(el.type, el.handler);
        })
        delete dom.eventList;
    } else {
        return false;
    }
}


window.createGame = createGame;

export default createGame;