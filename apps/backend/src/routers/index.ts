import  {Router} from "express"
import { authRouter } from "./auth/route"
import { tickerRouter } from "./ticker/route"

export const mainRouter = Router()

mainRouter.use("/auth",authRouter)
mainRouter.use("/ticker",tickerRouter)