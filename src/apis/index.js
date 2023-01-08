module.exports = (app) => {
  require('./postApi')(app)
  require('./authApi')(app)
  require('./userAPI')(app)
  require('./questionApi')(app)
  require('./mediaAPI')(app)
  require('./mediaAPI')(app)
}