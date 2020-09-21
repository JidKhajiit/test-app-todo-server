import Router from 'express'
import User from '../schemes/user.js'

const router = Router()


router.get('/test', (req, res) => {
    res.send({
        message: 'Node.js and Express REST API'
    })
})

router.post('/signup', async (req, res) => {
    const { body: { login, password, firstName, lastName } } = req;

    try {
        const isUserExist = await User.findOne({ login });
        console.log(isUserExist);

        if (isUserExist) throw new Error("User is already exist.");

        const user = new User({
            login,
            password,
            firstName,
            lastName
        });
        console.log(user);
        const newUser = await user.save();
        // console.log("Сохранен объект", newUser);
        res.status(201).json(newUser);
    } catch (err) {

        console.log(err.message)
        res.status(500).json(err.message)


    }


});

router.post('/signin', async (req, res) => {
    const { body: { login, password } } = req;

    try {
        const isUserExist = await User.findOne({ login });
        if (!isUserExist) {
            throw new Error("User isn't exist.")
        } else if (isUserExist.password !== password) {
            throw new Error("Wrong password. Ur mom will die!!!")
        } else {
            res.status(200).json(isUserExist)
        }

    } catch (err) {
        // console.log(err.message)
        if (err.message == "User isn't exist.") {
            res.status(400).json(err.message)
        } else if (err.message == "Wrong password. Ur mom will die!!!") {
            res.status(401).json(err.message)
        } else {
            res.status(500).json(err.message)
        }
        
    }
})


export default router