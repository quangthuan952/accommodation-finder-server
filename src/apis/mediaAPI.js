
module.exports = (app) => {
  app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image).then((url) => res.send(url)).catch((err) =>  res.status(500).send(err))
  } )
  app.post("/uploadMultipleImages", (req, res) => {
    uploadMultipleImages(req.body.images).then((urls) => res.send(urls)).catch((err) =>  {
      res.status(500).send(err)
    })
  } )
}