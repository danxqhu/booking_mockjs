import React, { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import './hotel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

export default function Hotel() {
  // const photos = [
  //   {
  //     src: 'https://ac-a.static.booking.cn/xdata/images/hotel/max500/134688969.jpg?k=c16cd8478f07dd8561b920aab637cf6917c59431261e6581987bd58ca25ab7e1&o=&hp=1',
  //     id: 1,
  //   },
  //   {
  //     src: 'https://ac-a.static.booking.cn/xdata/images/hotel/max300/133589030.jpg?k=48bbe30f1b71778802c0d3bc0bba2448e210462ff873178d4478eab37336a850&o=&hp=1',
  //     id: 2,
  //   },
  //   {
  //     src: 'https://ac-a.static.booking.cn/xdata/images/hotel/max500/134695912.jpg?k=f16e4b081e33b6f796ea303ad5c6dac159dc2ffd84b37d094c558f2f9adf9bc5&o=&hp=1',
  //     id: 3,
  //   },

  //   {
  //     src: 'https://ac-a.static.booking.cn/xdata/images/hotel/max300/134895026.jpg?k=0358011388c8a88adb653e09294b0a947b5dad60a3c8a0b8fa9f27109740a6eb&o=&hp=1',
  //     id: 4,
  //   },
  //   {
  //     src: 'https://ac-a.static.booking.cn/xdata/images/hotel/max300/130511682.jpg?k=07a820097808b69c4491e89711c759ade79a65ff39edbe14c2708fbe11986a85&o=&hp=1',
  //     id: 5,
  //   },
  //   {
  //     src: 'https://ac-a.static.booking.cn/xdata/images/hotel/max300/134894574.jpg?k=99ac72ce2944fc72b4f930763fb085373b1b634c34979da27de7a79dc517a078&o=&hp=1',
  //     id: 6,
  //   },
  // ];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = index => {
    // console.log(index);
    setSlideNumber(index);
    setOpen(true);
  };

  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleMove = direction => {
    let newSlideNumber;
    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <Header type="list"></Header>
      {loading ? (
        'Loading'
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove('l')}></FontAwesomeIcon>
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove('r')}></FontAwesomeIcon>
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
              <span>{data.address}</span>
            </div>
            <div className="hotelDistance">
              <span>Great location – {data.distance}m from center</span>
            </div>
            <div className="hotelPriceHighLight">
              <span>Great for Two Travelers over {data.cheapestPrice}</span>
            </div>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImgWrapper" key={index}>
                  <img onClick={() => handleOpen(index)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>Top Location: Highly rated by recent guests (8.8)</span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList></MailList>
          <Footer></Footer>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}></Reserve>}
    </div>
  );
}
