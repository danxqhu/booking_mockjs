import React from 'react';
import useFetch from '../../hooks/useFetch';
import './FeaturedProperties.scss';

export default function FeaturedProperties() {
  const { data, loading, error } = useFetch('/hotels?featured=true&limit=100');
  return (
    <div className="fp">
      {loading ? (
        'Loading'
      ) : (
        <>
          {data.map(item => (
            <div className="fpItem" key={item._id}>
              <img
                // src="https://ac-a.static.booking.cn/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from CNY {item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* <div className="fpItem">
        <img
          src="https://ac-a.static.booking.cn/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
          alt=""
          className="fpImg"
        />
        <span className="fpName">Aparthotel Stare Miasto</span>
        <span className="fpCity">Kraków</span>
        <span className="fpPrice">Starting from CNY 565</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://ac-a.static.booking.cn/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
          alt=""
          className="fpImg"
        />
        <span className="fpName">Aparthotel Stare Miasto</span>
        <span className="fpCity">Kraków</span>
        <span className="fpPrice">Starting from CNY 565</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://ac-a.static.booking.cn/xdata/images/hotel/max500/103951224.jpg?k=03736dd4e1e89c1132e4957149e394d01ac6e8f64f4b09e30ade97a6176f0640&o="
          alt=""
          className="fpImg"
        />
        <span className="fpName">Aparthotel Stare Miasto</span>
        <span className="fpCity">Kraków</span>
        <span className="fpPrice">Starting from CNY 565</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div> */}
    </div>
  );
}
