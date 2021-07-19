exports.genToken = (length = 5) => {
  let token = "";
  for (let i = 0; i < length; i++) {
    token += Math.round(Math.random() * 10);
  }
  return token;
};
