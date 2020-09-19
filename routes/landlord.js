const con= require('../conn/conn');
const express = require('express');
router = express.Router(); 


//landlord registration route
router.post('/landlordreg',(req,res)=>{
    
 if(req.body.password!=req.body.password_confirm){
        res.send("passwords do not match")
    }else{
        var email = req.body.email_address;
        var sql = "SELECT * FROM landlord WHERE email_address = ?";
        con.query(sql,[email],function(err,results){
         if(results.length>0){
    
                res.send({
                    message : "Sorry this landlord already exist!"
                })
    
            }else{
                let lordData={
                    email_address: req.body.email_address,
                    password : req.body.password
                }

                var sql = "INSERT INTO landlord SET ?";
                con.query(sql,[lordData],function(err,results){

                    if(err)throw err
                    else{
                        res.send({
                                    data:results,
                                    message:"Successfully registered"
                        });
                    }

})
   }
      })
    }
    
});
//landlord update profile route

router.post('/updateLandlord', (req,res)=>{
    let lordData ={ 
        company_name:req.body.company_name,
        registration_no:req.body.registration_no,
       house_number:req.body.house_number,
       street_name:req.body.street_name,
       suburb:req.body.suburb,
       city:req.body.city,
       zip_code:req.body.zip_code,
       province:req.body.province,
       country:req.body.country,
        telephone:req.body.telephone 
       }
  let email = req.body.email_address;
       
    con.query('UPDATE landlord SET ? where email_address = "'+email+'"',[lordData],function (error, results, fields)
    {
        if (error) throw error;
        else
        {
          res.send('data updated');
    }       
      })
    })


//landlord application route

router.post('/addproperty',(req,res)=>{
        let propData = {
            landlord_email:req.body.landlord_email,
           
           
           prop_name:req.body.prop_name,
            campus:req.body.campus,
            numFemale_beds:req.body.numFemale_beds,
            numMale_beds:req.body.numMale_beds,
            bedsPerRoom:req.body.bedsPerRoom,
            num_floors:req.body.num_floors,
            num_rooms:req.body.num_rooms




            
        };   


     var myQuery = "INSERT INTO property SET ?";
    con.query(myQuery, [propData], function(err, results){
                    if(err)throw err
                    else{
                        res.send({ 
                            data:results,
                            message : "Application sent"
            
                        })
                    }
            })
        
});


//student apply for room

router.post('/applyRoom',(req,res)=>{
let status="PENDING";
    let studData={
         student_no : req.body.student_no,
         landlord_email :req.body.landlord_email,
         status:status
}
    
sql="INSERT INTO tenant SET ?";
     con.query(sql,[studData],function(err,rows,fields){
         if (err) throw err;
         else{
            res.send("application sent");
         }
     })


})

//














//get applicants

router.get('/getapplicants',(req,res)=>{
    let landlord_email=req.body.landlord_email;
   let status="PENDING";
  let sql ='SELECT * FROM tenant WHERE landlord_email="'+landlord_email+'" AND status="'+status+'"';

            con.query(sql,function(err,rows,fields){
                if (err)throw err;
                else{
                    res.send(rows);
                }
            })

})

//locate a room to a student  ********************************************
router.put('/locateStudent',(req,res)=>{
 var landlord_email=req.body.landlord_email;
 var student_no=req.body.student_no;

let sql = 'UPDATE tenant SET room_no= (SELECT occupied_rooms FROM property WHERE landlord_email= "'+landlord_email+'")+1,floor=1  WHERE student_no="'+student_no+'"';

con.query(sql,function(err,rows,fields){
  if (err)throw err;
    else{
      let sql2 ='UPDATE property SET occupied_rooms=occupied_rooms+1 WHERE landlord_email= "'+landlord_email+'"';
       con.query(sql2,function(err,rows,fields){
        if(err) throw err;
        else{
            sql3 = 'UPDATE tenant SET floor = 1 where room_no <=  (SELECT num_rooms FROM property WHERE landlord_email= "'+landlord_email+'") /  (SELECT num_floors FROM property WHERE landlord_email= "'+landlord_email+'")';
           con.query(sql3,function(err,results){
            if (err)throw err;
            else{
                    if(results.changedRows==0){
                        sql4 = 'UPDATE tenant SET floor = 2 where room_no <=  ((SELECT num_rooms FROM property WHERE landlord_email= "'+landlord_email+'") /  (SELECT num_floors FROM property WHERE landlord_email= "'+landlord_email+'")*2)';
                        con.query(sql4,function(err,results){
                         if(err)throw err;
                         else{
                               if(results.changedRows==0){
                                sql5 = 'UPDATE tenant SET floor = 3 where room_no <=  ((SELECT num_rooms FROM property WHERE landlord_email= "'+landlord_email+'") /  (SELECT num_floors FROM property WHERE landlord_email= "'+landlord_email+'")*3)';
                                con.query(sql5,function(err,results){
                                    if(err)throw err;
                                    else{
                                        if(results.changedRows==0){
                                            sql6 = 'UPDATE tenant SET floor = 4 where room_no <=  ((SELECT num_rooms FROM property WHERE landlord_email= "'+landlord_email+'") /  (SELECT num_floors FROM property WHERE landlord_email= "'+landlord_email+'")*4)';
                                            con.query(sql6,function(err,results){
                                                if(err)throw err;
                                                else{
                                                   if(results.changedRows==0){
                                                    sql7 = 'UPDATE tenant SET floor = 5 where room_no <=  ((SELECT num_rooms FROM property WHERE landlord_email= "'+landlord_email+'") /  (SELECT num_floors FROM property WHERE landlord_email= "'+landlord_email+'")*5)';
                                                    con.query(sql7,function(err,results){
                                                        if(results.changedRows==0){
                                                            res.send('floor unlocated')
                                                        }else{
                                                            res.send('floor 5')
                                                        }
                                                    })
                                                   }else{
                                                    res.send('floor 4')
                                                   }
                                                }
                                            })
                                        }else{
                                            res.send('floor 3')
                                        }
                                    }
                                })
                               }else{
                                res.send({data:results,
                                    message:'floor 2'})
                               }
                         }
                        })
                        
                    }else{
                        res.send({data:results,
                            message:'floor 1'})
                    }
            }

    })


        }
             

       })
    }
})

})



 
module.exports =router ;




