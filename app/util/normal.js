module.exports = {
  checkParam,
}
function checkParam(...payload) {
  var nullFlag = payload.every((currentValue, index, arr) => {
    return currentValue != null
  })
  return nullFlag
}
// let demo = [1,2,null,4,5]
// console.log(checkParam(1,3,4,5))
/**
 * @param {Object} obj
 */
// function deep(obj){
//     var newObj = Array.isArray(obj)?[]:{};
//     if(typeof(obj)=="object"){
//       for(let attr in obj){
//         if(obj.hasOwnProperty(attr)){
//           newObj[attr] = (typeof(obj)=="object"&&obj)?deep(obj[attr]):obj[attr]
//         }
//       }
//     }
//     else{
//       return obj
//     }

//   return newObj
// }