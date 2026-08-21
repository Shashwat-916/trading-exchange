import { Router } from "express";

export const tickerRouter = Router()

tickerRouter.get("/get-tickers", async (req, res) => {
    
    res.json({})
})
