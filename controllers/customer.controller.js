const Customer = require('../models/customer.model');

const createCustomer = async (req, res) => {
    let { first_name, last_name, 
          gender, address, description, phone_number } = req.body;

    if(!first_name || !last_name || !gender || !address || !phone_number) {
       return res.status(400).json({
                    success: 0, 
                    message: "Fill the required fields",
                    data: null
               });
    }

    const response = await Customer.create({
         first_name, last_name, gender, address, phone_number, description
     });

     res.status(201).json({
         success: 1,
         message: "User Created Successfully", 
         data: response
     });


}

const getAllCustomers = async (req, res) => {

    const response = await Customer.findAll({
        where: {
            isDeleted: false
        }
    });

    if (!response.length) {
        res.status(404).json({
            success: 0, 
            message: "No customer found",
            data: null
        });
    }

    res.status(200).json({
        success: 1, 
        message: "Customers found",
        data: response
    });
}

const getSingleCustomers = async (req, res) => {
    const customerId = req.params.id ;

    if(!isNaN(customerId)) {
        const response = await Customer.findOne({
            where: {
                id: customerId,
                isDeleted: false
            }
        });
    
        if (!response) {
            return res.status(404).json({
                        success: 0, 
                        message: "No customer found",
                        data: null
                    });
        }

        return res.status(200).json({
                    success: 1,
                    message: 'Customer found',
                    data: response
                });
    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Customer id must be a numeric value",
                    data: null
               })
    }
}

const updateCustomer = async (req, res) => {
    const customerId = req.params.id ;
    let { first_name, last_name, 
        gender, address, description, phone_number } = req.body;


    if(!first_name || !last_name || !gender || !address || !phone_number) {
      return  res.status(400).json({
                success: 0,
                message: "Fill the required fields",
                data: null
              });
    }

    if(!isNaN(customerId)) {
        const customer = await Customer.findByPk(customerId);
        
        if (!customer) {
            return res.status(404).json({
                        success: 0, 
                        message: `Customer with id ${customerId} not found`,
                        data: null
                    });
        } else {
            const response = await Customer.update({
                first_name, last_name, gender, address, description,phone_number
            }, 
            { 
                where: { 
                    id: customerId 
                }
            });

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Customer updated successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to update customer',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Customer id must be a numeric value",
                    data: null
               })
    }
}

const deleteCustomer = async (req, res) => {
    const customerId = req.params.id ;

    if(!isNaN(customerId)) {
        const customer = await Customer.findByPk(customerId);
        
        if (!customer) {
            return res.status(404).json({
                        success: 0, 
                        message: `Customer with id ${customerId} not found`,
                        data: null
                    });
        } else {
            const response = await Customer.update({
                isDeleted: 1
            }, 
            { 
                where: { 
                    id: customerId 
                }
            });

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Customer deleted successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to delete customer',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Customer id must be a numeric value",
                    data: null
               })
    }
}

module.exports = {
    createCustomer, getSingleCustomers, getAllCustomers,
    updateCustomer, deleteCustomer 
}