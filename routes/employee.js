




const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const  router = expres.Router()
const db= require('../db')



router.get('/employee/:id' ,(req,res)=>{
    const {id}=req.params
const statment=`select *  from employees where EMPLOYEE_ID = '${id}';`

db.execute(statment ,(error,data)=>{
    const result ={
    status:" ",
    data:"" ,
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
        const user =data[0]
        result['data']= {
         
            firstname : user['FirstName'],
            Title :user['Title'],
            BirthDate:user['BirthDate'],
            HireDate:user['HireDate'],
            Salary:user['Salary'],
            PhotoPath:user['PhotoPath'],

        }
            }
   res.send(result)
}
})
})


router.get('/employees' ,(req,res)=>{
    
const statment=`select  FIRST_NAME, LAST_NAME , PHONE_NUMBER ,JOB_ID, SALARY,DEPARTMENT_ID,MANAGER_ID from employees;`
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
   res.send(result)
}
})
})
router.delete('/user/profile/:id' ,(req,res)=>{
    const {id}=req.params
const statment=`delete from user where id = '${id}';`
db.execute(statment ,(error,data)=>{
    const result ={
    status:" ",
    data:" "    ,
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
        const user =data[0]
       
            }
    
   res.send(result)
}
})
})


   module.exports = router
