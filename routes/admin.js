const con= require('../conn/conn');
 const express = require('express');
 router = express.Router();


// router.post('/reg', function(req, res){  

//     let adminData = {
//         id:req.body.id,
//         fname:req.body.fname,
//         lname:req.body.lname,
//         email:req.body.email,
//         pwd:req.body.pwd
//     };


//     let email = req.body.email;
//     let myQuery1 = "SELECT * FROM admin WHERE email = ?";
//     con.query(myQuery1,[email],function(err,results){
        
//         if(results.length > 0){

//             res.send({
//                 data : results,
//                 code : 200,
//                 message : "Sorry, the email is alrady registered!"

//             })

//         }else{
//                 let myQuery = "INSERT INTO admin SET ?";
//                 con.query(myQuery, [adminData], function(err, results){
//                     if(err){
                        
//                         res.send({
//                             data : err,
//                             code : 400,
//                             message : "The was an error !!!"
//                         });
                            
//                     }else{
                        
//                         console.log("results")
//                         res.send({
//                             data : results,
//                             code : 200,
//                             message : "Registered Successfully..."
            
//                         })
//                     }
//             })
//         }
        
//     })
// });






 module.exports = router;