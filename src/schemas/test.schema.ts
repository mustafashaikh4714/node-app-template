import joi from 'joi'

export const UserSchema = joi.object({
  username: joi.string().required()
})

export const CreateUserSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().required()
})

// export default { PasswordSchema, LoginSchema, SignupSchema }
