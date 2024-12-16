

const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const  router = expres.Router()
const db= require('../db')
router.post('/user/addReview' ,(req,res)=>{
    const { name, review } = req.body;
console.log(".....www",name,review)
    if (!review|| !name) {
        return res.status(400).json({ message: 'please enter credentials' });
    }

    const statment=`INSERT INTO user_reviews (name, review) VALUES ('${name}', '${review}');`
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
    })
    })



    router.get('/user/getReview' ,(req,res)=>{
     const statment=`select name, review from user_reviews;`
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
                            name: user['name'],
                            review: user['review'],
        
                        }));
        
         result['data']= users;
                    }
            
           res.send(result)
        }
        })
        })

   module.exports = router
