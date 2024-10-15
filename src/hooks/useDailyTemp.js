import { useEffect, useState } from "react";

function useDailyTemp(API_BASE, dataCoords, initState = []) {
  const [data, setData] = useState(initState ?? []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchStateTemp(lat, lon, stateName) {
        const tempResp = await fetch(`${API_BASE}lat=${lat}&lon=${lon}`);
        const tempData = await tempResp.json();
        return { id: stateName, weather: tempData.daily.data[0] };
      }

      async function fetchAllStatesTemp() {
        try {
          setIsLoading(true);

          const tempPromisies = dataCoords.map((state) => {
            //destructure
            const {
              id: stateName,
              coords: { lng: lon, lat },
            } = state;
            return fetchStateTemp(lat, lon, stateName);
          });

          const promisedResult = await Promise.allSettled(tempPromisies);

          setData(promisedResult.map((data) => data.value));
        } catch (error) {
          console.log(
            "error While getting initial state temp data:",
            error.message
          );
        } finally {
          setIsLoading(false);
        }
      }

      fetchAllStatesTemp();
    },
    [API_BASE, dataCoords]
  );

  return { data, isLoading };
}

export default useDailyTemp;
