// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane, faCar, faTaxi, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format, isBefore } from 'date-fns';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import { setSearchInfo, getSearchInfo, timeToString, stringToDate } from '../../utils/Tool';
import lodash from 'lodash';

export default function Header({ type }) {
  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      // startDate: format(new Date(), 'MM/dd/yyyy'),
      // endDate: format(new Date(new Date().setDate(new Date().getDate() + 1)), 'MM/dd/yyyy'),
      key: 'selection',
    },
  ]);

  function formatDates(dates) {
    let startDate = format(dates[0].startDate, 'MM/dd/yyyy');
    let endDate = format(dates[0].endDate, 'MM/dd/yyyy');
    return [
      {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      },
    ];
  }

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
    // let newDates = formatDates(dates);

    // Fri Jan 06 2023 16:08:48 GMT+0800 (中国标准时间)

    let newDates = lodash.cloneDeep(dates);
    // console.log(newDates);
    newDates[0].startDate = timeToString(newDates[0].startDate);
    newDates[0].endDate = timeToString(newDates[0].endDate);

    // newDates[0].startDate = str2;
    // console.log(typeof str2, str2);

    // console.log('stringToDate:', stringToDate(str2, '-'));

    // console.log(newDates, typeof newDates[0].startDate);
    setSearchInfo({ dates: newDates, destination: destination });
    navigate('/hotels', { state: { destination, dates, options } });
  };
  const { user } = useContext(AuthContext);

  // let storedSeachInfo = {};

  function decideDates() {
    let info = getSearchInfo();
    if (info) {
      // 还需要判断储存的开始日期是否在今天以前，如果是的话需要删除，然后设置默认今天开始的

      // console.log(isBefore())
      // storedSeachInfo = info;
      setDestination(info.destination);
      // 处理info.dates为date对象
      info.dates[0].startDate = stringToDate(info.dates[0].startDate);
      info.dates[0].endDate = stringToDate(info.dates[0].endDate);
      console.log(info.dates[0].startDate);
      let today = stringToDate(timeToString(new Date()));
      // let isBeforeToday = false;
      if (isBefore(info.dates[0].startDate, today)) {
        // isBeforeToday = true;
        setDates([
          {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            key: 'selection',
          },
        ]);
        console.log('dates:', dates);
        setSearchInfo({});
      } else {
        setDates(info.dates);
      }

      console.log(isBefore(info.dates[0].startDate, today));

      console.log('today:', today);
    }
  }

  useEffect(() => {
    //如果存在搜索数据，则使用搜索数据
    decideDates();
  }, []);

  // console.log(JSON.stringify(new Date().toString()));
  // console.log(typeof new Date());

  useEffect(() => {
    // console.log('dates:', dates);
    // setSearchInfo({ dates: dates, destination: destination });
  }, [dates]);

  const handleInputChange = event => {
    setDestination(event.target.value);
  };

  return (
    <div className="header">
      <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type !== 'list' && (
          <>
            <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or more with a free Lamabooking account
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder={destination || 'Where are you going?'}
                  className="headerSearchInput"
                  // onChange={e => {
                  //   setDestination(e.target.value);
                  // }}
                  onChange={handleInputChange}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                  {/* {`${dates[0].startDate} to ${dates[0].endDate}`} */}
                  {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={item => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption('adult', 'd')}>
                          -
                        </button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('adult', 'i')}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption('children', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('children', 'i')}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption('room', 'd')}>
                          -
                        </button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('room', 'i')}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
