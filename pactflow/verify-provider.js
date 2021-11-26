const path = require('path')
const { Verifier } = require('@pact-foundation/pact')
const { startServer } = require('./provider')

startServer(8081, async (server) => {
  console.log('Server is running on http://localhost:8081')

  try {
    await new Verifier({
      providerBaseUrl: 'http://localhost:8081',
      pactUrls: [path.resolve(__dirname, '../pacts/responsiveapiclient-gqlquestionsapi.json')],
    }).verifyProvider()
  } catch (error) {
    console.error('Error: ' + error.message)
    process.exit(1)
  }

  server.close()
})