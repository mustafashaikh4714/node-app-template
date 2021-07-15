import { App } from '@tsxp/core'
import { json, urlencoded } from 'express'
import { User } from './controllers/user'
import { Token } from './utils/token'

const app = new App({
  controllers: [User],
  middlewares: [json(), urlencoded({ extended: true })],
  context: async (req) => {
    const { user } = await Token.parse(req)
    return { user }
  }
})

app.listen()
