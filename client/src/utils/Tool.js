export function setSearchInfo(obj) {
  let obj2 = JSON.stringify(obj);
  localStorage.setItem('hotel_search', obj2);
}

export function getSearchInfo() {
  let obj = JSON.parse(localStorage.getItem('hotel_search'));
  return obj;
}
