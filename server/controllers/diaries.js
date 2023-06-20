const Diary = require("../models/diary");

exports.getDiary = async (req, res, next) => {
  try {
    const diary = new Diary();
    diary.userId = req.user.id;
    diary.date = req.body.date;
    const success = await diary.getOneDiary();
    if (success) {
      res.status(200).json({
        items: diary.items,
      });
    } else {
      res.status(200).json({
        items: [{calories: 0, name: ""}],
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getTenDiaries = async (req, res, next) => {
  try {
    const diary = new Diary();
    diary.userId = req.user.id;
    diary.date = req.body.date;
    const diaries = await diary.getTenDiaries();
    res.status(200).json({
      diaries: diaries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
};

exports.saveItemToDiary = async (req, res, next) => {
  const diary = new Diary();
  diary.userId = req.user.id;
  diary.date = req.body.date;
  diary.saveItemToDiary();
};
