const Status = require('../models/status.model');

const createStatus = async (req, res) => {
    let { status_name, description } = req.body;

    if(!status_name) {
       return res.status(400).json({
                    success: 0, 
                    message: "Fill the required fields",
                    data: null
               });
    }

    const response = await Status.create({
         status_name, description
     });

     res.status(201).json({
         success: 1,
         message: "Status Created Successfully", 
         data: response
     });


}

const getAllStatus = async (req, res) => {

    const response = await Status.findAll();

    if (!response.length) {
        res.status(404).json({
            success: 0, 
            message: "No status found",
            data: null
        });
    }

    res.status(200).json({
        success: 1, 
        message: "Statuses found",
        data: response
    });
}

const getSingleStatus = async (req, res) => {
    const statusId = req.params.id ;

    if(!isNaN(statusId)) {
        const response = await Status.findOne({
            where: {
                id: statusId
            }
        });
    
        if (!response) {
            return res.status(404).json({
                        success: 0, 
                        message: "No Status found",
                        data: null
                    });
        }

        return res.status(200).json({
                    success: 1,
                    message: 'Status found',
                    data: response
                });
    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Status id must be a numeric value",
                    data: null
               })
    }
}

const updateStatus = async (req, res) => {
    const statusId = req.params.id ;
    let { status_name, description } = req.body;


    if(!status_name) {
      return  res.status(400).json({
                success: 0,
                message: "Fill the required fields",
                data: null
              });
    }

    if(!isNaN(statusId)) {
        const status = await Status.findByPk(statusId);
        
        if (!status) {
            return res.status(404).json({
                        success: 0, 
                        message: `Status with id ${statusId} not found`,
                        data: null
                    });
        } else {
            const response = await Status.update({
                status_name, description
            }, 
            { 
                where: { 
                    id: statusId 
                }
            });

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Status updated successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to update status',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Status id must be a numeric value",
                    data: null
               })
    }
}

const deleteStatus = async (req, res) => {
    const statusId = req.params.id ;

    if(!isNaN(statusId)) {
        const status = await Status.findByPk(statusId);
        
        if (!status) {
            return res.status(404).json({
                        success: 0, 
                        message: `Status with id ${statusId} not found`,
                        data: null
                    });
        } else {
            const response = await Status.destroy({
                where: {
                    id: statusId
                }
            })

            if (response) {
                return res.status(200).json({
                            success: 1,
                            message: 'Status deleted successfully',
                            data: null
                        });
            } else {
                return res.status(400).json({
                            success: 1,
                            message: 'Fail to delete status',
                            data: null
                        });
            }
        }

    } else {
       return res.status(400).json({
                    success: 0, 
                    message: "Status id must be a numeric value",
                    data: null
               })
    }
}

module.exports = {
    createStatus, getAllStatus, getSingleStatus,
    updateStatus, deleteStatus
}