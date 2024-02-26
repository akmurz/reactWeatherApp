import "./App.css";
import { baseURL } from "./api/api";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { List } from "./list/list";

function App() {
  const [input, setInput] = useState("");
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState(null)
  const fetchData = async () => {
    try {
      let response = await fetch(`${baseURL}${input}`);
      if(!response.ok){
        throw new Error('City not found');
      }
      let city = await response.json();
      setCityList([...cityList, city]);
      setInput('')
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  };

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="block">
            <div className="sub-block">
              <div className="weather">Weather</div>
              <input
                className="search"
                onKeyDown={pressEnter}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Search for a city"
              />
              {error && <div className="error-message">{error}</div>} 
              {cityList.length > 0 && !error && <List city={cityList} />} 
            </div>
            <div>
              <CiSearch className="img" onClick={fetchData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
