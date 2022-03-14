const { user } = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// -------------------- REGISTER --------------------

exports.register = async ( req, res) => {
    try {

        const { email, password } = req.body
        const data = req.body

        const schema = Joi.object({
            fullName: Joi.string().min(3).required(),
            email: Joi.string().email().min(6).required(),
            password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{6,30}$/)
            .required(),
        });
    
        const { error } = schema.validate(data);
    
        if (error) {
            return res.send({
                status: "Validation Failed",
                message: error.details[0].message,
            });
        }

        const emailExist = await user.findOne({
            where: { email }
        })

        if(emailExist){
            res.status(500).send({
                status: 'Failed',
                message: 'Email already registered !'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const dataUser = await user.create({
            ...data,
            password: hashedPassword
        })

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(
            {
                id: dataUser.id,
                role: dataUser.role
            },
            secretKey
        )

        res.status(200).send({
            status: 'Success',
            data: {
                user: {
                    email: dataUser.email,
                    fullName: dataUser.fullName,
                    role: dataUser.role,
                    token
                }
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

// -------------------- LOGIN --------------------

exports.login = async ( req, res ) => {
    try {
        
        const { email, password } = req.body
        const path = process.env.PATH_UPLOAD

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })

        const { error } = schema.validate(req.body);
      
        if (error) {
            return res.send({
                status: "Validation failed",
                message: error.details[0].message,
            });
        }

        const emailExist = await user.findOne({
            where: { email }
        })

        if(!emailExist){
            return res.send({
                status: 'failed',
                message: "Email and Password don't match"
            })
        }

        const isValid = await bcrypt.compare(password, emailExist.password)

        if (!isValid) {
            return res.send({
                status: 'failed',
                message: "Email and Password don't match"
            })
        }

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(
            {
                id: emailExist.id,
                role: emailExist.role
            },
            secretKey
        )

        res.status(200).send({
            status: 'Success',
            data: {
                user: {
                    id: emailExist.id,
                    fullName: emailExist.fullName,
                    email: emailExist.email,
                    avatar: path + emailExist.avatar,
                    role: emailExist.role,
                    token
                }
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

// -------------------- CHECK AUTH --------------------

exports.authUser = async ( req, res ) => {
    try {

        const path = process.env.PATH_UPLOAD
        const { userId } = req

        const dataUser = await user.findOne({
            where: {
                id: userId
            },
            attributes: {
                exclude: ["createdAt", "updateAt", "password"]
            }
        })

        if(!dataUser){
            return res.status(404).send({
                status: 'Failed',
                message: 'user not found'
            })
        }

        res.status(200).send({
            status: 'Success',
            data: {
                user: {
                    id: dataUser.id,
                    fullName: dataUser.fullName,
                    email: dataUser.email,
                    avatar: path + dataUser.avatar,
                    role: dataUser.role
                }
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
