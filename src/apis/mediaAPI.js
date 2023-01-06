const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: "dqrn1uojt",
  api_key: "576117465363866",
  api_secret: "emepuvIzPD3M2jnqpx35mPPHP6o"
})

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto"
}

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if(result && result.secure_url) {
        return resolve(result.secure_url)
      }
      console.log('error.dđ',  error.message)
      return reject({message: error.message})
    })
  })
}

const uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    console.log('images', images)
    const uploads = images?.map(base => uploadImage(base))
    Promise.all(uploads).then((values) => resolve(values)).catch(err => reject(err))
  })
}

// module.exports = {
//   uploadImage,
//   uploadMultipleImages
// }
module.exports = (app) => {
  app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image).then((url) => res.send(url)).catch((err) =>  res.status(500).send(err))
  } )
  app.post("/uploadMultipleImages", (req, res) => {
    console.log('req', req)
    uploadMultipleImages(req.body.images).then((urls) => res.send(urls)).catch((err) =>  {
      console.log(err)
      res.status(500).send(err)
    })
  } )
}