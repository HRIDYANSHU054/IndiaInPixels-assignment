import { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import "./MapStyles.css";
import statesData from "../data/IndiaStatesAndUT.geojson.json";
import { getStateTempColor } from "../utils/getStateTempColor";
import MapPrint from "./MapPrint";
import StateMap from "./StateMap";
import FlyMapTo from "./FlyMapTo";
import Legend from "./Legend";

export default function CountryMap({ initTempData }) {
  const zoomedState = useRef(null); //ref is the simplest solution I can find to bypass the closure issue. States are not at all helpful and will remain stale
  const geoJsonRef = useRef(null);
  const [stateInfo, setStateInfo] = useState(null);

  const [districtData, setDistrictData] = useState(null);

  async function loadDistrictData(state) {
    // if (state !== "Madhya Pradesh") return;
    try {
      setDistrictData(null); //

      const formattedState =
        state === "Dadra and Nagar Haveli and Daman and Diu"
          ? "dnh-and-dd"
          : state.toLowerCase().replace(/\s+/g, "-");

      //dynamically load the clicked state's district geojson
      const data = await import(
        `../data/states/${formattedState}.geojson.json`
      );

      // Set the district data into state
      setDistrictData(data.default);
    } catch (error) {
      console.log("Error loading district data:", error);
    }
  }

  function resetDistrictData() {
    setDistrictData(null);
    setStateInfo(null);
  }

  function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      // color: "#666",
      color: "#f8ff25",
      dashArray: "",
      fillOpacity: 0.7,
    });
    layer.bringToFront();
  }

  function resetHighlight(e) {
    geoJsonRef.current.resetStyle(e.target); // Reset the style for the layer
  }

  function zoomMap(e) {
    const state = e.target?.feature?.properties.st_nm;
    const map = e.target?._map;

    if (!map || !state) return;
    //lets check if the state is already zoomed up

    if (state == zoomedState.current) {
      // if it is then zoom out and go back to center map position on India and zoom level to init lebel
      map.setView([20.5937, 78.9629], 4);

      zoomedState.current = null;
      setStateInfo(null);

      resetDistrictData();
      return;
    }

    map.fitBounds(e.target.getBounds()); // Zoom to the bounds of the clicked state
    zoomedState.current = state;

    setStateInfo(() => {
      setTimeout(() => {
        //load the district data for this state
        loadDistrictData(state);
      }, 500);
      return state;
    });
  }

  const onEachFeature = useCallback((feature, layer) => {
    layer.bindTooltip(feature.id, {
      sticky: true,
    });

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomMap,
    });
  }, []);

  const onEachFeatureOfState = useCallback((feature, layer) => {
    layer.bindTooltip(feature.properties.st_nm, {
      sticky: true,
    });

    layer.on({
      click: districtData ? resetDistrictData : zoomMap,
    });
  }, []);

  const displayMap = useMemo(
    function () {
      const style = (feature) => {
        return {
          fillColor: getStateTempColor(feature.properties.st_nm, initTempData),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "5",
          fillOpacity: 0.7,
        };
      };

      return (
        <MapContainer center={[22, 48]} className="map__map" zoom={1}>
          <TileLayer
            // other similar options from cartocdn dark_nolabels and rastertiles/voyager_nolabels
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <GeoJSON
            ref={geoJsonRef}
            data={statesData}
            style={style}
            onEachFeature={onEachFeature}
          />

          {districtData && (
            <StateMap
              data={districtData}
              initTempData={initTempData}
              onEachFeature={onEachFeatureOfState}
            />
          )}

          {!districtData && !stateInfo && (
            <FlyMapTo center={[20.5937, 78.9629]} zoom={4} />
          )}
          <Legend />

          {/* Print Options */}
          <MapPrint
            position="topleft"
            sizeModes={["Current", "A4Portrait", "A4Landscape"]}
            hideControlContainer={false}
            title="Print"
          />
          <MapPrint
            position="topleft"
            sizeModes={["Current", "A4Portrait", "A4Landscape"]}
            hideControlContainer={false}
            title="Export as PNG"
            exportOnly
          />
        </MapContainer>
      );
    },
    [onEachFeature, districtData]
  );

  return (
    <>
      <div className="info placement__info-box">
        <h4>Temperature Today</h4>
        {stateInfo ? (
          <>
            <p>
              <strong>{stateInfo}</strong>
            </p>
            {
              <p>
                {initTempData.filter((data) => data?.id === stateInfo)?.[0]
                  ?.weather?.summary ?? `Could not fetch data`}
              </p>
            }
          </>
        ) : (
          "Click on a state"
        )}
      </div>
      {displayMap}
    </>
  );
}
