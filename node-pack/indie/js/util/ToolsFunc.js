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

/**
 * @description 自定义数据排序函数
 */
function my() {
    Array.prototype.mySort = function (func) {
      let arr = [...this];
      for (let i = 0; i < arr.length; i++) {
        if(i > 0) {
          let n = func(arr[i]);
          if ( n < 0 ) {
            let temp = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = temp;
          }
        }
      }
      return arr;
    }
    let list = [1,2,3,4,5,6,7,8,9];
    list.mySort(() => Math.random() - .5);
}

export { arrRandomPick };