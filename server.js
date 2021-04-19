require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const con = require('./config/dbconfig')
const session = require('express-session')
const memorystore = require('memorystore')(session)

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Session Manage
app.use(session({
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
    store: new memorystore({
        checkPeriod: 24 * 60 * 60 * 1000
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))




// ===================== PAGE ROUTE ===========================

// Root Service
app.get("/", (req, res) => {
    if (req.session.user) {
        if (req.session.user.role == 1) {
            res.render('superadmin', { user: req.session.user })
        }
        else if (req.session.user.role == 2) {
            res.render('staticvisor', { user: req.session.user })
        }
        else if (req.session.user.role == 3) {
            res.render('adminmain', { user: req.session.user })
        }
        else if (req.session.user.role == 4) {
            res.render('Index', { user: req.session.user })
        }
    }
    else {
        res.render('Login')
    }
})



// =========== Super Admin ===========
// Super Admin Page
app.get('/superadmin', (req, res) => {
    if (req.session.user) {
        res.render('superadmin', { user: req.session.user });
    }
    else {
        res.redirect('/')
    }

});



// ========== User ============
// Materials
app.get('/materialuser', (req, res) => {
    if (req.session.user) {
        res.render('Index', { user: req.session.user });
    }
    else {
        res.redirect('/')
    }
})

// Cart Page
app.get('/cartpage', (req, res) => {
    if(req.session.user){
        res.render('Cart' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
    
})

// Notification Page
app.get('/notificationuser', (req, res) => {
    if(req.session.user){
        res.render('Notification' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// History
// Success
app.get('/histosy(success)', (req, res) => {
    if(req.session.user){
        res.render('History(success)' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})
// Unsuccess
app.get('/history(unsuccess)', (req, res) => {
    if(req.session.user){
        res.render('History(Unsuccess)' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})



// ======================= Admin =========================

// Materials
app.get('/materialadmin', (req, res) => {
    if(req.session.user){
        res.render('material' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// Requisition Page
app.get('/requisition', (req, res) => {
    if(req.session.user){
        res.render('adminmain' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// Detail Requisition
app.get('/detailrequiadmin', (req, res) => {
    if(req.session.user){
        res.render('detailreq' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// Detail wait to complete
app.get('/detailsuccessadmin', (req, res) => {
    if(req.session.user){
        res.render('detailsuccess' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// History Admin
app.get('/historyadmin', (req, res) => {
    if(req.session.user){
        res.render('history' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// Detail History Admin
app.get('/detailhisadmin', (req, res) => {
    if(req.session.user){
        res.render('detailhis' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
});

// Statistic Admin
app.get('/staticadmin', (req, res) => {
    if(req.session.user){
        res.render('statistic' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})



// ===================== Super Visor =======================

// สถิติการเบิกรายคน
app.get('/individualstatistics', (req, res) => {
    if(req.session.user){
        res.render('staticperman' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// รายละเอียดสถิติการเบิกรายคน
app.get('/detaildisbur', (req, res) => {
    if(req.session.user){
        res.render('detailstaperman' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// สถิติการเบิก
app.get('/staticvisor', (req, res) => {
    if(req.session.user){
        res.render('staticvisor' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// ประวัติการเบิก
app.get('/hiswithdrawmat', (req, res) => {
    if(req.session.user){
        res.render('historyrequivisor' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// รายละเอียดประวัติการเบิก
app.get('/detailhiswithdraw', (req, res) => {
    if(req.session.user){
        res.render('detailrequivisor' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// รายการวัสดุ
app.get('/meterialvisor', (req, res) => {
    if(req.session.user){
        res.render('materialvisor' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// ประัติการแก้ไขข้อมูลวัสดุ
app.get('/hiseditmaterial', (req, res) => {
    if(req.session.user){
        res.render('historyedit' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})





// ============================ Other Route ==========================


// ======== Login Service =========
app.post('/login', (req, res) => {
    const token = req.body.token;
    if (token) {
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
            con.query(sql, [email], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Database Server Error")
                }

                // Check User
                if (result.length != 1) {
                    return res.status(400).send('Not a member')
                }

                // Check Active User
                if (result[0].status_user == 1) {

                    // Save User Detail to session
                    req.session.user = { 'user_id': result[0].user_id, 'user_name': result[0].name, 'role': result[0].user_role, 'status': result[0].status_user }

                    if (result[0].image == null) {
                        const sql = 'UPDATE users SET image = ? WHERE email = ?'
                        con.query(sql, [pic, email], (err, result) => {
                            if (err) {
                                console.log(err)
                                return res.status(500).send("Database Error")
                            }
                        })
                    }

                    if (result[0].user_role == 1) {
                        res.send('/superadmin')
                    }
                    else if (result[0].user_role == 2) {
                        res.send('/staticvisor');
                    }
                    else if (result[0].user_role == 3) {
                        res.send('/requisition');
                    }
                    else if (result[0].user_role == 4) {
                        res.send('/materialuser');
                    }


                }
                else {
                    res.status(400).send('Please contact superadmin')
                }
            });
        }).catch((err) => {
            console.log(err)
            res.status(400).send('Token is Invalid!!')
        })
    }
    else {
        console.log('No token')
        res.status(400).send('No token')
    }
})


// Log Out Service
app.get('/logout', (req, res) => {
    // Destroy all session
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    })
})




// ===================== PORT SERVER RUN ======================
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Serve run at PORT " + PORT);
})