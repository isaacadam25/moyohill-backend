const Transaction = require('../models/transactions.model');
const Invoice = require('../models/invoice.model');

const createTransaction = async (req, res) => {
    let { reference_number, amount, account_id, invoice_id, description } = req.body;

    if(!reference_number || !amount || !account_id || !invoice_id) {
       return res.status(400).json({
                    success: 0, 
                    message: "Fill the required fields",
                    data: null
               });
    }

    const response = await Transaction.create({
        reference_number, amount, account_id, invoice_id, description
     });

     if (response) {

        const payInvoice = await Invoice.update(
            {
                paid_amount: response.amount
            }, 
            { 
            where: { 
                id: invoice_id 
            }
        })

        if (payInvoice.amount === response.amount) {
             const updatePay = await Invoice.update(
                {
                    isPaid: true
                }, 
                { 
                where: { 
                    id: invoice_id 
                }
            })
        }
    
        res.status(201).json({
            success: 1,
            message: "Transaction initiated Successfully", 
            data: response
        });
     }

}

const getAllTransaction = async (req, res) => {

    const response = await Transaction.findAll();

    if (!response.length) {
        res.status(404).json({
            success: 0, 
            message: "No transaction initiated",
            data: null
        });
    }

    res.status(200).json({
        success: 1, 
        message: "Transactions initiated",
        data: response
    });
}

const getSingleTransaction = async (req, res) => {
    const transactionId = req.params.id ;

    if(!isNaN(transactionId)) {
        const response = await Transaction.findOne({
            where: {
                id: transactionId
            }
        });
    
        if (!response) {
            return res.status(404).json({
                        success: 0, 
                        message: "No Transaction initiated",
                        data: null
                    });
        }

        return res.status(200).json({
                    success: 1,
                    message: 'Initiated Transaction',
                    data: response
                });
    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Transaction id must be a numeric value",
                    data: null
               })
    }
}

const updateTransaction = async (req, res) => {
    const transactionId = req.params.id ;
    let { reference_number, amount, account_id, invoice_id, description } = req.body;


    if(!reference_number || !amount || !invoice_id || !account_id) {
      return  res.status(400).json({
                success: 0,
                message: "Fill the required fields",
                data: null
              });
    }

    if(!isNaN(transactionId)) {
        const transaction = await Transaction.findByPk(transactionId);
        
        if (!transaction) {
            return res.status(404).json({
                        success: 0, 
                        message: `Transaction with id ${transactionId} not initiated`,
                        data: null
                    });
        } else {
            const response = await Transaction.update({
                reference_number, amount, account_id, invoice_id, description
            }, 
            { 
                where: { 
                    id: transactionId 
                }
            });

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Transaction updated successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to update transaction',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Transaction id must be a numeric value",
                    data: null
               })
    }
}

const deleteTransaction = async (req, res) => {
    const transactionId = req.params.id ;

    if(!isNaN(transactionId)) {
        const transaction = await Transaction.findByPk(transactionId);
        
        if (!transaction) {
            return res.status(404).json({
                        success: 0, 
                        message: `Transaction with id ${transactionId} not found`,
                        data: null
                    });
        } else {
            const response = await Transaction.destroy({
                where: {
                    id: transactionId
                }
            })

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Transaction deleted successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to delete transaction',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Transaction id must be a numeric value",
                    data: null
               })
    }
}

module.exports = {
    createTransaction, getAllTransaction, getSingleTransaction,
    updateTransaction, deleteTransaction
}