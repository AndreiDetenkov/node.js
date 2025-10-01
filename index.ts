import express, {Request, Response, NextFunction} from 'express'
import {userRouter} from "./users/users.js";

const port = 8000
const app = express()

app.use('/users', userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('=== err === ', err)
  res.status(401).send('Unauthorized')
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
