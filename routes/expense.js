

const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const  router = expres.Router()
const db= require('../db')
router.post('/user/addExpense' ,(req,res)=>{
    const { user_id, amount , category ,date,description } = req.body;

    if (!user_id|| !amount || !category || !date || !description ) {
        return res.status(400).json({ message: 'please enter credentials' });
    }
const statment =`INSERT INTO expenses (user_id, amount, category, expense_date, description)
VALUES ('${user_id}', '${amount}', '${category}', '${date}', '${description}');`
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
        console.log("...ressulrexpence",result)
       res.send(result)
    }
    })
    })



    router.get('/user/getExpenceByDate/:user_id/:expense_date' ,(req,res)=>{
        const { user_id,expense_date } = req.params;
        const statment=`select * from expenses where expense_date = '${expense_date}' AND user_id = ${user_id};`
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
                        console.log("......expense_date",data)
                        const users = data.map(user => ({
                            expense_date: user['expense_date'],
                            amount: user['amount'],
                            category: user['category'],
                            description: user['description'],

        
                        }));
        
         result['data']= users;
                    }
            
           res.send(result)
        }
        })
        })



        router.get('/user/getExpenceByCategory/:user_id/:category' ,(req,res)=>{
            console.log("nnklnlmn",req)
            const { user_id,category } = req.params;
            console.log("ressa",user_id,category)
            const statment=`select * from expenses where category = '${category}' AND user_id = ${user_id};`
            db.execute(statment ,(error,data)=>{
                const result ={
                status:" ",
                data:[]    ,
                error:" "
                } 
                console.log("////////",result)
            
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
                            console.log("......expense_date",data)
                            const users = data.map(user => ({
                                expense_date: user['expense_date'],
                                amount: user['amount'],
                                category: user['category'],
                                description: user['description'],
    
            
                            }));
            
             result['data']= users;
                        }
                
               res.send(result)
            }
            })
            })
    
   module.exports = router
