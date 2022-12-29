const express = require('express');
const path = require('path');
const db = require('./server/db');
const bodyparser = require('body-parser');
const flash = require('express-flash');
var session = require('express-session')
const hbs = require('hbs');
const cors = require('cors')
const { DefaultDeserializer } = require('v8');
let alert = require('alert'); 
// var sess;
const app = express();
hbs.registerPartials(path.join(__dirname,'/views/partials/'));

const port = 7777;



app.use(
    session({
        secret: 'secret',
    })
);
// app.use(cors({
//     origin: '*'
// }));

app.use(express.static(path.join(__dirname,"/public/")))
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"/views/"))
app.use(express.urlencoded({ extended: false }));
app.use(flash());


app.get("/",(req,res)=>{

if(req.session.uemail){
    res.redirect("/home");
}
else{

//  var d=    req.flash('logstack')
//  console.log(d);
res.render("dashboard");
}

})




app.get("/rent",(req,res)=>{

// console.log(
if(req.flash("cadd") ==null)
{
    // alert(req.flash("cadd"));

}else{
    alert(req.flash("cadd"));
}
db.query("select * from robj where cat=?",[req.query.request],function(er3,res3){

 if(res3.length > 0){
    db.query("SELECT DISTINCT(cat) FROM robj",function(er7,res7){
        //  console.log(res7);
            res.render("rent",{r:res3,cat:res7});
                    
        })

}
else{
    db.query("select * from robj",function(errr,resu){

        db.query("SELECT DISTINCT(cat) FROM robj",function(er7,res7){
    //  console.log(res7);
        res.render("rent",{r:resu,cat:res7});
                
    })
    })
}


    
})

    
   
})




app.get("/login",(req,res)=>{
    if(req.session.uemail){
        res.redirect("/home");
    }else{
    res.render("login");
    }

})

app.get("/register",(req,res)=>{
    res.render("register");


})











app.get("/home",(req,res)=>{
    // const yy = null;

    if(req.session.uemail && req.session.upwd){


db.query("select * from hash where uid=?",[req.session.uid],function(errt,ress){
if(errt) throw errt;

res.render("home",{id:ress,v:"tamizhaaaaaaaa"});
})

}
    else{
        res.redirect("/login");
    }
})



app.get("/auth/logout",(req,res)=>{
    req.session.destroy();
    // req.flash("logstack","Logged out");
    // res.send("logged OUT _ _ _ _ __ > > >> >> > > >>>")
    res.redirect("/");

})



app.post("/auth/log",(req,res)=>{
    q1 = "select * from hash where uname=? and pwd=?";
db.query(q1,[req.body.email,req.body.pass],function(err,resu){

    if(err){
        res.send("nooooooooo");
    }
else{
    req.session.uemail= resu[0].uname;
    req.session.upwd= resu[0].pwd;
    req.session.uid = resu[0].uid;
    // res.send("yeeeeeeeeeeees");
    res.redirect("/home");
}
})


})


// *
// ! CART 

app.get("/cart",(req,res)=>{
    res.send({
        "page":"cart"
    })
})


app.get("/add/addtocart",(req,res)=>{
    

    // db.query("insert into ucart(oid,uid) values(?,?)",[req.query.oid,req.session.uid],function(errr,resr){
        if(req.session.uemail){
    db.query("insert into ucart(oid,uid) values(?,?)",[req.query.oid,req.session.uid],function(errr,resr){
        req.flash("cadd","added to cart");
       res.redirect("/rent");
    })
        
    }
    else{
        res.redirect("/login");
    }
})












// !

app.get("/contact",(req,res)=>{
    res.json({
        "name":"S.surya",
        "number":8104608876
    })
})


app.get("/about",(req,res)=>{
    res.send({
        "Developer":"S.surya",
        "number":8104608876,
        "used":"NODE JS"
    })
})

app.listen(port,()=>{
    console.log(`Running on port no ${port}`)
})


































// app.post("/create",(req,res)=>{
//     const pu = "insert into hash(uname,pwd) values(?,?)";
//     db.query(pu,[req.body.email,req.body.pass],function(err) {
//         if(err) throw err
//         req.flash("succ","logged");
//         res.redirect("/login");

//     })

// })