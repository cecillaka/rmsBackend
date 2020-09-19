var express = require('express')
var multer  = require('multer')

const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');

// const fs = require('fs');


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './picUploads/');
//     },
//     filename: function(req, file, cb) {
//         const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
//     }
// });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploadpic/');
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    }
  });




  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    // fileFilter: fileFilter
  });
// var upload = multer({storage: storage})


// router.post('/stuapp', function(req, res){  
//     var post = {
//                 "student_no": req.body.student_no,
//                  "Full_names": req.body.Full_name,
//                  "Last name": req.body.email,
//                  "Id_no": req.body.password,
//                  "gender": req.body.campus_loc,
//                  "disability": req.body.studno,
//                  "contact_student": req.body.id_no,
//                  "contact_guardian": req.body.cell_no,
//                  "campus_study": req.body.cell_no,
//                  "faculty": req.body.cell_no,
//                  "course": req.body.cell_no,
//                  "year_of_admission": req.body.cell_no,
//                  "sponsor": req.body.cell_no
//             };

// });

//register student 

// router.post('/reg', function(req, res){  

//     var post = {
//         "firstName": req.body.firstName,
//         "lastName": req.body.lastName,
//         "email": req.body.email,
//         "password": req.body.password,
//         "campus_loc": req.body.campus_loc,
//         "studno": req.body.studno,
//         "id_no": req.body.id_no,
//         "cell_no": req.body.cell_no
//     };


//     var email = req.body.email;
//     var myQuery1 = "SELECT * FROM student WHERE email = ?";
//     db.query(myQuery1,[email],function(err,results){
        
//         if(results.length > 0){

//             res.send({
//                 data : results,
//                 code : 200,
//                 message : "Sorry, user already exist!"

//             })

//         }else{
//                 var myQuery = "INSERT INTO student SET ?";
//                 db.query(myQuery, [post], function(err, results){
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

//Get all student
router.get('/getstud/',(req,res)=>{
    db.query('SELECT * FROM student',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});





router.get('/stud/',(req,res)=>{
    db.query('SELECT * FROM student',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});


// router.get('/pendingprop/',(req,res)=>{
//     var status="pending";
//     db.query('SELECT * FROM property where status="pending"',(err,rows,fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
    
// });

// router.get('/acceptedprop/',(req,res)=>{
//     var status="pending";
//     db.query('SELECT * FROM property where status="accepted"',(err,rows,fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
    
// })









//accepted properties
router.get('/acceptedprop/',(req,res)=>{
    var status="pending";
    db.query('SELECT landlord.full_name,property.landlord_email ,landlord.telephone,landlord.house_number,landlord.street_name,landlord.suburb,landlord.city,landlord.zip_code,landlord.province,landlord.country,landlord.property_name,property.num_rooms,property.numFemale_beds,property.numMale_beds,property.bedsPerRoom,property.campus,property.blocks,property.date_apply,property.status,property.occupied_rooms FROM landlord,property WHERE   landlord.landlord_email=property.landlord_email and  property.status="accepted"',(err,rows,fields)=>{
    
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})






//pending properties
router.get('/pendingprop/',(req,res)=>{
    var status="pending";
    db.query('SELECT landlord.full_name,property.landlord_email ,landlord.telephone,landlord.house_number,landlord.street_name,landlord.suburb,landlord.city,landlord.zip_code,landlord.province,landlord.country,landlord.property_name,property.num_rooms,property.numFemale_beds,property.numMale_beds,property.bedsPerRoom,property.campus,property.blocks,property.date_apply,property.status,property.occupied_rooms FROM landlord,property WHERE  landlord.landlord_email=property.landlord_email and  property.status="pending"',(err,rows,fields)=>{
    
 
  
  
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})







router.get('/male/',(req,res)=>{
    var status="pending";
    db.query('SELECT gender FROM student where gender="male"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})





// get student notifications
router.get('/noti/',(req,res)=>{
    var status="pending";
    db.query('SELECT message FROM stu_notification where landlord_email="charlse@gmail.com"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})







router.get('/female/',(req,res)=>{
    var status="pending";
    db.query('SELECT gender FROM student where gender="female"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})





router.get('/dis/',(req,res)=>{
    var status="pending";
    db.query('SELECT disability FROM student where disability="1"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})

router.get('/notdis/',(req,res)=>{
    var status="pending";
    db.query('SELECT COUNT(disability)FROM student where disability="0"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})






//delete property
router.delete('/dlt/:landlord_email',(req,res)=>{
    db.query('DELETE FROM landlord WHERE landlord_email= ?',[req.params.landlord_email],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully ');
        else
            console.log(err);
    }) 
});
//delete notification








//delete student from database
router.delete('/dltstud/:landlord_email',(req,res)=>{
    db.query('DELETE FROM student WHERE landlord_email= ?',[req.params.landlord_email],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully ');
        else
            console.log(err);
    }) 
});

//accept landlord application
router.post('/acceptapp/:landlord_email',(req,res)=>{
    db.query('UPDATE property set status="accepted" WHERE landlord_email= ?',[req.params.landlord_email],(err,rows)=>{
        if(!err)
            res.send('application accepted ');
        else
            console.log(err);
    }) 
});

//search properties

router.get('/searchprop',(req,res)=>{
   
    db.query('SELECT property_name FROM property,landlord where landlord.landlord_email=property.landlord_email and status="accepted" and campus= "Soshanguve"',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
          
    })
    
})






//view student issues
router.get('/viewStuIssues',(req,res)=>{
  
  let sql ='SELECT * FROM stu_issues ';

            db.query(sql,function(err,rows,fields){
                if (err)throw err;
                else{
                    res.send(rows);
                }
            })

})




//retrieve a single issue for a specific student
router.get('/specificissue1',(req,res)=>{
  
    let sql ='SELECT * FROM stuissues where Lconfirm="notfixed"   ';
  
              db.query(sql,function(err,rows,fields){
                  if (err)throw err;
                  else{
                      res.send(rows);
                  }
              })
  
  })









//retrieve a single issue for a specific student
router.get('/specificissue',(req,res)=>{
  
    let sql ='SELECT * FROM stuissues where student_no="2020202020" and Sconfirm="notfixed"   ';
  
              db.query(sql,function(err,rows,fields){
                  if (err)throw err;
                  else{
                      res.send(rows);
                  }
              })
  
  })

// student confirm fixed issues


router.post('/fixissue/:description',(req,res)=>{
    db.query('UPDATE stuissues set Sconfirm="fixed" WHERE description=?',[req.params.description],(err,rows)=>{
        if(!err)
            res.send('issue has been fixed ');
        else
            console.log(err);
    }) 
});

// landlord confirm fixed issues


router.post('/fixissue1/:description',(req,res)=>{
    db.query('UPDATE stuissues set Lconfirm="fixed" WHERE description=?',[req.params.description],(err,rows)=>{
        if(!err)
            res.send('issue has been fixed ');
        else
            console.log(err);
    }) 
});




// save student issues
router.post('/InsertStuIssues/', (req,res)=>{
 
    let issueData ={ 
        
        Issue_type:req.body.Issue_type,
    description:req.body.description,
    student_no:req.body.student_no,
    landlord_email:"charlse@gmail.com",
    // avatar:"http://192.168.1.105:9000/"+req.file.path ,upload.single('avatar')
   }


   
   db.query('INSERT INTO stuissues SET ? ',[ issueData],function (error, results, fields)
{
    if (error) throw error;
    else
    {
      res.send('data updated');
}       
  })

});


//landlord post a notice
router.post('/postnotice/', (req,res)=>{
 
    let notice ={ 
        
        message:req.body.message,
   
    landlord_email:"charlse@gmail.com",
   
   }


   
   db.query('INSERT INTO stu_notification SET ? ',[ notice],function (error, results, fields)
{
    if (error) throw error;
    else
    {
      res.send('notice posted');
}       
  })

});


// use multer to upload images
router.post('/landlodImage/',upload.single('avatar'), (req,res)=>{
 console.log(req.file);
    let issueData ={ 
        // avatar:"192.168.43.92/"+avatar.req.file.path,
    landlord_email:"charlse@gmail.com",
    avatar:"http://192.168.1.105:9000/"+req.file.path
  
   }

   db.query('INSERT INTO images SET ? ',[ issueData],function (error, results, fields)
{
    if (error) throw error;
    else
    {
      res.send('picture upload successfully');
}       
  })

});

//get landlord images

router.get('/getlimages/',(req,res)=>{
    
    db.query('SELECT avatar from images  WHERE  landlord_email="charlse@gmail.com"',(err,rows,fields)=>{
    
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})








//update landlord details
router.post('/updateLand/', (req,res)=>{
    let lordData ={ 
        company_name:req.body.company_name,
        telephone:req.body.telephone,
        house_number: req.body.house_number,
        street_name:req.body.street_name,
        suburb:req.body.suburb ,
        zip_code:req.body.zip_code,
        landlord_email:req.body.landlord_email ,
        city:req.body.city ,
        province:req.body.province,
        country:req.body.country,
        property_name:req.body.property_name,
        Full_name:req.body.Full_name,
       
    }

    db.query('UPDATE landlord SET ? where landlord_email = "'+req.body.landlord_email+'"',[lordData],function (error, results, fields)
    {
        if (error) throw error;
        else
        {
          res.send('data updated');
    }       
      })

  
    });






//insert property
router.post('/insertprop/', (req,res)=>{
 
        let propData ={ 
        //for propety tabble
        campus:req.body.campus,
        numFemale_beds:req.body.numFemale_beds,
        numMale_beds:req.body.numMale_beds,
        bedsPerRoom:req.body.bedsPerRoom,
        num_floors:req.body.num_floors,
        num_rooms:req.body.num_rooms,
        blocks:req.body.blocks,
        landlord_email:req.body.landlord_email

       }
  
       
       db.query('INSERT INTO property SET ? ',[propData],function (error, results, fields)
    {
        if (error) throw error;
        else
        {
          res.send('data updated');
    }       
      })

    });



























//update student details
router.post('/updateStu', (req,res)=>{
    let stuData ={ 
        student_no:req.body.student_no,
        Full_names:req.body.Full_names,
        Last_name:req.body.Last_name,
        Id_no: req.body.Id_no,
        gender:req.body.gender,
        disability:req.body.disability ,
        contact_student:req.body.contact_student ,
        contact_guardian:req.body.contact_guardian ,
        campus_study:req.body.campus_study ,
        faculty:req.body.faculty ,
        course:req.body.course ,
        year_of_admission:req.body.year_of_admission,
        sponsor:req.body.sponsor 
       
       }
  let student = 2161548745;
       
    db.query('UPDATE STUDENT SET ? where student_no = "'+req.body.student_no+'"',[stuData],function (error, results, fields)
    {
        if (error) throw error;
        else
        {
          res.send('data updated');
    }       
      })
    });


//accepted students
router.get('/acceptedstud/',(req,res)=>{
    
    db.query('SELECT * from student WHERE  status="accepted"',(err,rows,fields)=>{

  
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})
//pending students
router.get('/pendingstud/',(req,res)=>{
    
    db.query('SELECT * from student WHERE  status="pending"',(err,rows,fields)=>{
    

  
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
})




//accept pending students/student application
router.post('/acceptStud/:student_no',(req,res)=>{
    db.query('UPDATE student set status="accepted" WHERE student_no= ?',[req.params.student_no],(err,rows)=>{
        if(!err)
            res.send(' student application accepted ');
        else
            console.log(err);
    }) 
});
//reject pending students/student application
router.post('/rejectStud/:student_no',(req,res)=>{
    db.query('UPDATE student set status="rejected" WHERE student_no= ?',[req.params.student_no],(err,rows)=>{
        if(!err)
            res.send(' student application rejected ');
        else
            console.log(err);
    }) 
});















//reject landlord application
router.post('/rejectapp/:landlord_email',(req,res)=>{
    db.query('UPDATE property set status="rejected" WHERE landlord_email= ?',[req.params.landlord_email],(err,rows)=>{
        if(!err)
            res.send('application rejected ');
        else
            console.log(err);
    }) 
});


//post  student issues to the database


//post  student issues to the database










//update landlord information
router.post('/info/:landlord_email',(req,res)=>{
    db.query('UPDATE property set status="rejected" WHERE landlord_email= ?',[req.params.landlord_email],(err,rows)=>{
        if(!err)
            res.send('application rejected ');
        else
            console.log(err);
    }) 
});




/////////////////////////////////////////////////////////////////////////////////////////////



router.get('/getResStatus',(req,res)=>{
    db.query('SELECT * FROM resapplication',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});


///////////////////////////////////////////////////////////////////////////////////////////
 
// router.post('/', (ctx) => {
//     const data = ctx.request.body;
//     const errors = {};
	
// 	if (!String(data.name).trim()) {
// 	errors.name = ['Name is required'];
//  	}
	
//  	if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(data.email))) {
//  		errors.email = ['Email is not valid.'];
// 	}
	
//  	if (Object.keys(errors).length) {
//  		return ctx.error(400, {errors});
// 	}
	
//  	const user = await User.create({
//  			name: data.name,
// 		email: data.email,
//  	});
	
//  	ctx.body = user.toJSON();
//  });
 module.exports = router ;