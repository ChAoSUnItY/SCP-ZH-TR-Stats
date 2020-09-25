exports.register = (req, res, auth) => {
    auth
    .createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        displayName: 'Test Account',
        diabled: false
    })
    .then(data => {
        console.log(data);
        res.json({ name: "secret" });
    })
    .catch(err => {
        console.log(err);
        res.send({ error: err});
    })
}