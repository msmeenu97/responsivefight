const assert = require('assert')
const { Pact, Matchers } = require('@pact-foundation/pact')
const { fetchUserStage } = require('./consumer')
const { extractPayload } = Matchers

describe('Pact with BFF API', () => {
  const provider = new Pact({
    port: 8081,
    consumer: 'ResponsiveApiClient',
    provider: 'GqlQuestionsApi',
  })

  before(() => provider.setup())

  after(() => provider.finalize())

  describe('when a call to the API userstage is made', () => {
    before(async () => {
      return provider.addInteraction({
        state: 'User stage',
        uponReceiving: 'a request for userstage',
        withRequest: {
          path: '/api/userstage',
          method: 'GET',
          query: 'user=name',
        },
        willRespondWith: {
          body: extractPayload({stage: 'news_1'}),
          status: 200,
        },
      })
    })
    
    it('will receive the stage for the user', async () => {
      const result = await fetchUserStage()
      assert.ok(result)
    })
  })
})