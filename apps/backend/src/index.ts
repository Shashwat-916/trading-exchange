import express from 'express'
import cors from 'cors'
import { mainRouter } from './routers'
import { ErrorMiddleware } from './middlewares/errorMiddlewares'
import { MailWorker } from './routers/auth/worker'


const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use("/api/v1", mainRouter)
app.use(ErrorMiddleware)

app.listen(3001, () => {
    console.log("Server Started on PORT: 3001 ")
    MailWorker().catch(console.error)
})