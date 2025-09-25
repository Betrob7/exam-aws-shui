import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(6).required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
    .messages({
      "string.pattern.base": "Lösenordet måste innehålla minst en stor bokstav, en liten bokstav och en siffra.",
    })
    .required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("USER").default("USER"),
});
