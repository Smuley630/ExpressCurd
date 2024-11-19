

const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const  router = expres.Router()
const db= require('../db')
const utils =require('../utils')
// router.post('/user/addExpense' ,(req,res)=>{
//     const { user_id, amount , category ,date,description } = req.body;

//     if (!user_id|| !amount || !category || !date || !description ) {
//         return res.status(400).json({ message: 'please enter credentials' });
//     }
// const statment =`INSERT INTO expenses (user_id, amount, category, expense_date, description)
// VALUES ('${user_id}', '${amount}', '${category}', '${date}', '${description}');`
//     db.execute(statment ,(error,data)=>{
//         const result ={
//         status:" ",
//         data:[]    ,
//         error:" "
//         } 
    
//         if(error != null){
//             result['status'] = 'error'
//             result['error'] =error
            
//            }else{
//             if(data.length===0){
    
//                 result['status']='error'
//                 result['error'] ='Data not found'
//             }
//                 else{
//                     result['status']='success'
//                     console.log("......true")
                   
    
//                 }
//         console.log("...ressulrexpence",result)
//        res.send(result)
//     }
//     })
//     })



    router.post('/user/addSaving' ,(req,res)=>{
        const { userId, savingAmount } = req.body;
        console.log("......INSERT",userId,savingAmount)
        const statment = `INSERT INTO saving_account (user_id, saving_amount) VALUES ('${userId}', '${savingAmount}');`;
        db.execute(statment ,(error,data)=>{
            const result ={
            status:" ",
            data:[]    ,
            error:" "
            } 
        
            if(error != null){
                result['status'] = 'error'
                result['error'] =error
                
               }else{
                if(data.length===0){
        
                    result['status']='error'
                    result['error'] ='Data not found'
                }
                    else{
                        result['status']='success'
                        console.log("......true")
                       
        
                    }
            
           res.send(result)
        }
        });
    })

    router.put('/user/updateSaving' ,(req,res)=>{
        const {  updatedAmount,userId } = req.body;
        console.log("......INSERT",userId,updatedAmount)
        const statment = `UPDATE saving_account SET saving_amount = ? WHERE user_id = ?;`;
        
        db.query(statment, [updatedAmount,userId], (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ error: 'Database query failed.' });
                }
    
                if (results.length === 0) {
                    console.log('.....here1');
                    return res.send(utils.createError('Order not found!'));
                } else {
                    console.log('.....here2');
                    return res.send(utils.createResult(null, results)); // Pass null for the error parameter
                }
            });
    
     
      
        })


        router.get('/user/getSaving/:user_id' ,(req,res)=>{
            const { user_id } = req.params;
            const statment = ` select  users.user_id, users.name,users.emailid, saving_account.saving_amount FROM users INNER JOIN saving_account ON  saving_account.user_id = users.user_id where  saving_account.user_id = ?;`;
           
            db.query(statment, [user_id], (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return res.status(500).json({ error: 'Database query failed.' });
                    }
        
                    if (results.length === 0) {
                        console.log('.....here1');
                        return res.send(utils.createError('Order not found!'));
                    } else {
                        console.log('.....here2');
                        return res.send(utils.createResult(null, results)); // Pass null for the error parameter
                    }
                });
                // connection.end()
          
            })



            router.get('/user/getExpenditure/:userId/:monthIndex' ,(req,res)=>{
                const { userId ,monthIndex } = req.params;
                const statment = `SELECT SUM(amount) AS total_amount FROM expenses WHERE user_id = ? AND MONTH(expense_date) = ?;`;
                       
                db.query(statment, [userId ,monthIndex], (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return res.status(500).json({ error: 'Database query failed.' });
                        }
            
                        if (results.length === 0) {
                            console.log('.....here1');
                            return res.send(utils.createError('Order not found!'));
                        } else {
                            console.log('.....here2');
                            return res.send(utils.createResult(null, results)); // Pass null for the error parameter
                        }
                    });
              
                })



    
   module.exports = router
