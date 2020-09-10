const User = require('../../model/User')
const jwt = require('jsonwebtoken')

const jwtScret="sadasdhiaahacdihkanioabnliahlah8"

module.exports = {
    async create(req, res) {
        const { name, email, password } = req.body
        if (name == undefined || name == '' || email == undefined || email == '' || password == undefined || password == '') {
            res.sendStatus(400)
        } else {
            try {
                await User.create({
                    name,
                    email,
                    password
                })
                res.sendStatus(200)
            } catch (error) {
                console.log(error)
            }
        }
    },
    async auth(req, res) {
        const { email, password } = req.body
console.log(email,password)
        if (email == undefined || email == '' || password == undefined || password == '') {
            res.status(400)
            res.json({erro:'email inválido'})
        }else{
            const user = await User.findOne({where:{email}})
            console.log(user)
            if(user == undefined){
                res.status(404)
                res.json({erro:'email nao cadastrado'})
            }else{
                if(user.password == password){
                    
                    jwt.sign({id:user.id,email:user.email},jwtScret,{expiresIn:'48h'},(err,token)=>{
                        if(err){
                            res.status(400)
                            res.json({erro:'falha interna'})
                        }else{
                            res.status(200)
                            res.json({token})
                        }
                    })

                }else{
                    res.status(401)
                    res.json({erro:' credencias invalidas'})
                }
            }
        }
    }
}