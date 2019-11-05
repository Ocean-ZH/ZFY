/**
 * 
 * @param {Array} arr 数组
 * @description 随机选取数组中的一个元素并返回
 */
function arrRandomPick(arr) {  
    let randomNum = Math.random();
    let index = Math.floor(randomNum * arr.length);
    return arr[index];
}

export { arrRandomPick };