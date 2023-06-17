const GetTime = (givenTime = null) => {
  let today = new Date();
  if (givenTime) {
    today = new Date(givenTime);
  }
  let time =
    today.getHours() +
    "H:" +
    today.getMinutes() +
    "M:" +
    today.getSeconds() +
    "S";
  return time;
};

export default GetTime;
