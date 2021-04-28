
const express = require("express");
const app =express();

require("./db/conn");
const Student = require("./models/students"); 
const port = process.env.PORT ||3000;


app.use(express.json());


// // using promise
// app.post("/students",(req,res) =>{
//          console.log(req.body);

//          //getting data from postman
//         const user = new Student(req.body);
        
//         //to store data on mongodb 
//         //handelling promise and return
//         user.save()
//         .then(()=>{
//             res.send(user);
//         })
//         .catch((e)=>{
//             res.send(e);
//         })
// })

//using async await
app.post("/students",async(req,res)=>{
try{
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);

}catch(e){res.status(400).send(e);}

})

//to get student data from database or server
app.get("/students",async(req,res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    
    }catch(e){res.send(e);}
    
    })

//To get individual data of student by id
app.get("/students/:id",async(req,res)=>{
    try{
        const _id =req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);
        console.log(studentData);
    
    }catch(e){res.status(500).send(e);}
    
    })

//update student data
app.patch("/students/:id",async(req,res)=>{
    try{
        const _id =req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateStudent);
        console.log(updateStudent);
    
    }catch(e){res.status(500).send(e);}
    
    })
    
//delete student data
app.delete("/students/:id",async(req,res)=>{
    try{
        const _id =req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if(!_id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
        console.log(deleteStudent);
    
    }catch(e){res.status(500).send(e);}
    
    })



//To get individual data of student by name  
    // app.get("/students/:phone",async(req,res)=>{

        
    //     try{
    //         console.log("hellllooooooo");
    //         console.log(req.params.name);
    //         const _name =req.params;
          
    //         const studentData = await Student.findOne({ 'name': '_name' });
    //         res.send(studentData);
            
        
    //     }catch(e){res.status(500).send(e);}
        
    //     })





// app.get("/",(req,res) =>{
//     res.send("hello from the other side");
// })

app.listen(port,()=>{
    console.log(`my connection is running at ${port} no `);
})