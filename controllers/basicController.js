module.exports = {
  index: (req, res) => {
    res.send("Ohayooo! nice to meet you!");
  },
  home: (req, res) => {
    res.json({
      message: "Welcome to my API!",
    });
  },
  about: (req, res) => {
    res.json({
      name: "ihsan",
      job: "student",
    });
  },
};
