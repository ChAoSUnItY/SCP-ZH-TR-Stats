exports.register = (req, res, db) => {
    res.send({
        message: `Hello ${req.body.email}! Your user was registered! Have fun!`
    })
    db.collection('account').doc().set(req.body)
}