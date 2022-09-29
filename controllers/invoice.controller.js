const axios = require("axios");
const btoa = require("btoa");
const https = require("https");
const Invoice = require("../models/invoice.model");
const Account = require("../models/account.model");
const Customer = require("../models/customer.model");

const createInvoice = async (req, res) => {
  let {
    invoice_number,
    amount,
    due_date,
    account_id,
    reading_day,
    unit_count,
    description,
  } = req.body;

  if (
    !invoice_number ||
    !amount ||
    !due_date ||
    !account_id ||
    !unit_count ||
    !reading_day
  ) {
    return res.status(400).json({
      success: 0,
      message: "Fill the required fields",
      data: null,
    });
  }

  const response = await Invoice.create({
    invoice_number,
    amount,
    due_date,
    account_id,
    reading_day,
    unit_count,
    description,
  });

  if (response) {
    const { account_id } = response;
    const { customer_id } = await Account.findByPk(account_id);
    const { phone_number, first_name } = await Customer.findByPk(customer_id);

    const message = `Habari ${first_name}, kiasi cha bili unayodaiwa kwa mwezi huu ni Tsh${amount}.Ikijumuisha kiasi cha Tsh${amount} unayodaiwa mwezi ulipita. Tafadhali lipa deni lako ndani ya siku 7 kutoka tarehe uliotumiwa ankara kupitia NMB Account namba 40902500794. Maji ni uhai`;

    const body = {
      source_addr: "INFO",
      schedule_time: "",
      encoding: "0",
      message: message,
      recipients: [
        {
          recipient_id: 1,
          dest_addr: phone_number,
        },
      ],
    };

    // send message to client here
    const sms = await axios.post("https://apisms.beem.africa/v1/send", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa(process.env.API_KEY + ":" + process.env.SECRET_KEY),
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    if (sms) {
      return res.status(200).json({
        success: 1,
        data: sms.data,
      });
    }
  }
};

const getAllInvoice = async (req, res) => {
  const response = await Invoice.findAll();

  if (!response.length) {
    res.status(404).json({
      success: 0,
      message: "No invoice found",
      data: null,
    });
  }

  res.status(200).json({
    success: 1,
    message: "Invoices found",
    data: response,
  });
};

const getSingleInvoice = async (req, res) => {
  const invoiceId = req.params.id;

  if (!isNaN(invoiceId)) {
    const response = await Invoice.findOne({
      where: {
        id: invoiceId,
      },
    });

    if (!response) {
      return res.status(404).json({
        success: 0,
        message: "No Invoice found",
        data: null,
      });
    }

    return res.status(200).json({
      success: 1,
      message: "Invoice found",
      data: response,
    });
  } else {
    return res.status(400).json({
      success: 0,
      message: "Invoice id must be a numeric value",
      data: null,
    });
  }
};

const updateInvoice = async (req, res) => {
  const invoiceId = req.params.id;
  let {
    invoice_number,
    amount,
    due_date,
    account_id,
    reading_day,
    unit_count,
    description,
  } = req.body;

  if (
    !invoice_number ||
    !amount ||
    !due_date ||
    !account_id ||
    !unit_count ||
    !reading_day
  ) {
    return res.status(400).json({
      success: 0,
      message: "Fill the required fields",
      data: null,
    });
  }

  if (!isNaN(invoiceId)) {
    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        success: 0,
        message: `Account with id ${invoiceId} not found`,
        data: null,
      });
    } else {
      const response = await Invoice.update(
        {
          invoice_number,
          amount,
          due_date,
          account_id,
          reading_day,
          unit_count,
          description,
        },
        {
          where: {
            id: invoiceId,
          },
        }
      );

      if (response) {
        return res.status(200).json({
          success: 1,
          message: "Invoice updated successfully",
          data: null,
        });
      } else {
        return res.status(400).json({
          success: 1,
          message: "Fail to update invoice",
          data: null,
        });
      }
    }
  } else {
    return res.status(400).json({
      success: 0,
      message: "Invoice id must be a numeric value",
      data: null,
    });
  }
};

const deleteInvoice = async (req, res) => {
  const invoiceId = req.params.id;

  if (!isNaN(invoiceId)) {
    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        success: 0,
        message: `Invoice with id ${invoiceId} not found`,
        data: null,
      });
    } else {
      const response = await Invoice.destroy({
        where: {
          id: invoiceId,
        },
      });

      if (response) {
        return res.status(200).json({
          success: 1,
          message: "Invoice deleted successfully",
          data: null,
        });
      } else {
        return res.status(400).json({
          success: 1,
          message: "Fail to delete invoice",
          data: null,
        });
      }
    }
  } else {
    return res.status(400).json({
      success: 0,
      message: "Invoice id must be a numeric value",
      data: null,
    });
  }
};

module.exports = {
  createInvoice,
  getAllInvoice,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
};
