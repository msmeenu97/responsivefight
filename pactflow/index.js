const { startServer } = require('./provider')

startServer(8081, () => {
  console.log('Server is running on http://localhost:8081')
})