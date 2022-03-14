
const { bookList, user, book } = require('../../models')

// -------------------- ADD BOOK LIST --------------------

exports.addList = async ( req, res ) => {
    try {
        const id = req.userId
        const {idBook} = req.body

        const data = await bookList.create({
            idUser : id,
            idBook
        })

        res.status(200).send({
            status: 'Success',
            message: `user ${id} add book id ${idBook} to the list`
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- GET BOOK LIST --------------------

exports.myList = async ( req, res ) => {
    try {

        const { userId } = req
        const path = process.env.PATH_UPLOAD

        let list = await user.findAll({
            where: {
                id: userId
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "password"],
            },
            include: [
                {
                    model: book,
                    as: 'book',
                    attributes: {
                        exclude: ["updatedAt", "createdAt"],
                    },
                    through: {
                        model: bookList,
                        as: 'bridge',
                        attributes: []
                    }
                }
            ]
        })

        list = list[0].book

        list = JSON.parse(JSON.stringify(list));

        list = list.map((item) => {
            return {
                ...list[0].book,
                id: item.id,
                title: item.title,
                author: item.author,
                cover: path + item.cover,
                // bookFile: path + item.bookFile
            }
        })

        res.status(200).send({
            status: 'Success',
            myList: list
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

