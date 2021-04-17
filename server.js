const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname , "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));







// ===================== PORT SERVER RUN ======================
const PORT = 3000;
app.listen(PORT , () => {
    console.log("Serve run at PORT " + PORT);
})