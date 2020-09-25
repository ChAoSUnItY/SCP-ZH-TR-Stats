import { Request, Response } from 'express'

exports.test = (req: Request, res: Response) => {
    res.json({ STATUS: "ACPT" })
}