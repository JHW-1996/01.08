var express=require('express')
var router=express.Router();
var mysql=require('mysql');
var bodyParser=require('body-parser')
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'zcdl',
	port:3306
})
router.use(bodyParser.urlencoded({}));

router.use('/up',function(req,res){
    var user=req.body.user;
    var pass=req.body.pass;
    pool.query('SELECT * FROM jhw',function(err,rows){
        if(err) throw err;
      for(i in rows){
            if(rows[i].user == user){
                res.send("用户名已注册");
                return;
            }
        }
        pool.query(`INSERT INTO jhw (user,pass) VALUES ("${user}","${pass}")`,function(err,rows){
            if(err) throw err;
            res.send("注册成功")
        })
    })
})
router.post("/login",function(req,res){ 
    var user=req.body.user;
    var pass=req.body.pass;
    pool.query(`SELECT * FROM jhw`,function(err,rows){
        if(err) throw err;
        for(i in rows){
            if(rows[i].user == user&&rows[i].pass == pass){
                res.send('登录成功');
                return;
            }
        }
        res.send("用户名或密码错误")
    })
})
module.exports=router;


