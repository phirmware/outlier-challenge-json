const fileHelper = require('./helpers/file');
const utils = require('./helpers/utils');

module.exports = {
  getHealth,
  createStudentScore,
  getStudentScore,
  deleteStudentScore,
}

async function getHealth(req, res, next) {
  res.json({ success: true })
}

async function createStudentScore(req, res, next) {
  try {
    const postData = utils.createObjectFromParams(req.params[0], req.body);
    const { studentId } = req.params;
    const data = await fileHelper.writeToFile(studentId, postData);
    if (!data) {
      return res.status(500).json({ status: false });
    }
    res.json({ message: 'Success', data });
  } catch (error) {
    res.status(500).json({ message: 'Somthing went wrong', status: false });
  }
}

async function getStudentScore(req, res, next) {
  try {
    const { studentId } = req.params;
    const path = req.params[0];
    const deepPath = path.replace(/\//g, '.');
    const data = await fileHelper.readFile(studentId);
    if (!path) {
      return res.json(data);
    }
    const result = utils.resolveObjectPath(deepPath, data);
    if (!result) {
      return res.status(404).json({ message: 'Property does not exist' });
    }
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ message: 'Somthing went wrong', status: false });
  }
}

async function deleteStudentScore(req, res, next) {
  try {
    const { studentId } = req.params;
    const path = req.params[0];
    const deepPath = path.replace(/\//g, '.');
    const fileData = await fileHelper.readFile(studentId);
    const result = utils.resolveObjectPath(deepPath, fileData)
    if (!result) {
      return res.status(404).json({ message: 'Property does not exist' });
    }
    const postData = utils.createObjectFromParams(path, {});
    const data = await fileHelper.writeToFile(studentId, postData);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Somthing went wrong', status: false });
  }
}

