/* 
    视图类
*/

class ViewObj {
    constructor( ){
        this.doingMap = {
            charge: '蓄气',
            block: '格挡',
            knife: '小刀',
            parry: '弹反',
            pistol: '手枪',
            critical_attack: '绝技',
        };
    }
    //增加事件
    addEvent({dom, event}) {
        if(dom && event.type && event.handler){
            let type = event.type;
            let handler = event.handler;
            dom.addEventListener(type, handler);
            if (!dom.eventList) {
                dom.eventList = [];
            };
            dom.eventList.push({
                type,
                handler,
            });
            return true;
        }else{
            return false;
        }
    }

    //清除事件
    clearEvents(dom) {
        if (dom.eventList) {
            dom.eventList.forEach(el=>{
                dom.removeEventListener(el.type, el.handler);
            })
            delete dom.eventList;
        } else {
            return false;
        }
    }
}

class MainView extends ViewObj {
    constructor(gameInstance){
        super();
        this.gameInstance = gameInstance;
        let dom = gameInstance.dom;
        this.dom = dom;
        this.info = this.dom.querySelector('#main-info');
    }

    refreshView() {
        //main-info
        let str = '';
        let queue = [...this.gameInstance.queue];
        queue.reverse();
        if(queue.length > 0) {
            queue.forEach(el => {
                if (typeof el === 'object') {
                    str += `<p>${el.context.character.name}: 使用了${this.doingMap[el.name]} </p>`
                } else if (typeof el === 'string') {
                    str += `<p>${el}</p>`;
                } else if (typeof el === 'number') {
                    str += `<p>----------${el}----------</p>`;
                }
            });
            this.info.innerHTML = str;
        }
    }
}

class CharacterView extends ViewObj{
    constructor(character){
        super();
        this.character = character;
    }
}

class PlayerView extends CharacterView{
    constructor(character){
        super(character);
        // console.log(character)
        let dom = character.gameInstance.dom.querySelector('#player');
        this.dom = dom;
        this.name = this.dom.querySelector('#name');
        this.power = this.dom.querySelector('#player_power');
        this.health = this.dom.querySelector('#player_health');
        this.control = {
            skill:{
                // 玩家蓄气 button #player_charge
                charge: {
                    dom: this.dom.querySelector('#player_charge'),
                    requirePower: 0,
                    event:{
                        type: 'click',
                        handler: (event) => {
                            character.action.execute('charge', 1);
                        },
                    },
                },
                // 玩家格挡 button #player_block
                block: {
                    dom: this.dom.querySelector('#player_block'),
                    requirePower: 0,
                    event: {
                        type: 'click',
                        handler: (event) => {
                            character.action.execute('block');
                        },
                    },
                },
                // 玩家小刀 button #player_knife
                knife: {
                    dom: this.dom.querySelector('#player_knife'),
                    requirePower: 1,
                    event: {
                        type: 'click',
                        handler: (event) => {
                            character.action.execute('knife');
                        },
                    },
                },
                // 玩家弹反 button #player_parry
                parry: {
                    dom: this.dom.querySelector('#player_parry'),
                    requirePower: 1,
                    event: {
                        type: 'click',
                        handler: (event) => {
                            character.action.execute('parry');
                        },
                    },
                },
                // 玩家手枪 button #player_pistol
                pistol: {
                    dom: this.dom.querySelector('#player_pistol'),
                    requirePower: 2,
                    event: {
                        type: 'click',
                        handler: (event) => {
                            character.action.execute('pistol');
                        },
                    },
                },
                // 玩家绝技 button #player_critical
                critical: {
                    dom: this.dom.querySelector('#player_critical'),
                    requirePower: 3,
                    event: {
                        type: 'click',
                        handler: (event) => {
                            character.action.execute('critical_attack');
                        },
                    },
                },
            }
        }

        this.initEvent(this.character);
        this.refreshView();
    }

    initEvent(){
        let skillList = this.control.skill;
        Object.keys(skillList).forEach(key => {
            this.addEvent(skillList[key]);
        });
    }

    refreshView(){
        //player_power
        this.power.innerHTML = this.character.power;
        //player_health
        this.health.innerHTML = this.character.health;
        //name
        this.name.innerHTML = this.character.name;
        //player_skill_ul
        let skillList = this.control.skill;
        Object.keys(skillList).forEach(k => {
            if (skillList[k].requirePower <= this.character.power) {
                skillList[k].dom.parentNode.classList.remove('hide');
                skillList[k].dom.parentNode.classList.add('show');
            } else {
                skillList[k].dom.parentNode.classList.remove('show');
                skillList[k].dom.parentNode.classList.add('hide');
            }
        })
    }
}

class EnemyView extends CharacterView{
    constructor(character){
        super(character);
        let dom = character.gameInstance.dom.querySelector('#enemy');
        this.dom = dom;
        this.name = this.dom.querySelector('#name');
        this.power = this.dom.querySelector('#enemy_power');
        this.health = this.dom.querySelector('#enemy_health');
        this.log = this.dom.querySelector('#enemy_action_log');
        this.refreshView();
    }

    refreshView() {
        //enemy_power
        this.power.innerHTML = this.character.power;
        // enemy_health
        this.health.innerHTML = this.character.health;
        //name
        this.name.innerHTML = this.character.name;
        //name
        let doing = this.doingMap[this.character.doing] || this.character.doing;
        this.log.innerHTML = `${this.character.name}使用了: ${doing}`;
    }
}

export { PlayerView, EnemyView, MainView };