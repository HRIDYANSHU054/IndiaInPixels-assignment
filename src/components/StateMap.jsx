import { GeoJSON } from "react-leaflet";
import { getStateTempColor } from "../utils/getStateTempColor";

function StateMap({ data, onEachFeature, initTempData }) {
  const style = (feature) => {
    return {
      fillColor: getStateTempColor(feature.properties.st_nm, initTempData),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  return <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />;
}

export default StateMap;
