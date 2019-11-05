/**
 * 
 * @param {Array} arr 数组
 * @description 随机选取数组中的一个元素并返回
 */
function arrRandomPick(arr) {  
    let randomNum = Math.floor(Math.random() * arr.length);
        return arr[randomNum];
}

export { arrRandomPick };