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



// =========================================== Super Admin =============================================
// Super Admin Page
app.get('/superadmin', (req, res) => {
    if (req.session.user) {
        res.render('superadmin', { user: req.session.user });
    }
    else {
        res.redirect('/')
    }

});

// เพิ่มเติม
app.get('/getuser', (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database Server Error")
        } else {
            res.send(result);
        }
    });
})

app.post('/adduser', (req, res) => {
    const { iduser, rank, name, email, role } = req.body;
    // console.log(iduser + " " + rank + " " + name + " " + lastname + " " + email + " " + role);
    const sql = 'INSERT INTO users (user_id , email , name , rank , status_user , user_role) VALUES (?,?,?,?,?,?);';
    con.query(sql, [iduser, email, name, rank, 1, role], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.affectedRows != 1) {
                console.log("INSERT ERROR");
            } else {
                res.send("done");
            }
        }
    });


});


app.post('/disuser', (req, res) => {
    const { user_id } = req.body;
    // console.log(user_id);
    const sql = 'UPDATE users SET status_user=2  WHERE user_id=?';
    con.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.affectedRows != 1) {
                console.log("UPDATE ERROR");
            } else {
                res.send("done");
            }
        }
    });

});

app.post('/enauser', (req, res) => {
    const { user_id } = req.body;
    // console.log(user_id);
    const sql = 'UPDATE users SET status_user=1  WHERE user_id=?';
    con.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.affectedRows != 1) {
                console.log("UPDATE ERROR");
            } else {
                res.send("done");
            }
        }
    });
})

app.post('/deleteuser', (req, res) => {
    const { user_id } = req.body;
    // console.log(user_id);
    const sql = 'DELETE FROM users WHERE user_id=?';
    con.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.affectedRows != 1) {
                console.log("DELETE ERROR");
            } else {
                res.send("done");
            }
        }
    });
});

// =========================================================== User =============================================================
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
app.get('/historysucuser', (req, res) => {
    if(req.session.user){
        res.render('History(success)' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})
// Unsuccess
app.get('/historyunsucuser', (req, res) => {
    if(req.session.user){
        res.render('History(Unsuccess)' , {user: req.session.user})
    }
    else{
        res.redirect('/')
    }
})

// ============ Material Page ==============
app.get('/datamaterials', (req, res) => {
    const sql = "SELECT * FROM material"
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        else {
            res.send(result)
        }
    })
})


//Get data From Category
app.post('/dataCategory', (req, res) => {
    const { cate_id } = req.body;
    if (cate_id == 8) {
        res.redirect("/datamaterials");
    } else {
        const sql = "SELECT * FROM material WHERE category_id = ?"
        con.query(sql, [cate_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send("Databse Server Error")
            }
            else {
                res.send(result)
            }
        })
    }

})

// ===================== Category =========================
app.get('/category', (req, res) => {
    const sql = "SELECT * FROM category"
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        else {
            res.send(result);
        }
    })
})


// Notification Page

// ===================== Count All Notification =================
app.post('/countnoti', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;

        const sql = "SELECT COUNT(requisition.requisition_id) 'COUNTNOTI' FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE requisition.read_requisition = 0 AND users.user_id = ? "
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Database Server Error');
            }
            else {
                res.send(result);
            }
        })
    }

})

// ======================= Count Wait Confirm =========================
app.post('/countwaitconfirm', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;

        const sql = "SELECT COUNT(requisition.requisition_id) 'COUNTNOTI' FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE users.user_id = ? AND requisition.status_requisition = 1 "
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Database Server Error');
            }
            else {
                res.send(result);
            }
        })
    }
})


// ======================= Count Confirm Noti =============================
app.post('/countconfirm', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;

        const sql = "SELECT COUNT(requisition.requisition_id) 'COUNTNOTI' FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE users.user_id = ? AND requisition.status_requisition = 2 "
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Database Server Error');
            }
            else {
                res.send(result);
            }
        })
    }
})



// ===================== Count Disapproval =========================
app.post('/countdisapproval', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;

        const sql = "SELECT COUNT(requisition.requisition_id) 'COUNTNOTI' FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE users.user_id = ? AND requisition.status_requisition = 3 AND requisition.read_requisition = 0"
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Database Server Error');
            }
            else {
                res.send(result);
            }
        })
    }
})



// ====================== Count Complete ==========================
app.post('/countcomplete', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;

        const sql = "SELECT COUNT(requisition.requisition_id) 'COUNTNOTI' FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE users.user_id = ? AND requisition.status_requisition = 4 AND requisition.read_requisition = 0"
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Database Server Error');
            }
            else {
                res.send(result);
            }
        })
    }
})

// ====================== All Requisition User ==========================
app.post('/allrequisitionuser', (req, res) => {

    if (req.session.user) {
        const user_id = req.session.user.user_id;
        const sql = "SELECT * FROM requisition JOIN users ON users.user_id = ? WHERE requisition.user_id = users.user_id";
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Database Server Error')
            }
            else {
                res.json(result)
            }
        })
    }
})


// ================ Wait approve Requisition ========================
app.post('/waitapproverequisition', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;
        const sql = "SELECT * FROM requisition JOIN users ON requisition.status_requisition = 1 AND users.user_id = ? WHERE requisition.user_id = users.user_id"
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Database Server Erorr');
            }
            else {
                res.json(result);
            }
        })
    }
})


// =================== Confirm Requisition ====================
app.post('/aprroverequisition', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;
        const sql = "SELECT * FROM requisition JOIN users ON requisition.status_requisition = 2 AND users.user_id = ? WHERE requisition.user_id = users.user_id"
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Database Server Erorr');
            }
            else {
                res.json(result);
            }
        })
    }
})


// =================== Disapproval Requisition =========================
app.post('/disapprovalrequisition', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;
        const sql = "SELECT * FROM requisition JOIN users ON requisition.status_requisition = 3 AND users.user_id = ? WHERE requisition.user_id = users.user_id AND requisition.read_requisition = 0"
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send('Database Server Error');
            }
            else {
                const sql = "UPDATE requisition JOIN users SET read_requisition = 1 WHERE requisition.status_requisition = 3 AND users.user_id = ?"
                con.query(sql, [user_id], (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('Database Errro')
                    }
                })
                res.json(result);
            }
        })
    }
})


// ==================== Complete Requisition =============================
app.post('/completerequisition', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.user_id;
        const sql = "SELECT * FROM requisition JOIN users ON requisition.status_requisition = 4 AND users.user_id = ? WHERE requisition.user_id = users.user_id AND requisition.read_requisition = 0"
        con.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Database Server Error')
            }
            else {
                const sql = "UPDATE requisition JOIN users SET read_requisition = 1 WHERE requisition.status_requisition = 4 AND users.user_id = ?"
                con.query(sql, [user_id], (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send('Database Error')
                    }
                })
                res.json(result);
            }
        })
    }
})


// ==================== Data Requisition ==========================
app.post('/datareq', (req, res) => {
    const requi_id = req.body.requi_id;

    const sql = "SELECT * FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE requisition.requisition_id = ?"
    con.query(sql, [requi_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Server Error')
        }
        else {
            res.json(result);
        }
    })
})


// ================== Material in Requisition =======================
app.post('/datamaterial', (req, res) => {
    const requi_id = req.body.requi_id;

    const sql = "SELECT * FROM material_requisiotion JOIN material ON material_requisiotion.material_id = material.material_id WHERE material_requisiotion.requisition_id = ?"
    con.query(sql, [requi_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Server Error')
        }
        else {
            res.json(result);
        }
    })
})

app.post('/createRequisition', (req, res) => {
    const { objective, annotation } = req.body;
    const user_id = req.session.user.user_id;
    const sql = 'INSERT INTO requisition(objective , annotation , date_requisition , time_requisition , status_requisition , read_requisition , user_id) VALUES (? , ? , CURDATE() , CURTIME() , 1 , 0 , ?)';
    con.query(sql, [objective, annotation, user_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Server Error')
        }
        else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send('Insert Error')
            } else {
                res.send();
            }
        }
    });
});

app.post('/addmatrequi', (req, res) => {
    const { material_id, numbermaterial } = req.body;
    const user_id = req.session.user.user_id;
    const sql = 'SELECT MAX(requisition.requisition_id) AS requisition_id FROM requisition WHERE requisition.user_id = ?';
    con.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Server Error')
        }
        else {
            console.log(material_id);
            const sql = 'INSERT INTO material_requisiotion(material_requisiotion.requisition_id , material_requisiotion.material_id , material_requisiotion.amount_of_requisition , material_requisiotion.amount_if_divide) VALUES (? , ? , ? , 0)';
            con.query(sql, [result[0].requisition_id, material_id, numbermaterial], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Database Server Error')
                }
                else {
                    res.send();
                }
            })
        }
    });
})



// ========================================================= Admin ===============================================================

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

//เพิ่มเติม 
app.get('/getrequisition', (req, res) => {
    const sql = 'SELECT date_requisition , requisition_id ,status_requisition , users.name FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE requisition.status_requisition = 1 OR requisition.status_requisition = 2';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
            
        }
    });
})

app.post('/datareq', (req, res) => {
    const idreq = req.body.requi_id;
    const sql = 'SELECT * FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE requisition.requisition_id = ?';
    con.query(sql, [idreq], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    });
});

app.post('/datamaterial', (req, res) => {
    const  idreq  = req.body.requi_id;
    const sql = 'SELECT * FROM material_requisiotion JOIN material ON material_requisiotion.material_id = material.material_id WHERE material_requisiotion.requisition_id = ?';
    con.query(sql, [idreq], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    })
});

app.post('/approve', (req, res) => {
    const { idreq } = req.body;
    const user_id = req.session.user.user_id;
    const sql = 'UPDATE requisition SET requisition.status_requisition = 2, requisition.admin_id_approval = ? WHERE requisition.requisition_id = ?';
    con.query(sql, [user_id, idreq], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send("UPDATE ERROR");
            } else {
                res.send("/requisition");
            }
        }
    });
})

app.post('/updateAmountM', (req, res) => {
    const { requisition_id, material_id, number_of_requisition } = req.body;
    const sql = 'UPDATE material_requisiotion SET material_requisiotion.amount_of_divide = ? WHERE material_requisiotion.requisition_id = ? AND material_requisiotion.material_id = ?';
    con.query(sql, [number_of_requisition, requisition_id, material_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send("UPDATE ERROR");
            } else {
                const sql = 'UPDATE material JOIN material_requisiotion ON material.material_id = ? JOIN requisition ON requisition.requisition_id = material_requisiotion.requisition_id AND requisition.requisition_id = ? SET material.material_number = material.material_number - material_requisiotion.amount_of_divide';
                con.query(sql, [material_id, requisition_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("DATABASE ERROR");
                    } else {
                        if (result.affectedRows != 1) {
                            console.log(err);
                            res.status(500).send("UPDATE ERROR");
                        } else {
                            res.send("success");
                        }
                    }
                });
            }
        }
    });

})

app.post('/unapprove', (req, res) => {
    const { requisition_id, txtcomment } = req.body;
    const sql = 'UPDATE requisition SET requisition.status_requisition = 3 , requisition.annotation_of_disproval = ? WHERE requisition.requisition_id = ?';
    con.query(sql, [txtcomment, requisition_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send("UPDATE ERROR");
            } else {
                res.send("/requisition");
            }
        }
    });
})

app.post('/complete', (req, res) => {
    const { requisition_id } = req.body;
    const user_id = req.session.user.user_id;
    const sql = 'UPDATE requisition SET requisition.status_requisition = 4 ,requisition.admin_id_success = ?, requisition.date_pickup = CURDATE() , requisition.time_pickup = CURTIME() WHERE requisition.requisition_id = ?';
    con.query(sql, [user_id, requisition_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send("UPDATE ERROR");
            } else {
                res.send("/requisition");
            }
        }
    });
})

app.get('/allDatahisadmin', (req, res) => {
    const sql = 'SELECT requisition.requisition_id , requisition.date_requisition , status_requisition , users.name FROM requisition JOIN users ON requisition.user_id = users.user_id  AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = MONTH(CURDATE()) WHERE requisition.status_requisition = 3 OR requisition.status_requisition = 4';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    });
});

app.post('/selectmonth', (req, res) => {
    const { month } = req.body;
    const sql = 'SELECT requisition.requisition_id , requisition.date_requisition , status_requisition , users.name FROM requisition JOIN users ON requisition.user_id = users.user_id AND MONTH(requisition.date_requisition) = ? AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) WHERE requisition.status_requisition = 3 OR requisition.status_requisition = 4';
    con.query(sql, [month], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    })
})

app.post('/dataHisreq', (req, res) => {
    const { idreq } = req.body;
    const sql = 'SELECT requisition.status_requisition , requisition.requisition_id , requisition.objective , requisition.date_requisition , requisition.time_requisition , users.name , requisition.date_pickup , requisition.time_pickup FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE requisition.requisition_id = ?';
    con.query(sql, [idreq], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    });
})

app.post('/dataHismaterial', (req, res) => {
    const { idreq } = req.body;
    const sql = 'SELECT material_requisiotion.material_id , material.material_name , material.unit , material_requisiotion.amount_of_requisition, material_requisiotion.amount_of_divide FROM material_requisiotion JOIN material ON material_requisiotion.material_id = material.material_id WHERE material_requisiotion.requisition_id = ?';
    con.query(sql, [idreq], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    });
});

app.get('/getAllDatamaterial', (req, res) => {
    const sql = 'SELECT * FROM material';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    });
});

app.post('/getsomecategory', (req, res) => {
    const { category_id } = req.body;
    if (category_id == 8) {
        res.redirect('/getAllDatamaterial')
    } else {
        const sql = 'SELECT * FROM material  WHERE category_id = ?';
        con.query(sql, [category_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("DATABASE ERROR");
            } else {
                res.send(result);
            }
        });
    }

});


app.get('/getcategory', (req, res) => {
    const sql = 'SELECT * FROM category ';
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            res.send(result);
        }
    })
})

app.post('/addmaterial', (req, res) => {
    const { material_id, material_name, material_number, unit, category_id } = req.body;
    const user_id = req.session.user.user_id;
    const sql = 'INSERT INTO material (material_id,material_name,material_number,unit,category_id) VALUES (?,?,?,?,?)';
    con.query(sql, [material_id, material_name, material_number, unit, category_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR 1");
        } else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send("UPDATE ERROR 1");
            } else {

                const sql = 'INSERT INTO manage_stock (date_manage , time_manage , number_material ,status_manage_stock , material_id , user_id) VALUES (CURDATE(), CURTIME(), ? , ? ,  ? , ?)';
                con.query(sql, [material_number, 2, material_id, user_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("DATABASE ERROR");
                    } else {
                        if (result.affectedRows != 1) {
                            console.log(err);
                            res.status(500).send("UPDATE ERROR 1");
                        } else {
                            res.send();
                        }

                    }
                })
            }
        }
    });
})

app.post('/editmaterial', (req, res) => {
    const { material_name, plusnumber, unit, material_id } = req.body;
    const sql = 'UPDATE material SET material.material_name = ?, material.material_number = material.material_number + ? , unit = ? WHERE material.material_id = ?';
    con.query(sql, [material_name, plusnumber, unit, material_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("DATABASE ERROR");
        } else {
            if (result.affectedRows != 1) {
                console.log(err);
                res.status(500).send("UPDATE ERROR 1");
            } else {
                const sql = 'INSERT INTO manage_stock (date_manage , time_manage , number_material ,status_manage_stock , material_id , user_id) VALUES (CURDATE(), CURTIME(), ? , ? ,  ? , ?)';
                const user_id = req.session.user.user_id;
                con.query(sql, [plusnumber, 1, material_id, user_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("DATABASE ERROR");
                    } else {
                        if (result.affectedRows != 1) {
                            console.log(err);
                            res.status(500).send("UPDATE ERROR 1");
                        } else {
                            res.send();
                        }

                    }
                });
            }

        }
    });
});

// ทั้งหมด
app.post('/getstaticdashallpermonth', (req, res) => {

    const month = req.body.month_se

    const sql = "SELECT COUNT(requisition.status_requisition) AS 'allrequi' , MONTH(CURDATE()) AS 'curmonth' FROM requisition WHERE requisition.status_requisition = 4 OR requisition.status_requisition =  3 AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = ?"
    con.query(sql, [month] , (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else {
            res.json(result);
        }
    })
})


// ไม่อนุมัติ
app.post('/getstaticdashunapppermonth' , (req , res) => {
    const month = req.body.month_se

    const sql = "SELECT COUNT(requisition.status_requisition) AS 'disrequi' FROM requisition WHERE requisition.status_requisition = 3 AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = ?"
    con.query(sql, [month] , (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else {
            res.json(result);
        }
    })
})


// อนุมัติ
app.post('/getstaticdashboardpermonth' , (req , res) => {
    const month = req.body.month_se

    const sql = "SELECT COUNT(requisition.status_requisition) AS 'apprequi' FROM requisition WHERE requisition.status_requisition = 4 AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = ?"
    con.query(sql, [month] , (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        } else {
            res.json(result);
        }
    })
})


// กราฟ เดือน
app.post('/getstaticgraphpermonth' , (req ,res) => {
    const month = req.body.month_se;

    const sql = "SELECT category.category_id,category.category_name ,SUM(material_requisiotion.amount_of_divide) AS 'approve' , SUM(material_requisiotion.amount_of_requisition) - SUM(material_requisiotion.amount_of_divide) AS 'disapproval' FROM category JOIN material ON category.category_id = material.category_id JOIN material_requisiotion ON material.material_id = material_requisiotion.material_id LEFT JOIN requisition ON material_requisiotion.requisition_id = requisition.requisition_id WHERE requisition.status_requisition IN (3,4) AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = ? GROUP BY category.category_id"

    con.query(sql, [month] , (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else {
            res.json(result);
        }
    })
})


//Import Materials
app.post('/importmaterial', (req, res) => {
    const { material_id, material_name, material_unit, category_id } = req.body;
    const sql = "INSERT INTO material (material_id,material_name,material_number,unit,category_id) VALUES (?,?,?,?,?)";
    con.query(sql, [material_id, material_name, 0, material_unit, category_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else {
            if (result.affectedRows == 0) {
                console.log(err);
                res.status(500).send("INSERT ERROR 1");
            } else {
                res.send();
            }
        }
    });
})

// ===================================================== Super Visor ==========================================================

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
        res.render('detailrequisvisor' , {user: req.session.user})
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

// =================== สถิติการเบิกรายคนของทุกเดือน ==============================
app.get('/staticallmonth' , (req, res ) => {
    const sql = "SELECT users.user_id, users.name , COUNT(requisition.requisition_id) AS 'REQUIPERMONTH' FROM requisition JOIN users ON requisition.user_id = users.user_id GROUP BY users.user_id"
    con.query(sql , (err , result) => {
        if(err){
            console.log(err)
            res.status(500).send('Database Server Erorr');
        }
        else{
            res.json(result)
        }
    })
})


// ========================= สถิติการเบิกรายคนของแต่ละเดือน =========================
app.post('/staticreqpermonth' , (req , res) => {

    const month = req.body.month

    const sql = "SELECT users.user_id , users.name , COUNT(requisition.requisition_id) AS 'REQUIPERMONTH' FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE MONTH(requisition.date_requisition) = ? GROUP BY users.user_id"
    con.query(sql , [month] , (err , result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error");
        }
        else{
            res.json(result);
        }
    })
})

// ======================== รายละเอียดสถิติการเบิกรายคน/เดือน =================================
app.post('/detailstaticpermanmonth' , (req , res) => {

    const month = req.body.month;
    const user_id = req.body.user_id

    const sql = "SELECT requisition.date_requisition , requisition.time_requisition , material_requisiotion.material_id , material.material_name , material_requisiotion.amount_of_requisition , material.unit FROM material_requisiotion JOIN requisition ON material_requisiotion.requisition_id = requisition.requisition_id JOIN material ON material_requisiotion.material_id = material.material_id JOIN users ON users.user_id = requisition.user_id WHERE users.user_id = ? AND MONTH(requisition.date_requisition) = ?"

    con.query(sql , [user_id , month] , (err ,result ) => {
        if(err){
            console.log(err)
            res.status(500).send("Database Server Error")
        }
        else{
            res.json(result);
        }
    })
})

// ============================= รายละเอียดสถิติการเบิกรายคน ==========================
app.post('/detailstaticperman' , (req , res) => {
    const user_id = req.body.user_id;
    
    const sql = "SELECT requisition.date_requisition , requisition.time_requisition , material_requisiotion.material_id , material.material_name , material_requisiotion.amount_of_requisition , material.unit FROM material_requisiotion JOIN requisition ON material_requisiotion.requisition_id = requisition.requisition_id JOIN material ON material_requisiotion.material_id = material.material_id JOIN users ON users.user_id = requisition.user_id WHERE users.user_id = ? "

    con.query(sql , [user_id] , (err ,result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Error")
        }
        else{
            res.json(result);
        }
    })
})

// ========================= รายการวัสดุทั้งหมด =============================
app.post('/materialsuperall' , (req , res) => {
    const sql = "SELECT * FROM material"
    con.query(sql , (err , result) => {
        if(err){
            console.log(err)
            res.status(500).send('Database Server Error');
        }
        else{
            res.json(result);
        }
    })
})

// ========================= รายการวัสดุ ============================
app.post('/materialsuper' , (req ,res) => {
    const category = req.body.category

    const sql = "SELECT * FROM material WHERE category_id = ?"
    con.query(sql , [category] , (err , result ) => {
        if(err){
            console.log(err)
            res.status(500).send('Database Server Error')
        }
        else{
            res.json(result)
        }
    })
})


// ======================== ประวัติการเบิกของ User =============================
app.get('/hisvisor' , (req , res) => {
    const sql = "SELECT * FROM requisition WHERE YEAR(requisition.date_requisition) = YEAR(CURDATE())";
    con.query(sql , (err ,result) => {
        if(err){
            console.log(err);
            res.status(500).send('Database Server Error');
        }
        else{
            res.json(result);
        }
    })
})

// ======================== รายละเอียดใบเบิก ==============================
app.post('/datareqvisor' , (req , res) => {
    const requi_id = req.body.requi_id

    const sql = "SELECT * FROM requisition JOIN users ON requisition.user_id = users.user_id WHERE requisition.requisition_id = ?"
    con.query(sql , [requi_id] , (err ,result) => {
        if(err){
            console.log(err)
            res.status(500).send("Database Server Error");
        }
        else{
            res.json(result);
        }
    })
})

// ============================ วัสดุในใบเบิก =============================
app.post('/datamaterialvisor' , (req , res) => {
    const requi_id = req.body.requi_id

    const sql = "SELECT * FROM material_requisiotion JOIN material ON material_requisiotion.material_id = material.material_id WHERE material_requisiotion.requisition_id = ?"
    con.query(sql , [requi_id] , (err ,result) => {
        if(err){
            console.log(err)
            res.status(500).send("Database Server Error");
        }
        else{
            res.json(result);
        }
    })
})


// ========================== ประวัติการแก้ไขวัสดุ ==============================
app.get('/detaileditmat' , (req , res) => {
    
    const sql = "SELECT manage_stock.date_manage , manage_stock.time_manage , users.name ,manage_stock.status_manage_stock , material.material_name , manage_stock.number_material , material.unit FROM manage_stock JOIN users ON manage_stock.user_id = users.user_id JOIN material ON manage_stock.material_id = material.material_id"
    con.query(sql , (err , result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else{
            res.json(result)
        }
    })
})

// ================================= สถิติ ====================================
// Show Dash Board

// All Requisition
app.get('/getstaticdashall', (req, res) => {
    const sql = "SELECT COUNT(requisition.status_requisition) AS 'allrequi' , MONTH(CURDATE()) AS 'curmonth' FROM requisition WHERE requisition.status_requisition = 4 OR requisition.status_requisition =  3 AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = MONTH(CURDATE())"
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else {
            res.json(result);
        }
    })
})

// Approve Requisition
app.get('/getstaticdashboard' , (req, res) => {
    const sql = "SELECT  DISTINCT(SELECT COUNT(a.requisition_id) FROM requisition a WHERE a.status_requisition = 4) AS 'apprequi' FROM requisition JOIN material_requisiotion ON requisition.requisition_id = material_requisiotion.requisition_id WHERE material_requisiotion.amount_of_requisition = material_requisiotion.amount_of_divide AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = MONTH(CURDATE())"
    con.query(sql , (err , result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error")
        }else{
            res.json(result);
        }
    })

})

// Disapproval Requisition
app.get('/getstaticdashunapp' , (req , res) => {
    const sql = "SELECT COUNT(requisition.status_requisition) AS 'disrequi' FROM requisition WHERE requisition.status_requisition = 3 AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = MONTH(CURDATE())"
    con.query(sql , (err , result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else{
            res.json(result);
        }
    })
})

// Static Graph
app.get('/getstaticgraph' , (req , res) => {
    const sql = "SELECT category.category_id,category.category_name ,SUM(material_requisiotion.amount_of_divide) AS 'approve' , SUM(material_requisiotion.amount_of_requisition) - SUM(material_requisiotion.amount_of_divide) AS 'disapproval' FROM category JOIN material ON category.category_id = material.category_id JOIN material_requisiotion ON material.material_id = material_requisiotion.material_id LEFT JOIN requisition ON material_requisiotion.requisition_id = requisition.requisition_id WHERE requisition.status_requisition IN (3,4) AND YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = MONTH(CURDATE()) GROUP BY category.category_id"

    con.query(sql , (err , result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else{
            res.json(result);
        }
    })
})

// Static Data Table
app.get('/getstaticmaterial' , (req , res) => {

    const sql = "SELECT material_requisiotion.material_id AS 'id' ,material.material_name AS 'material' , ROUND(SUM(material_requisiotion.amount_of_requisition)/3) AS 'requipermonth' , ROUND(SUM(material_requisiotion.amount_of_divide)/3) AS 'approve' , ROUND(SUM(material_requisiotion.amount_of_requisition)/3) - ROUND(SUM(material_requisiotion.amount_of_divide)/3) AS 'disapproval' , material.unit FROM material_requisiotion JOIN requisition ON requisition.status_requisition = 4 OR requisition.status_requisition = 3 AND requisition.requisition_id = material_requisiotion.requisition_id JOIN material ON material.material_id = material_requisiotion.material_id JOIN category ON material.category_id = category.category_id WHERE YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = MONTH(CURDATE()) GROUP BY material_requisiotion.material_id"
    
    con.query(sql , (err , result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else{
            res.send(result);
        }
    })
})

app.post('/getstaticmaterialpermonth' , (req ,res) => {
    const category = req.body.cate_id

    const sql = "SELECT material_requisiotion.material_id AS 'id' ,material.material_name AS 'material' , ROUND(SUM(material_requisiotion.amount_of_requisition)/3) AS 'requipermonth' , ROUND(SUM(material_requisiotion.amount_of_divide)/3) AS 'approve' , ROUND(SUM(material_requisiotion.amount_of_requisition)/3) - ROUND(SUM(material_requisiotion.amount_of_divide)/3) AS 'disapproval' , material.unit FROM material_requisiotion JOIN requisition ON requisition.status_requisition = 4 OR requisition.status_requisition = 3 AND requisition.requisition_id = material_requisiotion.requisition_id JOIN material ON material.material_id = material_requisiotion.material_id JOIN category ON material.category_id = category.category_id AND material.category_id = ? WHERE YEAR(requisition.date_requisition) = YEAR(CURDATE()) AND MONTH(requisition.date_requisition) = MONTH(CURDATE()) GROUP BY material_requisiotion.material_id"

    con.query(sql , category , (err ,result) => {
        if(err){
            console.log(err);
            res.status(500).send("Database Server Error")
        }
        else{
            res.send(result)
        }
    })
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


// ======================= Log Out Service ===========================
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