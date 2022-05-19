const { response } = require('express');
const express = require('express');
const { render } = require('express/lib/response')
const app = express();
const mong = require('mongoose');
const path = require('path');
const Det = require('./models/database');
const bodyparser = require('body-parser');
const details = require('./models/database');
const cookieParser = require('cookie-parser');
const transactions = require('./models/transactions');
const portfolios = require('./models/portfolio');
const { nextTick } = require('process');
const admin_users = require("./models/admin");

// const session = require("express-session");
// const MongoDBSession = require('connect-mongodb-session')(session);
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use()

const dbUrl = "mongodb+srv://SANJU:sanju_123456@cluster0.f8yjf.mongodb.net/ffsd_project?retryWrites=true&w=majority"

mong.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");

})


app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/help", (req, res) => {
    res.render("help");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/transactions/:token", async(req, res) => {

    const uname = req.params.token;
    const user = await details.findOne({ username: uname });

    if(!user)
    {
        res.redirect("/login")
    }
    else{
    res.render("Transactions",{title:uname,token:uname});
    }
})

app.get("/aboutus", (req, res) => {
    res.render("aboutus");
})

app.post('/register', async (req, res) => {

    const data = new details({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
    })
    const user = await details.findOne({ username: req.body.username });
    if (!user) {
        const token = await data.generateAuthtoken();
        // console.log('Register-token part ' + token);
        // const registered=await;
        data.save().then(res.redirect('/login')).catch((err) => {
            console.log(err);
        })
    } else {
        console.log("User Registered Already or username already exists");
        res.redirect("/login");
    }

})

app.get('/login/admin',(req,res)=>
{
    res.render("admin_login");

})

app.get("/loggedin/admin/:token",async (req,res)=>
{
    const uname = req.params.token;
    // const user = await admin_users.findOne({ username: uname });
    let users = details.find({});
            users.exec((err, data) => {
                if (err) throw err;

                res.render("admin", { data: data, usernameAdmin:uname });
  
})
})

app.post("/deleteuser/:token", async (req,res)=>
{
    let userID = req.body.userID;
    let adminUsername = req.body.adminUsername;
    console.log(req.body);

    const users = await details.deleteOne({_id: userID});
    res.json({redirect: '/loggedin/admin/'+adminUsername});

}
)

app.post("/login/admin", async (req,res)=>
{
const username = req.body.username;
const user = await admin_users.findOne({ username: username });

if (user.password === req.body.password) {

    // req.session.isAuth=true;
    res.redirect("/loggedin/admin/"+username);
   
} else {
    res.redirect("/login/admin")
}
})

app.post('/login', async(req, res) => {

    const uname = req.body.username;
    const user = await details.findOne({ username: uname });
    // console.log(user.password);
    // const token = await user.generateAuthtoken();

    // res.cookie("jwt", token);
    // console.log('Login- token part ' + token);
    if(!user)
    {
        res.redirect("/login");
    }
    else if(user.password === req.body.password) {

        // req.session.isAuth=true;
        res.redirect("/profile/"+uname);
       

    } else {
        res.redirect("/login")
    }

})


app.get("/profile/:token", async (req, res, next) => {
    const uname = req.params.token;
    
    const user = await details.findOne({ username: uname });
    
    if(!user)
    {
        res.redirect("/login")
    }
    else{
        transactions.find({},(err,row)=>
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.render("sidebar",{title:uname,data:row,token:uname})
                }
            })
       
    }

  });

app.post("/profile/:token",async (req,res,next)=>
  {
    const uname = req.params.token;

    console.log(req.body.search,req.body.uname);

    const user = await details.findOne({ username: uname });
    if(!user)
    {
      res.redirect("/login")
    }
    else
    {
        // const seach = req.body.search;
        // console.log(req.body.search);
        // const users = await details.deleteOne({_id: userID});
        // res.json({redirect: '/loggedin/admin/'+adminUsername});
       transactions.deleteMany({ticker:req.body.search},(err,row)=>
       {
           if(err)
           {
               console.log(err)
           }
           else
           {
               console.log(row)
            
            //  res.redirect("/profile/search/"+req.body.search)
            res.json({redirect: '/profile/'+uname});
           }
       })
   
    }
  })

// app.post("/profile/search/:token",(req,res)=>
// {
//     const search = req.params.token;
//     transactions.find({ticker:search},(err,row)=>
//     {
//         if(err)
//         {
//             console.log(err)
//         }
//         else
//         {
//             // res.render("sidebar",{data:row})
//             console.log(req.body.search)
//         }
//     })


// })

app.post("/transactions/read/:token",async(req,res)=>
{
const new_tok = req.body.add_token;
console.log(new_tok);
const trans_go = await details.findOne({ username: new_tok });
if(!trans_go)
{
    res.redirect("/login")
}

else
{
    res.json({redirect:"/transactions/"+new_tok})
}
})

app.post("/transactions/:token", async(req, res) => {
    
    const uname = req.params.token;
    console.log(req.body.itoken);
    const user = await details.findOne({ username: uname });
    if(!user)
    {
        res.redirect("/login")
    }
    else{
    console.log("helll"+req.body)
    const trans = new transactions({
        trans_Date: req.body.date,
        ticker: req.body.ticker,
        action: req.body.select,
        quantity: req.body.quantity,
        price: req.body.price,
        total: req.body.total,
    })
    // console.log(trans)
    // trans.aggregate(
    //     [
    //         {$group: {_id: "$ticker",total:{$sum: "$total"}}}
    //     ]
    // )
    // console.log(transactions);
    trans.save().then((result)=>{res.json({redirect:"/profile/"+uname})}).catch((err) => {
        console.log(err);
    })
} 

})

app.listen(3010, 'localhost', () => {
    console.log("Server is running")
})
