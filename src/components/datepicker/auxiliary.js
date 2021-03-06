export default {
  getFirstDateOfMonth(date){
    let [year,month,day] = getYearMonthDay(date)
    return new Date(year,month,1)
  },
  getLastDateOfMonth(date){
    let [year,month,day] = getYearMonthDay(date)
    return new Date(year,month+1,0)
  },
  getYearMonthDay,
  range(begin,end){
    let array = []
    for (let i=begin;i<end;i++){
      array.push(i)
    }
    return array
  },
  addMonth(date,n){
    let [year,month,day] = getYearMonthDay(date)
    let newMonth = month + n
    let copy = new Date(date)
    copy.setMonth(newMonth)
    return copy
  }
}

function getYearMonthDay(date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return [year,month,day]
}