import { Request, Response } from 'express'

export default {
    test(req: Request, res: Response) {
        res.json({ STATUS: "ACPT" })
    }
}