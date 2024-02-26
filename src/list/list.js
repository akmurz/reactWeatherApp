import "./list.css";
import sun from '../images/sun.png'
import moon from '../images/moon.png'
export function List({ city }) {
  return (
    <>
      {city.map((item, index) => {
        const cityTime = new Date(item.location.localtime).getHours();
        const isNight = cityTime >= 18 || cityTime < 5;
        return (
          <div key={index} className={isNight ? "parent night" : "parent day"}>
            <div className="region">
              <div className="name_r">{item.location.name}</div>
              <div className="republic">{item.location.region}</div>
              <div className="time">{item.location.localtime}</div>
            </div>
            <div className="temp">
              {isNight ? (
                <div className="moon-size"><img src={moon} className="moon" alt="Луна"/></div>
              ) : (
                <img src={sun} className="sun" alt="Солнце"/>
              )}
              <div className="temp_c">
                {item.current.temp_c}
                <span className="unit">°C</span>
              </div>
              <div className="temp_f">
                {item.current.temp_f}
                <span className="unit">°F</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
