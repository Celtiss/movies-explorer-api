const patternUrlImg = (/(^(https?:\/\/)?(www\.)?[^/\s]+\.[^/\s]+(\/[^/\s]*)*#?$)/);
const patternUrlLink = (/(^(https?:\/\/)?(www\.)?[^/\s]+\.[^/\s]+(\/[^/\s]*)*#?$)/);
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
module.exports = { patternUrlImg, patternUrlLink, emailRegex };
