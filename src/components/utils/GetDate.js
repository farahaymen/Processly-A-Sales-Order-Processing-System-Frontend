const GetDate = (givenDate = null) => {
  let today = new Date();
  if (givenDate) {
    today = new Date(givenDate);
  }
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  return date;
};

export default GetDate;
