import CountryMap from "./components/CountryMap";
import Loading from "./components/Loading";
import { stateCoords } from "./data/IndianStatesAndCoords";
import useDailyTemp from "./hooks/useDailyTemp";

const API_KEY = import.meta.env.VITE_WEATHER_API;
const API_BASE = `https://www.meteosource.com/api/v1/free/point?sections=current%2Cdaily&language=en&units=auto&key=${API_KEY}&`;
// lat=${lat}&lon=${lng}
console.log(API_KEY);
function App() {
  const { data: dailyTemp, isLoading } = useDailyTemp(API_BASE, stateCoords);

  return (
    <>
      <h1 className="heading--main">IndiaInPixels Assignment</h1>
      <div className="map__container">
        {isLoading ? <Loading /> : <CountryMap initTempData={dailyTemp} />}
      </div>
    </>
  );
}

export default App;
