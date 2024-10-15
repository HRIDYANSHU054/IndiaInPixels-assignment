import { getColor } from "./getColor";

export function getStateTempColor(stName, tempData) {
  if (!stName || !tempData.length) return getColor(30);

  const state = tempData.filter((data) => data?.id === stName);
  if (!state || !state.length) {
    console.log("This state's  data was not found", stName);
    return getColor(30);
  }

  const temp = state[0].weather.all_day.temperature;

  return getColor(temp);
}
