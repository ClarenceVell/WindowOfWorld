const { user } = require('../../models')

// -------------------- GET USERS --------------------

exports.getUsers = async ( req, res) => {
    try {

        const path = process.env.PATH_UPLOAD

        let users = await user.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
            }
        })

        users = JSON.parse(JSON.stringify(users)); 

        users = users.map((item)=> {
            return {
                ...item,
                avatar : path + item.avatar
            }
        })

        res.status(200).send({
            status: 'Success',
            data: {
                users
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

// -------------------- GET USER BY ID --------------------

exports.getUser = async ( req, res ) => {
    try {

        const { id } = req.params
        const path = process.env.PATH_UPLOAD

        let findUser = await user.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
            }
        })

        if(!findUser){
            return res.status(404).send({
                message: 'User Not Found'
            })
        }


        findUser = JSON.parse(JSON.stringify(findUser)); 

        findUser = {
            ...findUser,
            avatar: path + findUser.avatar
        }

        res.status(200).send({
            status: 'Success',
            data: {
                user : findUser
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

// -------------------- EDIT PROFILE USER --------------------

exports.updateProfile = async ( req, res ) => {
    try {

        const { id } = req.params;
        const body = req.body;
        const path = process.env.PATH_UPLOAD

        const findUser = await user.findOne({ where: { id } });

        if (!findUser) {
            return res.status(404).send({
                status: "Error",
                message: "user not found",
            });
        }
    
        const dataUpdated = {
            ...body,
            avatar : req.files.avatar[0].filename
        };

        const data = await user.update(dataUpdated, {
            where : { id }
        })

        let updateUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "password"],
            },
        });

        updateUser = JSON.parse(JSON.stringify(updateUser)); 

        updateUser = {
            ...updateUser,
            avatar : path + updateUser.avatar
        }
        
        res.status(200).send({
            status: "success",
            data: { user: updateUser },
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- DELETE USER --------------------

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const findPerson = await user.findOne({
            where: { id }
        })

        if(!findPerson){
            return res.status(404).send({
                status: "Failed",
                message: "User not found"
            })
        }

        const data = await user.destroy({
            where: { id }
        })

        res.status(200).send({
            status: "Success",
            id : id
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message:"server error"
        })
    }
}