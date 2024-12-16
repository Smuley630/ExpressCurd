
const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const  router = expres.Router()
const db= require('../db')

router.get('/user/validate' ,(req,res)=>{
    
    const statment=`select * from users;`
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
                    const users = data.map(user => ({
                        user_id:user['user_id'],
                        emailid: user['emailid'],
                        name: user['name'],
    
                    }));
    
     result['data']= users;
                }
        
       res.send(result)
    }
    })
    })


 router.post('/user/addUser' ,(req,res)=>{
        const { name, email } = req.body;
        if (!email || !name) {
            return res.status(400).json({ message: 'please enter credentials' });
        }
    
        const statment=`INSERT INTO users (name, emailid) VALUES ('${name}', '${email}');`
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
                       
        
                    }
            
           res.send(result)
        }
        })
        })

   module.exports = router
