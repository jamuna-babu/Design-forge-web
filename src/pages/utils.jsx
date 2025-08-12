export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
// Backend might send 'lighter', 'bold', etc.
const weightMap = {
  lighter: 300,
  normal: 400,
  bold: 700,
  bolder: 900,
};

export function getNumericWeight(weight) {
  console.log(weight);
  // If backend sends a number (string or number)
  if (!isNaN(weight)) {
    return parseInt(weight, 10);
  }
  let weight_case = weight.toLowerCase();
  // If backend sends one of the keywords
  if (weightMap[weight.toLowerCase()]) {
    return weightMap[weight.toLowerCase()];
  }
  // Default fallback
  return 400;
}
