require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const con = require('./config/dbconfig')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

app.use(express.static(path.join(__dirname , "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ===================== PAGE ROUTE ===========================

// Root Service
app.get("/" , (req , res) => {
    res.sendFile(path.join(__dirname  , "./view/Login.html" ))
})



// =========== Super Admin ===========
// Super Admin Page
app.get('/superadmin' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/superadmin.html"));
});



// ========== User ============
// Materials
app.get('/materialuser' , (req , res) => {
    res.sendFile(path.join(__dirname  , "./view/Index.html"));
})

// Cart Page
app.get('/cartpage' , (req , res) => {
    res.sendFile(path.join(__dirname  , "./view/Cart.html"));
})

// Notification Page
app.get('/notificationuser' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/Notification.html"));
})

// History
// Success
app.get('/histosy(success)' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/History(success).html"))
})
// Unsuccess
app.get('/history(unsuccess)' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/History(Unsuccess).html"))
})



// ======================= Admin =========================

// Materials
app.get('/materialadmin' , (req , res) =>{
    res.sendFile(path.join(__dirname , "./view/material.html"));
})

// Requisition Page
app.get('/requisition' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/adminmain.html"));
})

// Detail Requisition
app.get('/detailrequiadmin' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/detialreq.html"));
})

// Detail wait to complete
app.get('/detailsuccessadmin' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/detailsuccess.html"));
})

// History Admin
app.get('/historyadmin' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/history.html"));
})

// Detail History Admin
app.get('/detailhisadmin' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/detailhis.htmll"));
});

// Statistic Admin
app.get('/staticadmin' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/statistic.html"))
})



// ===================== Super Visor =======================

// สถิติการเบิกรายคน
app.get('/individualstatistics' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/สถิติการเบิกรายคน.html"))
})

// รายละเอียดสถิติการเบิกรายคน
app.get('/detaildisbur' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/รายละเอียดสถิติการเบิกรายคน.html"))
})

// สถิติการเบิก
app.get('/staticvisor' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/สถิติการเบิก.html"))
})

// ประวัติการเบิก
app.get('/hiswithdrawmat' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/ประวัติการเบิก.html"))
})

// รายละเอียดประวัติการเบิก
app.get('/detailhiswithdraw' , (req , res) => {
    res.sendFile(path.join(__dirname , "./view/รายละเอียดประวัติการเบิก.html"))
})

// รายการวัสดุ
app.get('/meterialvisor' , (req , res) => {
    res.sendFile(path.join(__dirname , "รายการวัสดุ.html"))
})

// ประัติการแก้ไขข้อมูลวัสดุ
app.get('/hiseditmaterial' ,(req , res) => {
    res.sendFile(path.join(__dirname , "./view/ประวัติการแก้ไขข้อมูลวัสดุ.html"))
})





// ============================ Other Route ==========================


// ======== Login Service =========
app.post('/login' , (req , res) => {
    const token = req.body.token;
    if(token){
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        }).then((ticket) => {
            const payload = ticket.getPayload();
            const email = payload.email;
            const pic = payload.picture
            // Verify User with Database

            // User_role: 1 = Superadmin 2 = Supervisor 3 = Admin 4 = Staff
            const sql = 'SELECT user_id , name ,image , user_role , status_user FROM users WHERE email = ?'
            con.query(sql , [email] , (err , result) => {
                if(err){
                    console.log(err);
                    return res.status(500).send("Database Server Error")
                }

                // Check User
                if(result.length != 1){
                    return res.status(400).send('Not a member')
                }

                // Check Active User
                if(result[0].status_user == 1){

                    if(result[0].image == null){
                        const sql = 'UPDATE users SET image = ? WHERE email = ?'
                        con.query(sql , [pic , email] , (err , result) => {
                            if(err){
                                console.log(err)
                                return res.status(500).send("Database Error")
                            }
                        })
                    }

                    if(result[0].user_role == 1){
                        res.send('/superadmin')
                    }
                    else if(result[0].user_role == 2){
                        res.send('/staticvisor');
                    }
                    else if(result[0].user_role == 3){
                        res.send('/requisition');
                    }
                    else if(result[0].user_role == 4){
                        res.send('/materialuser');
                    }
                }
                else{
                    res.status(400).send('Please contact superadmin')
                }
            });
        }).catch((err) => {
            console.log(err)
            res.status(400).send('Token is Invalid!!')
        })
    }
    else{
        console.log('No token')
        res.status(400).send('No token')
    }
})




// ===================== PORT SERVER RUN ======================
const PORT = process.env.PORT;
app.listen(PORT , () => {
    console.log("Serve run at PORT " + PORT);
})