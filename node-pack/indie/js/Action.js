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
                this.character.power += num;
                return this;
            },
            block() {
                this.character.doing = "block";
                return this;
            },
            knife() {
                this.character.doing = "knife";
                this.character.power -= 1;
                return this;
            },
            parry() {
                this.character.doing = "parry";
                this.character.power -= 1;
                return this;
            },
            pistol() {
                this.character.doing = "pistol";
                this.character.power -= 2;
                return this;
            },
            critical_attack() {
                this.character.doing = "critical_attack";
                this.character.power -= 3;
                return this;
            },
        };
        this.effects = {
            charge:{
                
            },
            block:{
                self:{
                    doing: 'block',
                    strength:1,
                },
            },
            knife:{
                self:{
                    power: 1,
                },
                foe:{
                    power: 0,
                }
            },
            parry:{
                self:{
                    power: 1,
                },
                foe:{
                    power: 0,
                }
            },
            pistol:{
                self:{
                    power: 1,
                },
                foe:{
                    power: 0,
                }
            },
            critical_attack:{
                self:{
                    power: 1,
                },
                foe:{
                    power: 0,
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
            content:{
                ...that.effects[action]
            },
            context: this,
        });
    }
}


export { Action, CharacterAction };