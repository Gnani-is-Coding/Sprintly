import { Router } from "express";  
import DB from "../../services/db";

const userRouter = Router()

userRouter.get("/", (_, res) => {
    const allUsersInDb = DB.getAllItems()

    res.send({data: allUsersInDb})
})

export default userRouter;