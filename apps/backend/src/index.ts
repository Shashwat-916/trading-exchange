import express from 'express'
import { mainRouter } from './routers'
import { ErrorMiddleware } from './middlewares/errorMiddlewares'


const app = express()

app.use(express.json())
app.use("/api/v1", mainRouter)
app.use(ErrorMiddleware)

app.listen(3001, () => {
    console.log("Server Started on PORT: 3001 ")
})