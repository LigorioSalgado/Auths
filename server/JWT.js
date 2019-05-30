const jwt  =  require('jsonwebtoken');
const userModel =  require('./models/users');

// openssl rand -base64 30
const SECRET_KEY = "hdskahdiUEHD2I3SDJKSAHDUHGJHWGSajs"

Date.prototype.addDays = function(days){
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}


const createToken = ({email,first_name,_id}) => {

	const exp = new Date().addDays(1).getTime(); //152452673727

	const payload = {
		_id,
		email,
		first_name,
		exp
	}

	return jwt.sign(payload,SECRET_KEY);
}

const verifyToken = async (req,res,next) => {

	const Authorization = req.get("Authorization");

	if(Authorization){
		const token =  Authorization.replace("JWT ","");
		const payload =  jwt.verify(token,SECRET_KEY);
		const user = await userModel.findById(payload._id).catch(e => res.status(401).json(e));
		if(!user) res.status(401).json({message:"User not found"});
		req.user =  user;
		next();
	}else{
		res.status(401).json({message:"Authorization header not provided"})
	}
}

module.exports = {
	createToken,
	verifyToken
}


