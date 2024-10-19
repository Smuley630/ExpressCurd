




const expres = require('express')
const mysql2 = require('mysql2')
const crypto = require('crypto-js')
const  router = expres.Router()
const db= require('../db')



router.get('/employee/:id' ,(req,res)=>{
    const {id}=req.params
// const statment=`select FirstName, Title ,PhotoPath, BirthDate , HireDate , City , Salary  from employees where EmployeeID = '${id}';`
const statment=`select *  from employees where EmployeeID = '${id}';`

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
        console.log("....user",user)
        result['data']= {
         
            firstname : user['FirstName'],
            Title :user['Title'],
            BirthDate:user['BirthDate'],
            HireDate:user['HireDate'],
            Salary:user['Salary'],
            PhotoPath:user['PhotoPath'],

        }
            }
    console.log("...res",result)
   res.send(result)
}
})
})


router.get('/employees/' ,(req,res)=>{
    
const statment=`select  FirstName, Title , BirthDate ,Salary, PhotoPath from employees;`
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
                console.log(data)
                const users = data.map(user => ({
                    Title: user['Title'],
                    firstname: user['FirstName'],
                    BirthDate: user['BirthDate'],
                    HireDate: user['HireDate'],
                    Salary:user['Salary'],
                    PhotoPath:user['PhotoPath'],

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
        // result['data']= {
        //     id:user['id'],
        //     firstname : user['firstName'],
        //     lastname :user['lastName']
        //     ,email:user['email']
        // }
            }
    
   res.send(result)
}
})
})

// router.post('/user/signup' ,(req,res)=>{
//   const {firstname,lastname,email,password}=req.body

//   const encryptedpassword= '' +crypto.SHA256(password)
//        const statment = `insert into user (firstname , lastname, email, password) values ('${firstname}','${lastname}','${email}','${encryptedpassword}')`
//        db.execute(statment,(error,data)=>{
//        const result ={
//         status : ' ',
//         error  :' ',
//         data :''
//        }
//    if(error != null){
//     result['status'] = 'error'
//     result['error'] =error
    
//    }else{
//     result['status']='success'
//     const user =data[0]
//     console.log(user)
//     result['data']= {
//         // id:user['id'],
// firstname : user['firstName'],
//         lastname :user['lastName']
//         ,email:user['email']
//     }
//    }
//    res.send(result)
   
//        })
   
//    })
   
   
//    router.post('/user/signin' ,(req,res)=>{
//     const {email , password}=req.body
//   const encryptedpassword= '' +crypto.SHA256(password)
    
//        const statment = `select * from user where email = '${email}' and password='${encryptedpassword}';`
//        db.execute(statment,(error,data)=>{
//         const result ={
//             status : ' ',
//             error  :' ',
//             data : ' '
//            }
//    if(error !=null){
//       result['status']='error'
//       result['error'] =error
//    }else{
// if(data.length===0){

//     result['status']='error'
//     result['error'] ='Data not found'
// }
//     else{
//         result['status']='success'
// const user =data[0]
// result['data']= {
//     id:user['id'],
//   firstname : user['firstName'],
//     lastname :user['lastName']
//     ,email:user['email']
// }
//     }
//    } 
//    res.send(result)
// })
  
   
//    })

   module.exports = router
