import { useEffect } from "react";
import { useMap } from "react-leaflet";

function FlyMapTo({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom);
  });

  return null;
}

export default FlyMapTo;
