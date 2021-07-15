import { Request } from 'express'
import jwt from 'jsonwebtoken'

type U = any

interface UserPayload {
  id: string
  email: string
  userType?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

export class Token {
  static sign(payload: Record<string, U>) {
    const JWT_KEY = process.env.JWT_KEY!

    return jwt.sign({ ...payload }, JWT_KEY)
  }

  static verify(token: string): Promise<U> {
    const JWT_KEY = process.env.JWT_KEY!

    return new Promise((res, rej) => {
      jwt.verify(token, JWT_KEY, (err, decoded?: U) => {
        if (err) {
          return rej(err)
        }
        res(decoded)
      })
    })
  }

  static async parse(req: Request): Promise<{ user?: Request['user'] }> {
    let token = req.headers.authorization
    if (!token) {
      return {}
    }

    token = token.split(' ')[1]
    if (!token) {
      return {}
    }

    try {
      const payload = await Token.verify(token)

      const user = { ...payload, userType: 'user' }

      return { user }
    } catch (err) {
      return {}
    }
  }
}
