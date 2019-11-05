/* 
    动作类
*/

class Action{
    constructor(){

    }
    execute(action) {
        
    }
}

class CharacterAction extends Action {
    constructor(character){
        super();
        this.character = character || null;
        this._actions = {
            charge(num = 1) {
                this.character.doing = "charge";
                // this.character.power += num;
                return this;
            },
            block() {
                this.character.doing = "block";
                return this;
            },
            knife() {
                this.character.doing = "knife";
                // this.character.power -= 1;
                return this;
            },
            parry() {
                this.character.doing = "parry";
                // this.character.power -= 1;
                return this;
            },
            pistol() {
                this.character.doing = "pistol";
                // this.character.power -= 2;
                return this;
            },
            critical_attack() {
                this.character.doing = "critical_attack";
                // this.character.power -= 3;
                return this;
            },
        };
        this.effects = {
            charge:{
                doing: 'charge',
                weight: 2,
                self:{
                    defence: 0,
                    power: 1,
                    counter: '',
                },
                foe:{
                    damage: 0,
                }
            },
            block:{
                doing: 'block',
                weight: 1,
                self:{
                    defence: 1,
                    power: 0,
                    counter: '',
                },
                foe:{
                    damage: 0,
                }
            },
            knife: {
                doing: 'knife',
                weight: 2,
                self:{
                    defence: 0,
                    power: -1,
                    counter: '',
                },
                foe:{
                    damage: 1,
                }
            },
            parry:{
                doing: 'parry',
                weight: 1,
                self:{
                    power: -1,
                    defence: 1,
                    counter: 'knife',
                },
                foe:{
                    damage: 0,
                }
            },
            pistol:{
                doing: 'pistol',
                weight: 3,
                self:{
                    power: -2,
                    defence: 0,
                    counter: '',
                },
                foe:{
                    damage: 2,
                }
            },
            critical_attack:{
                doing: 'critical_attack',
                weight: 4,
                self:{
                    power: -3,
                    defence: 0,
                    counter: '',
                },
                foe:{
                    damage: 3,
                }
            },
            
        }
    }
    execute (action, props){
        if (this._actions[action]) {
            this._actions[action].call(this, props);
        }
        let that = this;
        this.character.gameInstance.processor.execute({
            type: 'character_action',
            name: action,
            props,
            effects:{
                ...that.effects[action]
            },
            context: this,
        });
    }
}


export { Action, CharacterAction };