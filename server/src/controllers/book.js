const { book } = require('../../models')

// -------------------- ADD BOOK --------------------

exports.addBook = async ( req, res ) => {
    try {
        const { body } = req

        const cover= req.files.cover[0].filename
        const bookFile= req.files.bookFile[0].filename

        // console.log(req.files)

        await book.create({
            ...body,
            cover,
            bookFile
        })

        res.status(200).send({
            status: 'Success',
            data: {
                book: { ...body, cover, bookFile }
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- DELETE BOOK --------------------

exports.deleteBook = async ( req, res) => {
    try {

        const { id } = req.params

        await book.destroy({
            where: { id }
        })

        res.status(200).send({
            status: 'Success',
            id : id
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- GET BOOKS --------------------

exports.getBooks = async (req, res) => {
    try {

        const path = process.env.PATH_UPLOAD

        let data = await book.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt' ]
            }
        })

        data = JSON.parse(JSON.stringify(data));

        data = data.map((item) => {
            return {
                ...item,
                cover: path + item.cover,
                bookFile: path + item.bookFile
            }
        })

        res.status(200).send({
            status: 'Success',
            data: {
                books: data
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- GET DETAIL BOOK --------------------

exports.getBook = async ( req, res ) => {
    try {

        const path = process.env.PATH_UPLOAD
        const { id } = req.params

        let findBook = await book.findOne({
            where: { id },
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })

        findBook = JSON.parse(JSON.stringify(findBook));

        findBook = {
            ...findBook,
            cover: path + findBook.cover,
            bookFile: path + findBook.bookFile
        }
        
        res.status(200).send({
            status: 'Success',
            data: {
                detail: findBook 
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- UPDATE BOOK --------------------

exports.updateBook = async ( req, res ) => {
    try {
        const { body } = req
        const { id } = req.params
        const path = process.env.PATH_UPLOAD

        let findBook = await book.findOne({
            where: { id }
        })

        if (!findBook){
            res.status(404).send({
                message: 'Book Not Found'
            })
        }

        let data = {
            ...body,
            cover: req?.files?.cover[0]?.filename,
            bookFile: req?.files?.bookFile[0]?.filename
        }

        console.log(data)

        let updateBook = await book.update(data, {
            where: { id }
        })

        let bookUpdated = await book.findOne({
            where : { id },
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })

        bookUpdated = JSON.parse(JSON.stringify(bookUpdated));

        bookUpdated = {
            ...bookUpdated,
            cover : path + bookUpdated.cover,
            bookFile: path + bookUpdated.bookFile
        }

        res.status(200).send({
            status: 'Success',
            data: bookUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}
