

const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const router = expres.Router()
const db = require('../db')
const utils = require('../utils')

router.post('/user/addSaving', (req, res) => {
    const { userId, savingAmount } = req.body;
    const statment = `INSERT INTO saving_account (user_id, saving_amount) VALUES ('${userId}', '${savingAmount}');`;
    db.execute(statment, (error, data) => {
        const result = {
            status: " ",
            data: [],
            error: " "
        }

        if (error != null) {
            result['status'] = 'error'
            result['error'] = error

        } else {
            if (data.length === 0) {

                result['status'] = 'error'
                result['error'] = 'Data not found'
            }
            else {
                result['status'] = 'success'

            }

            res.send(result)
        }
    });
})

router.put('/user/updateSaving', (req, res) => {
    const { updatedAmount, userId } = req.body;
    const statment = `UPDATE saving_account SET saving_amount = ? WHERE user_id = ?;`;

    db.query(statment, [updatedAmount, userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed.' });
        }

        if (results.length === 0) {
            return res.send(utils.createError('Order not found!'));
        } else {
            return res.send(utils.createResult(null, results));
        }
    });



})


router.get('/user/getSaving/:user_id', (req, res) => {
    const { user_id } = req.params;
    const statment = ` select  users.user_id, users.name,users.emailid, saving_account.saving_amount FROM users INNER JOIN saving_account ON  saving_account.user_id = users.user_id where  saving_account.user_id = ?;`;

    db.query(statment, [user_id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        if (results.length === 0) {
            return res.send(utils.createError('Order not found!'));
        } else {
            return res.send(utils.createResult(null, results));
        }
    });

})



router.get('/user/getExpenditure/:userId/:monthIndex', (req, res) => {
    const { userId, monthIndex } = req.params;
    const statment = `SELECT SUM(amount) AS total_amount FROM expenses WHERE user_id = ? AND MONTH(expense_date) = ?;`;

    db.query(statment, [userId, monthIndex], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        if (results.length === 0) {
            return res.send(utils.createError('Order not found!'));
        } else {
            return res.send(utils.createResult(null, results));
        }
    });

})




module.exports = router
