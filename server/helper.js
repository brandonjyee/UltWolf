const hw = require('hashwords')()

module.exports.hashStr = (str) => {
  return hw.hash(str).join('-')
}
