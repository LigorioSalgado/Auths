const authenticate = require('./auth');



async function basicAuth(req,res,next){

	if(!req.header.authorization || req.headers.authorization.indexOf('Basic ') == -1){
		res.send(401).json({message:'Missing Authorization'});
	}

	//Autorization: Basic siqhwe3iudji23jwqdsjkaç===
	const base64Credentials =  req.headers.authorization.split(' ')[1];
	const credentials =  Buffer.from(base64Credentials,'base64').toString('ascii');
	//email@emai.com:mipassword
	const [email,password] =  credentials.split(":");
	const user =  await authenticate({email,password});

	req.user  = user
}

module.exports = basicAuth;
