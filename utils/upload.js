const AWS = require('aws-sdk');

module.exports = (buffer, { accessKeyId, secretAccessKey, bucket, server }) => {
    AWS.config.update({ accessKeyId, secretAccessKey });
    const s3 = new AWS.S3( { params: { Bucket: bucket, timeout: 6000000 } });

    const key = `canvas-${new Date().getTime()}.jpg`;
    console.log('key', key);
    return s3.putObject({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ACL: 'public-read'
    })
    .promise()
    .then(() => {
        console.log('Successfully uploaded image.', `${server}/${bucket}/${key}`);
        return `${server}/${bucket}/${key}`;
    }).catch(err => {
      console.log('Error uploading to S3: ', err);
      return err.message;
    });
};