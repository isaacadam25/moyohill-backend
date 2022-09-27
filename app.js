const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const sequelize = require('./config/dbConfig');
const Customer = require('./models/customer.model');
const Account = require('./models/account.model');
const Invoice = require('./models/invoice.model');
const Transaction = require('./models/transactions.model');
const Status = require('./models/status.model');

// importing routes
const accountRoutes = require('./routes/account.routes');
const customerRoutes = require('./routes/customer.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const statusRoutes = require('./routes/status.routes');
const transactionRoutes = require('./routes/transaction.routes');

// applying middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api/v1/statuses', statusRoutes);
app.use('/api/v1/transactions', transactionRoutes);

// defining relationships and associations
// Customer.hasOne(Account);
// Account.hasMany(Invoice);
// Status.hasMany(Account);
// Account.hasMany(Transaction);
// Invoice.hasMany(Transaction);


// sequelize.sync({force: true}).then(res => {
//     console.log("table created");
// }).catch(err => {
//     console.log(err); 
// })

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// })();



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
