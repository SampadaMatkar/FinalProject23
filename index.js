const express= require("express");
const cors=require("cors");
const mysql=require("mysql2");

const app=express();
app.use(cors());
app.use(express.json());

const con =mysql.createConnection({
	host: "localhost",
	user: "root",
	password:"abc123",
	database:"enquiry_app_data"
});

app.post("/save",(req,res)=>{
	let data=[req.body.name,req.body.phone,req.body.address,req.body.checkedBoxesString];
	console.log(data);
	let sql="insert into userdata1 values(?,?,?,?)";
	con.query(sql,data,(err,result)=>{
			if(err)	return res.send(err);
			else	return res.send(result);
	});
});


app.get("/gd",(req,res)=>{
	let sql="select * from userdata1";
	con.query(sql,(err,result)=>{
		if (err)	return res.send(err);
		else	return res.send(result);
	});
});

app.delete("/delete/:phone_no", (req, res) => {
  let phoneNo = req.params.phone_no;
  console.log(phoneNo);
  
  let sql = "DELETE FROM userdata1 WHERE phone_no = ?";
  
  con.query(sql, [phoneNo], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      // no matching found
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});


app.listen(9000,()=>{console.log("ready to serve at 9000");});