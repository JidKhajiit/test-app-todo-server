import Router from 'express'
const router = Router()


router.get('/test', (req, res) => {
    res.send({
        message: 'Node.js and Express REST API'
    })
})

router.post('/signup', (req, res) => {
    res.send({
        message: "Node jsdjfsdhfgsdjgjsd"
    })
});

router.post('/signin', (req, res) => {

})


export default router