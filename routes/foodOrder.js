




const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const  router = expres.Router()
const db= require('../db')



router.get('/footItems' ,(req,res)=>{
const statment=`select *  from food_items;`

db.execute(statment ,(error,data)=>{
    const result ={
    status:" ",
    data:[] ,
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
        const user =data
        console.log("....user",user)
       

        const users = data.map(user => ({
            item_name : user['item_name'],
            image :user['image'],
            price:user['price'],
        }));
 result['data']= users;


            }
    console.log("...res",result)
   res.send(result)
}
})
})


router.get('/employees' ,(req,res)=>{
    
const statment=`select  FIRST_NAME, LAST_NAME , PHONE_NUMBER ,JOB_ID, SALARY,DEPARTMENT_ID,MANAGER_ID from employees;`
console.log("....stat",statment)
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
                console.log("1111111111",data)
                const users = data.map(user => ({
                    FIRST_NAME: user['FIRST_NAME'],
                    LAST_NAME: user['LAST_NAME'],
                    PHONE_NUMBER: user['PHONE_NUMBER'],
                    JOB_ID: user['JOB_ID'],
                    SALARY:user['SALARY'],
                    DEPARTMENT_ID:user['DEPARTMENT_ID'],
                    MANAGER_ID:user['MANAGER_ID'],


                }));

 result['data']= users;
            }
console.log("........result",result)
    
   res.send(result)
}
})
})



   module.exports = router
