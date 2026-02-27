import express from "express"
import userRegisterService from "../../services/userRegisterService";
import { loginservice } from "../../services/loginService";

// Route definitions only. Maps HTTP methods + paths to controller functions.

const authRouter = express.Router() 

// authRouter.post('/refresh', () => {
//         // Accesss token rotation logic in here.

// })

authRouter.post("/register", async (req, res) => {    
   await userRegisterService(req.body, res);  
});


authRouter.post("/login", async (req, res) => {
    await loginservice(req.body, res)
})



export default authRouter

// Just takes care of Route wiring.