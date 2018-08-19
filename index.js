const createGrid = require('./utils/createGrid');
const Jimp = require('jimp');
const upload = require('./utils/upload');

/**
 * @param {Object} params
 * @param {Number} params.columns
 * @param {Number} params.rows
 * @param {Number} params.ppi
 * @param {String} params.inputFolder
 * @param {Number} params.diameterMM
 */
module.exports = (awsConfig) => {

  return {
    async run (params) {
      const canvas = await createGrid(params);
    
      // get buffer for upload
      const buffer = await new Promise( (resolve, reject) => {
        canvas.getBuffer(Jimp.MIME_JPEG, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      })
      const url = await upload(buffer, awsConfig)
    
      return {
        image: url,
        error: false
      };
    }
  }
};
