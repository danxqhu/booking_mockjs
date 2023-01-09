export function setSearchInfo(obj) {
  let obj2 = JSON.stringify(obj);
  localStorage.setItem('hotel_search', obj2);
}

export function getSearchInfo() {
  let obj = JSON.parse(localStorage.getItem('hotel_search'));
  // console.log(obj);
  return obj;
}

export function timeToString(timeObj) {
  var str = '';
  var year = timeObj.getFullYear();
  var month = timeObj.getMonth() + 1;
  var date = timeObj.getDate();
  // var time = timeObj.toTimeString().split(' ')[0];
  // var rex = new RegExp(/:/g);
  // str = year + '-' + month + '-' + date + '-' + time.replace(rex, '-');
  str = year + '-' + month + '-' + date;
  // console.log('当前日期:' + str);
  return str;
}

export function stringToDate(dateStr, separator) {
  if (!separator) {
    separator = '-';
  }
  var dateArr = dateStr.split(separator);
  var year = parseInt(dateArr[0]);
  var month;
  // 处理04月份
  if (dateArr[1].indexOf('0') === '0') {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  var day = parseInt(dateArr[2]);
  var date = new Date(year, month - 1, day);
  return date;
}
