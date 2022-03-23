const { user, transaction } = require('../../models')

const cron = require("node-cron")

// -------------------- ADD TRANSACTION --------------------

exports.addSubs = async ( req, res ) => {
    try {

        const { userId } = req
        const { body } = req

        const data = await transaction.create({
            ...body,
            idUser: userId,
            transferProof: req.files.transferProof[0].filename
        })

        res.status(200).send({
            status: 'Success',
            data
        })
        
    } catch (error) { 
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- GET TRANSACTIONS --------------------

exports.getTransactions = async ( req, res ) => {
    try {

        let transactions = await transaction.findAll({
            attributes: {
                exclude: [ 'idUser','createdAt', 'updatedAt']
            },
            include : {
                model: user,
                as: 'user',
                attributes: ['id', 'fullName', 'email']
            }
        })

        res.status(200).send({
            status: 'Success',
            data: { transactions }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// -------------------- APPROVE & CANCEL TRANSACTION --------------------

exports.updateTransaction = async (req, res) => {
    try {
      const { id } = req.params;

      if (req.body.paymentStatus === "Approved"){

        // get time now
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();
        
          //first update
          await transaction.update(
            {
              remainingActive: 30,
              userStatus: "Active",
              paymentStatus: req.body.paymentStatus,
            },
            {
              where: { id },
            },
          );
          
          //Update remaining active
          const task = cron.schedule(`${seconds} ${minutes} ${hours} * * *`, async () => {

            //inisiate remaining active variable
            let remainingActiveUser = 29;

            //get data transaction
            let getTransaction = await transaction.findOne({
              where: { id }
            })

            getTransaction = JSON.parse(JSON.stringify(getTransaction))
            
            // the task will be stopped and completely delete if remainingActive < 0
            if (remainingActiveUser === -1) {

              await transaction.update(
                {
                  ...getTransaction,
                  paymentStatus: "Cancel",
                  userStatus: "Not Active",
                },
                {
                  where: {
                    id
                  }
                }
              )
              task.destroy();

            } else {
              // Update Transaction if remaining active > 0
              await transaction.update(
                {
                  ...getTransaction,
                  remainingActive: remainingActiveUser 
                },
                {
                  where: {
                    id
                  }
                }
              )
              // Substrac remaining active
              remainingActive = remainingActive - 1;
            }

          })
      }

      if (req.body.paymentStatus === "Cancel"){
        await transaction.update(
            {
              remainingActive: 0,
              userStatus: "Not Active",
              paymentStatus: req.body.paymentStatus,
            },
            {
              where: { id },
            }
        );
      }

      const newTransaction = await transaction.findOne({
        where: {
          id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'idUser']
        },
        include: {
            model: user,
            as: "user",
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password', 'email', 'role'],
            },
        }
      });
  
      res.status(200).send({
        status: "Success",
        data: {
            transaction: newTransaction
        }
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Failed",
        message: "Server Error",
      });
    }
};
