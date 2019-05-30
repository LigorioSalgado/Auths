const express = require('express');
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');
const morgan  =  require('morgan');
const userModel = require('./models/users');

const  app =  express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(morgan(':method :url :status :res[content-length] - response-time ms'));

mongoose.connect('mongodb+srv://prueba2:prueba2@cluster0-vp6hz.mongodb.net/test?retryWrites=true');


app.get('/',(req,res) => {
	res.send("Saludos a todos");
})

app.post('/signup',(req,res) => {

	userModel.create(req.body).then((user) => {
		res.status(201).json(user);
	}).catch((err) =>{
		res.status(400).json(err);
	})

})

app.listen(PORT,() =>{
	console.log("Works from port "+PORT);
});
