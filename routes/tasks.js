import Router from 'express'
import Task from '../schemes/task.js'
import User from '../schemes/user.js'
import passport from 'passport'
import user from '../schemes/user.js'

const router = Router()


router.get('/',  async (req, res) => {
    try {
        const { user: { _id: userId } } = req;
        const usersTasks = await Task.find({userId});
        
        res.status(200).json(usersTasks);        
    } catch (err) {
        console.log(err.message)
        res.status(500).json("server error")
    }
})

router.delete('/:id',  async (req, res) => {
    try {
        const { params: { id }, user: { _id: userId } } = req;
        const bindWithUser = await Task.findOne({_id: id, userId});

        if(!bindWithUser) throw new Error("This data isn't yours.");

        const deletedTask = await Task.findByIdAndRemove(id);

        if(!deletedTask) throw new Error("Task isn't found.");

        const usersTasks = await Task.find({userId});
        res.status(200).send(usersTasks);
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})

router.post('/newTask', async (req, res) => {
    try {
        const { body: { text, checked }, user: { _id: userId } } = req;
        const task = new Task({
            text,
            checked,
            userId
        });
        console.log(task);

        const newTask = await task.save();
        const usersTasks = await Task.find({userId});

        res.status(201).json(usersTasks);
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { params: { id }, body: { checked }, user: { _id: userId } } = req;
        const bindWithUser = await Task.findOne({_id: id, userId});

        if(!bindWithUser) throw new Error("This data isn't yours.");

        const editedTask = await Task.updateOne({ _id: id }, { checked });
        const usersTasks = await Task.find({userId});

        res.status(200).send(usersTasks);
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})

router.patch('/', async (req, res) => {
    try {
    const { body: { checked }, headers: { authorization } } = req;
    const currentUser = await User.findOne({_id: authorization});

    if(!currentUser) throw new Error("User isn't authorized.");

    const editedTask = await Task.updateMany({ userId: authorization }, { "checked": checked });
    const usersTasks = await Task.find({userId: authorization});

    res.status(200).send(usersTasks);
} catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
}
})

export default router