import { Request, Response } from 'express'
import adm from 'firebase-admin'

export default {
    register(req: Request, res: Response, auth: adm.auth.Auth) {
        auth
            .createUser({
                email: req.body.email,
                emailVerified: false,
                password: req.body.password,
                displayName: req.body.displayName,
                disabled: false
            })
            .then(data => {
                console.log(data);
                res.json({ name: "secret" });
            })
            .catch(err => {
                switch (err.errorInfo.code) {
                    case 'auth/email-already-exists':
                        res.send({ error: 'ALREADY_EXISTS' })
                        break;
                    default:
                        break;
                }
            })
    },
    link(req: Request, res: Response, store: adm.firestore.Firestore) {
        store
            .collection('linkages')
            .doc(req.body.uid)
            .set({ wikidotUsername: req.body.wikidotUsername })
        res.send({ success: 'Link request is accepted and excuted!'})
    },
    getAccount(req: Request, res: Response, store: adm.firestore.Firestore) {
        store
            .collection('linkages').doc(req.query.uid as string)
            .get()
            .then(doc => {
                res.json({
                    wikidotUsername: doc.data().wikidotUsername,
                    avatarURL: ''
                })
            }).catch(err => {
            console.log(err)
            })
    }
}