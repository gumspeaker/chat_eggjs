module.exports ={
  checkParam
}
function checkParam(...payload){
  var nullFlag = payload.every((currentValue,index,arr)=>{
      // console.log(currentValue)
        return currentValue != null;
    })
    return nullFlag;
}
// let demo = [1,2,null,4,5]
// console.log(checkParam(1,3,4,5))