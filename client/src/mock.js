const Mock = require('mockjs');
var appData = require('./data.json');
var hotels = appData.hotels;
var rooms = appData.rooms;
var users = appData.users;
var cities = appData.cities;
// var countByType = appData.countByType;

Mock.mock('/api/hotels', (req, res) => {
  // console.debug(hotels);
  return {
    errno: 0,
    data: hotels,
  };
});
Mock.mock(/\/api\/hoteldetail/, (req, res) => {
  return {
    errno: 0,
    data: hotels[0],
  };
});
Mock.mock('/hotels/countByType', (req, res) => {
  // Calculate every type of hotels (hotelCount,apartmentCount,resortCount,villaCount,cabinCount)
  const countByType = [
    {
      type: 'hotel',
      count: 0,
    },
    {
      type: 'apartments',
      count: 0,
    },
    {
      type: 'resorts',
      count: 0,
    },
    {
      type: 'villas',
      count: 0,
    },
    {
      type: 'cabins',
      count: 0,
    },
  ];

  hotels.map((element, index) => {
    // 如果hotels里面的type等于countByType的type，则加1
    countByType.map(item => {
      if (element.type === item.type) {
        return (item.count += 1);
      }
      return {
        type: element.type,
        count: item.count,
      };
    });
    return element;
  });

  // console.log(countByType);

  return {
    errno: 0,
    data: countByType,
  };
});

// 根据url获取query参数
const getQuery = (url, name) => {
  // console.log(url); //  /api/get/news?pageindex=1&pagesize=10
  const index = url.indexOf('?');
  // console.log(index); //13
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&');
    // console.log(queryStrArr); //['pageindex=1', 'pagesize=10']
    //0: "pageindex=1"
    //1: "pagesize=10"
    for (var i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=');
      // console.log(itemArr); //['pageindex', '1']    //['pagesize', '10']
      //0: "pageindex"        //0: "pagesize"
      //1: "1"                //1: "10"

      if (itemArr[0] === name) {
        return itemArr[1];
      }
    }
  }
  return null;
};

Mock.mock(/\/hotellist/, 'get', options => {
  // 获取传递的参数pageindex
  const featured = getQuery(options.url, 'featured');
  // 获取传递的参数pagesize
  const limit = getQuery(options.url, 'limit');

  // console.log(options, featured, limit); //业务代码省略
  // return {
  //   errno: 0,
  //   data: cities,
  // };
});

Mock.mock(/\/searchhotels/, 'get', options => {
  // 获取传递的参数pageindex
  const city = getQuery(options.url, 'city');
  // 获取传递的参数pagesize
  const min = getQuery(options.url, 'min');
  const max = getQuery(options.url, 'max');

  // console.log(options, city, min, max); //业务代码省略

  return {
    errno: 0,
    data: hotels,
  };
});

// 这里应该返回featured数组，城市相应的图片以及featured数量
// Mock.mock('/hotels/countByCity?cities=Berlin,Madrid,London', (req, res) => {
Mock.mock(/\/hotelcount\/countByCity/, 'get', options => {
  // console.log(req.url, cities);
  let countByCity = [];
  let arr = [];
  hotels.map((element, index) => {
    // console.log(element.city);
    // console.log('countByCity:', countByCity);

    if (countByCity.length === 0) {
      return countByCity.push({ city: element.city, count: 1 });
    } else {
      // console.log('countByCity:', countByCity);
      arr = countByCity.map((el, i) => {
        // console.log('el:', el, 'i:', i);
        // 已经含有某个城市
        if (element.city === el.city) {
          return (el.count += 1);
        }
        if (element.city !== el.city) {
          // 不含某个城市
          // console.log('1');
          // return countByCity.push({ count: 1 });
          return countByCity.push({ city: element.city, count: 1 });
        }
      });
    }
  });
  // console.log('arr:');
  // Calculate every type of hotels (hotelCount,apartmentCount,resortCount,villaCount,cabinCount)
  return {
    errno: 0,
    data: cities,
  };
});
