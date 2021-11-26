const http = require('http')
const url = require('url')

const server = http.createServer(async (req, res) => {
  const route = url.parse(req.url).pathname

  try {
    if (route === '/api/userstage') {
      const userstage = {"stage": "string"};
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(userstage))
    }
  } catch (error) {
    res.writeHead(500).end()
  }
})

module.exports = {
  startServer: (port, cb) => {
    server.listen(port, () => {
      cb(server)
    })
  },
}