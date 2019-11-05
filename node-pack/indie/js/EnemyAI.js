class EnemyAI {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
        this.enemy = gameInstance.characters.enemy;
    }

    execute() {
        let {actionArr, actionWeightArr} = this.getActions();
        /* console.log(actionArr);
        console.log(actionWeightArr); */

        // 取随机数
        let randomNum = Math.floor(Math.random() * actionWeightArr.length);
        // 获取对应的行动key
        let actionKey = actionWeightArr[randomNum].doing;

        this.gameInstance.characters.enemy.action.execute(actionKey);
    }

    // 获取可选的行动
    getActions() {
        let power = this.enemy.power;
        let actionEffects = this.enemy.action.effects;
        let actionEffectsKey = Object.keys(actionEffects);
        let actionArr = [];
        let actionWeightArr = [];
        actionEffectsKey.forEach(key => {
            let powerCost = actionEffects[key].self.power;
            // 去掉消耗高于气的
            if (powerCost < 0 && -powerCost > power) {
                return false;
            }
            actionArr.push(actionEffects[key]);
            // 权重
            let weight = actionEffects[key].weight;
            for (let i = 1; i <= weight; i++) {
                actionWeightArr.push(actionEffects[key]);
            }
        })
        return {
            actionArr,
            actionWeightArr,
        };
    }


}

export { EnemyAI };