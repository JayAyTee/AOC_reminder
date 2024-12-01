function validateFormat(str) {
  if (str.length<3) return false;
  str.replace(/\s/g,":");
  if (!str.includes(":")) return false;
  let times = str.split(":");
  if (times.length<2) return false;
  let hours = parseInt(times[0]);
  let minutes = parseInt(times[1]);
  if (isNaN(hours) || isNaN(minutes)) return false;
  return 0 <= hours && hours < 24 && 0 <= minutes && minutes < 60;
}
function convertToCron(str) {
  if (!validateFormat(str)) return "0 12 * * *";
  str.replace(/\s/g,":");
  let times = str.split(":");
  if (times.length<2) return false;
  let hours = parseInt(times[0]);
  let minutes = parseInt(times[1]);
  return `${minutes} ${hours} * * *`;
}

module.exports = { validateFormat, convertToCron };