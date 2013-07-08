
var ES = require('./email-settings');
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({
	host 	    : ES.host,
	user 	    : ES.user,
	password    : ES.password,
	ssl		    : true
});

EM.verifyEmail = function (account, callback) {
    console.log('EM.verifyEmail');
    EM.server.send({
        from: ES.sender,
        to: account.email,
        subject: 'Email Verification',
        text: 'Email Verification',
        attachment: EM.composeVerifyEmail(account)
    }, callback);
}

EM.composeVerifyEmail = function (o) {
    console.log('EM.composeVerifyEmail');
    var link = 'http://localhost:3000/email-verify?n=' + o.name;
    var html = "<html><body>";
    html += "Hi " + o.name + ",<br><br>";
    html += "Your username is :: <b>" + o.user + "</b><br><br>";
    html += "<a href='" + link + "'>Please click here to Verify your Email</a><br><br>";
    html += "</body></html>";
    return [{ data: html, alternative: true}];
}

EM.dispatchResetPasswordLink = function(account, callback){
	EM.server.send({
		from         : ES.sender,
		to           : account.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : EM.composeEmail(account)
	}, callback );
}

EM.composeEmail = function(o){
	var link = 'POC/reset-password?e='+o.email+'&p='+o.pass;
	var html = "<html><body>";
		html += "Hi "+o.name+",<br><br>";
		html += "Your username is :: <b>"+o.user+"</b><br><br>";
		html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>";		
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}