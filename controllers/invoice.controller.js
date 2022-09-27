const Invoice = require('../models/invoice.model');

const createInvoice = async (req, res) => {
    let { invoice_number, amount, due_date, account_id } = req.body;

    if(!invoice_number || !amount || !due_date || !account_id) {
       return res.status(400).json({
                    success: 0, 
                    message: "Fill the required fields",
                    data: null
               });
    }

    const response = await Invoice.create({
        invoice_number, amount, due_date, account_id
     });

     res.status(201).json({
         success: 1,
         message: "Invoice Created Successfully", 
         data: response
     });
}

const getAllInvoice = async (req, res) => {

    const response = await Invoice.findAll();

    if (!response.length) {
        res.status(404).json({
            success: 0, 
            message: "No invoice found",
            data: null
        });
    }

    res.status(200).json({
        success: 1, 
        message: "Invoices found",
        data: response
    });
}

const getSingleInvoice = async (req, res) => {
    const invoiceId = req.params.id ;

    if(!isNaN(invoiceId)) {
        const response = await Invoice.findOne({
            where: {
                id: invoiceId
            }
        });
    
        if (!response) {
            return res.status(404).json({
                        success: 0, 
                        message: "No Invoice found",
                        data: null
                    });
        }

        return res.status(200).json({
                    success: 1,
                    message: 'Invoice found',
                    data: response
                });
    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Invoice id must be a numeric value",
                    data: null
               })
    }
}

const updateInvoice = async (req, res) => {
    const invoiceId = req.params.id ;
    let { invoice_number, amount, due_date, account_id, description } = req.body;


    if(!invoice_number || !amount || !due_date || !account_id || !invoiceId) {
      return  res.status(400).json({
                success: 0,
                message: "Fill the required fields",
                data: null
              });
    }

    if(!isNaN(invoiceId)) {
        const invoice = await Invoice.findByPk(invoiceId);
        
        if (!invoice) {
            return res.status(404).json({
                        success: 0, 
                        message: `Account with id ${invoiceId} not found`,
                        data: null
                    });
        } else {
            const response = await Invoice.update({
                invoice_number, amount, due_date, account_id, description
            }, 
            { 
                where: { 
                    id: invoiceId 
                }
            });

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Invoice updated successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to update invoice',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Invoice id must be a numeric value",
                    data: null
               })
    }
}

const deleteInvoice = async (req, res) => {
    const invoiceId = req.params.id ;

    if(!isNaN(invoiceId)) {
        const invoice = await Invoice.findByPk(invoiceId);
        
        if (!invoice) {
            return res.status(404).json({
                        success: 0, 
                        message: `Invoice with id ${invoiceId} not found`,
                        data: null
                    });
        } else {
            const response = await Invoice.destroy({
                where: {
                    id: invoiceId
                }
            })

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Invoice deleted successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to delete invoice',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Invoice id must be a numeric value",
                    data: null
               })
    }
}

module.exports = {
    createInvoice, getAllInvoice, getSingleInvoice,
    updateInvoice, deleteInvoice
}