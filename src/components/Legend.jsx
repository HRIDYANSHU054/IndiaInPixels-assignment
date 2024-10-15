import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import { getColor } from "../utils/getColor";

function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");

      let labels = [
        {
          value: 0,
          label: "Below 5°C",
        },
        { value: 10, label: "5°C to 15°C" },
        { value: 20, label: "15°C to 25°C" },
        { value: 30, label: "25°C to 35°C" },
        { value: 40, label: "35°C to 45°C" },
        { value: 50, label: "Above 45°C" },
      ];

      div.innerHTML = "<h4>Today's Heats</h4>";

      for (let i = 0; i < labels.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(labels[i].value) +
          '"></i> ' +
          labels[i].label +
          "<br>";
      }

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

export default Legend;
