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
  const {date, item} = req.body;

  diary.userId = req.user.id;
  diary.date = date;
  diary.item = item;
  try {
    const id = await diary.saveItemToDiary();
    if (id) {
      res.status(200).json({
        _id: id,
      });
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateItem = async (req, res, next) => {
  const diary = new Diary();
  const {item, date} = req.body;

  try {
    diary.userId = req.user.id;
    diary.item = item;
    diary.date = date;
    console.log("id", diary.item._id);
    diary.updateItem();
    res.status(200).json();
  } catch (error) {
    console.error(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  const diary = new Diary();
  const _id = req.body._id;
  diary.userId = req.user.id;
  diary.date = req.body.date;
  diary.item = {_id: _id};
  const success = await diary.deleteItem();
  if (success) {
    res.status(200).json();
  } else {
    res.status(400).json();
  }
};
