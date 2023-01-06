module.exports = (app) => {
  require('./postApi')(app)
  require('./authApi')(app)
  require('./profileAPI')(app)
  require('./questionApi')(app)
  require('./mediaAPI')(app)
}