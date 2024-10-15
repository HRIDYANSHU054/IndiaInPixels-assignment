export function getColor(temp) {
  return temp > 45
    ? "#E31A1C"
    : temp > 35
    ? "#FEB24C"
    : temp > 25
    ? "#fff494"
    : temp > 15
    ? "#91BFDB"
    : temp > 5
    ? "#4575B4"
    : "#313695";
}
