// Return a uuid
const uuidv4 = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    char
  ) {
    const r = (Math.random() * 16) | 0;
    const v = char == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  /* // Cryptographically secure version
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )*/
};
module.exports.uuidv4 = uuidv4

module.exports.create_N_UUIDs = (numIds) => {
  const results = []
  for (let i = 0; i < numIds; i++) {
      let created = false
      while (!created) {
        const newId = uuidv4()
        const exists = results.some((val) => {
          return val === newId
        })
        if (!exists) {
          results.push(newId)
          created = true
        }
      }
  }
  return results
}

/**
 * Shuffles array in place. Fisher-Yates algo.
 * @param {Array} a items An array containing the items.
 */
module.exports.shuffle = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  return arr;
}
