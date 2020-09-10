const jwt = require('jsonwebtoken')


function auth(req,res,next){
    const authToken = req.headers['authorization']


    if(authToken != undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token,'sadasdhiaahacdihkanioabnliahlah8',(err,data)=>{
            if(err){
                res.status(401)
                res.json({erro:'Token inválido'})
            }else{
                req.token = token
                req.loggedUser = {id:data.id,email:data.email}
                console.log(data)
                next()
            }
        })
       
    }else{
        res.status(401)
        res.json({erro:'Token inválido}'})
    }
}

module.exports = auth