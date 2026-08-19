import express from 'express'
import { mainRouter } from './routers'


const app = express()
app.use(express.json())
app.use("/api/v1", mainRouter)

app.listen(3001, () => {
    console.log("Server Started on PORT: 3001 ")
})