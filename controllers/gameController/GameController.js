const Game = require('../../model/Game')


module.exports = {
    async index(req, res) {  
        const games = await Game.findAll()

     
        

        res.statusCode = 200
        res.json(games)
    },
    async show(req, res) {

        if (!isNaN(req.params.id)) {
            let id = parseInt(req.params.id)
            try {
                let HATEOAS = [
                    {
                        href:"http://localhost:3333/games/"+id,
                        method:'DELETE',
                        rel:"delete_game"
                    },
                    {
                        href:"http://localhost:3333/games/"+id,
                        method:'GET',
                        rel:"get_game"
                    },
                    {
                        href:"http://localhost:3333/auth",
                        method:'POST',
                        rel:"login"
                    }
                ]
        
                const game = await Game.findByPk(id)

                if (game != undefined) {
                    res.statusCode = 200
                    res.json({game,_links:HATEOAS})
                } else {
                    res.sendStatus(404)
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            res.sendStatus(400)
        }
    },
    async create(req, res) {
        const { title, year, price ,coverUrl} = req.body
        if (title == undefined || year == undefined || price == undefined) {
            res.sendStatus(400)
        } else {
            try {
                await Game.create({
                    coverUrl,
                    title,
                    year,
                    price
                })
                res.sendStatus(200)
            } catch (error) {
                console.log(error)
            }
        }

    },
    async update(req, res) {
        let { id } = req.params
        const { title, year, price } = req.body

        if (isNaN(id)) {
            res.sendStatus(400)
        } else {
            id = parseInt(id)

            const gameupdt = await Game.update({
                title,
                year,
                price
            },
                { where: { id } })
            if (gameupdt == 0) {
                res.sendStatus(404)
            } else {
                res.sendStatus(200)
            }
        }
    },
    async destroy(req, res) {
        if (isNaN(req.params.id)) {
            res.sendStatus(400)
        } else {
            let id = parseInt(req.params.id)

            let gameDel = await Game.destroy({ where: { id } })
            if (gameDel === 0) {
                res.sendStatus(404)
            } else {
                res.sendStatus(200)
            }

        }
    }
}