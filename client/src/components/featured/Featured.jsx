import React from 'react';
import useFetch from '../../hooks/useFetch';
import './featured.scss';

export default function Featured() {
  const { data, loading, error } = useFetch('/hotels/countByCity?cities=Berlin,Madrid,London');
  // console.log(data);
  return (
    <div className="featured">
      {loading ? (
        'Loading please wait'
      ) : (
        <>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://ac-b.static.booking.cn/xdata/images/city/540x270/767068.webp?k=380a8e7bd3e2357a88d863b792668a0dfb0a324c8774aa6fcabd4fd9b645ce45&o="
              alt=""
            />
            <div className="featuredTitles">
              <h1>Shanghai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://ac-b.static.booking.cn/xdata/images/city/540x270/709883.webp?k=077b1a40c6a472de083f3a46c8736101d06c6d03e3e40fb30d2090207288591f&o="
              alt=""
            />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://ac-b.static.booking.cn/xdata/images/city/540x270/667263.webp?k=7940af7db25cc52f2ce378dd0c7bdc089c5aa97a18851e6cb8dd5099a8affabd&o="
              alt=""
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
