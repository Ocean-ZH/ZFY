
class Action {
    constructor(character){
        this.character = character || null;
        this.actions;
    }

    execute(type,props) {
        if (this[type]) {
            this[type](props);
        }
        this.character.gameInstance.executeQueue(type);
    }

    charge(num = 1){
        this.character.doing = "charge";
        this.character.power += num;
        return this;
    }
    block(){
        this.character.doing = "block";
        return this;
    }
    knife(){
        this.character.doing = "knife";
        this.character.power -= 1;
        return this;
    }
    parry(){
        this.character.doing = "parry";
        this.character.power -= 1;
        return this;
    }
    pistol() {
        this.character.doing = "pistol";
        this.character.power -= 2;
        return this;
    }
    critical_attack() {
        this.character.doing = "critical_attack";
        this.character.power -= 3;
        return this;
    }
}


export default Action;