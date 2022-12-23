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
Mock.mock('/api/hotels/:id', (req, res) => {
  return {
    errno: 0,
    data: hotels,
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

Mock.mock('/hotels/countByCity?cities=Berlin,Madrid,London', (req, res) => {
  // console.log(req.url, cities);
  // Calculate every type of hotels (hotelCount,apartmentCount,resortCount,villaCount,cabinCount)
  return {
    errno: 0,
    data: cities,
  };
});
