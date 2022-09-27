const Account = require('../models/account.model');

const createAccount = async (req, res) => {
    let {  customer_id, status_id, current_account, 
        previous_account, unit_count, description, reading_day } = req.body;

    if(!current_account || !customer_id || !status_id || !current_account 
        || !previous_account || !unit_count || !reading_day) {
       return res.status(400).json({
                    success: 0, 
                    message: "Fill the required fields",
                    data: null
               });
    }

    const response = await Account.create({
        customer_id, status_id, current_account, 
        previous_account, unit_count, description,reading_day
     });

     res.status(201).json({
         success: 1,
         message: "Account Created Successfully", 
         data: response
     });
}

const getAllAccount = async (req, res) => {

    const response = await Account.findAll({customer_id: null});

    if (!response.length) {
        res.status(404).json({
            success: 0, 
            message: "No account found",
            data: null
        });
    }

    res.status(200).json({
        success: 1, 
        message: "Accounts found",
        data: response
    });
}

const getSingleAccount = async (req, res) => {
    const accountId = req.params.id ;

    if(!isNaN(accountId)) {
        const response = await Account.findOne({
            where: {
                id: accountId
            }
        });
    
        if (!response) {
            return res.status(404).json({
                        success: 0, 
                        message: "No Account found",
                        data: null
                    });
        }

        return res.status(200).json({
                    success: 1,
                    message: 'Account found',
                    data: response
                });
    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Account id must be a numeric value",
                    data: null
               })
    }
}

const updateAccount = async (req, res) => {
    const accountId = req.params.id ;
    let { customer_id, status_id, current_account, 
        previous_account, unit_count, description, reading_day } = req.body;


    if(!current_account || !customer_id || !status_id || !current_account 
        || !previous_account || !unit_count || !reading_day) {
      return  res.status(400).json({
                success: 0,
                message: "Fill the required fields",
                data: null
              });
    }

    if(!isNaN(accountId)) {
        const account = await Account.findByPk(accountId);
        
        if (!account) {
            return res.status(404).json({
                        success: 0, 
                        message: `Account with id ${accountId} not found`,
                        data: null
                    });
        } else {
            const response = await Account.update({
                customer_id, status_id, current_account, 
                previous_account, unit_count, description, reading_day
            }, 
            { 
                where: { 
                    id: accountId 
                }
            });

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Account updated successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to update account',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Account id must be a numeric value",
                    data: null
               })
    }
}

const deleteAccount = async (req, res) => {
    const accountId = req.params.id ;

    if(!isNaN(accountId)) {
        const account = await Account.findByPk(accountId);
        
        if (!account) {
            return res.status(404).json({
                        success: 0, 
                        message: `Account with id ${accountId} not found`,
                        data: null
                    });
        } else {
            const response = await Account.destroy({
                where: {
                    id: accountId
                }
            })

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Account deleted successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to delete account',
                            data: null
                        });
            }
        }
    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Account id must be a numeric value",
                    data: null
               })
    }
}

module.exports = {
    createAccount, getAllAccount, getSingleAccount,
    updateAccount, deleteAccount
}