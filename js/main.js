/* Const Area */
// Regular Expression
const REG_EXP_EMAIL = /[A-z0-9]+[\-\.\_]?[A-z0-9]+[\@]{1}[A-z0-9]{2,}[\.]+[A-z0-9]{2,}/;
const REG_EXP_PASSWORD_NUMBER = /[0-9]+/;
const REG_EXP_PASSWORD_UPPER = /[A-Z]+/;
const REG_EXP_PASSWORD_LOWER = /[a-z]+/;
const REG_EXP_PHONE_NUMBER = /\D+/;
const REG_EXP_ZIPCODE = /[A-z]{1}\d{1}[A-z]{1}\d{1}[A-z]{1}\d{1}/;
// Message
const MSG_REQUIRED = "{0} is required.";
const MSG_LENGTH_LESS = "{0} must be less than {1} characters in length.";
const MSG_LENGTH_EQUAL = "{0} must be {1} characters in length.";
const MSG_LENGTH_BETWEEN = "{0} must be between {1} and {2} characters in length.";
const MSG_FORMAT = "{0} is not formatted correctly.";
const MSG_CONFIRM = "{0} must be the same as {1}.";

/* Global variable */
// error message
var errorMessage;


function Init()
{

	errorMessage = new Array();
	SetFocus("firstName");

}
	

function Validate()
{

	errorMessage = new Array();

	CheckName("firstName", "First Name", false);
	CheckName("middleName", "Middle Name", true);
	CheckName("lastName", "Last Name", false);
	CheckEmail();
	CheckPassword();
	CheckPhoneNumber();
	CheckAddress();
	CheckOthers();
	
	if(errorMessage.length > 0)
	{
		DisplayErrorMessage();
		return false;
	}
	
}


function CheckName(id, fieldName, isMiddleName)
{	
	// name
	var name = document.getElementById(id).value;
	if(IsEmpty(name))
	{
	
		if(!isMiddleName)
		{
			SetError(id, MSG_REQUIRED , [fieldName]);
		}
		return;
	}
	
	if(name.trim().length > 30){
		SetError(id, MSG_LENGTH_LESS , [fieldName, "30"]);
		return;
	}

	ClearColor(id);
}


function CheckEmail()
{
	// email
	var id = "email";
	var fieldName = "Email";
	var email = document.getElementById(id).value;
	if(IsEmpty(email))
	{
		SetError(id, MSG_REQUIRED , [fieldName]);
		return;
	}
	
	if(email.trim().length > 50){
		SetError(id, MSG_LENGTH_LESS , [fieldName, "50"]);
		return;
	}
	
	if(!REG_EXP_EMAIL.test(email)){
		SetError(id, MSG_FORMAT , [fieldName]);
		return;
	}
	
	ClearColor(id);

}


function CheckPassword()
{

	var idPw = "pw";
	var fieldNamePw = "Password";
	var idConfirm = "confirmPw";
	var fieldNameConfirmPw = "Confirm Password";
	var pw = document.getElementById(idPw).value;
	var confirmPw = document.getElementById(idConfirm).value;
	
	// required
	if(IsEmpty(pw))
	{
		SetError(idPw, MSG_REQUIRED, [fieldNamePw]);
		if(IsEmpty(confirmPw))
		{
			SetError(idConfirm, MSG_REQUIRED, [fieldNameConfirmPw]);
		}
		
		return;

	}else {
	
		// 8-16
		if(pw.trim().length < 8 || pw.trim().length > 16){
			SetError(idPw, MSG_LENGTH_BETWEEN, [fieldNamePw, "8", "16"]);
			return;
		}

		// password must have at least one number
		if(!REG_EXP_PASSWORD_NUMBER.test(pw)
			|| !REG_EXP_PASSWORD_UPPER.test(pw)
			|| !REG_EXP_PASSWORD_LOWER.test(pw)
		){
			SetError(idPw, MSG_FORMAT, [fieldNamePw]);
			return;
		}else{
			ClearColor(idPw);
		}
		
	}
	
	if(IsEmpty(confirmPw))
	{
		SetError(idConfirm, MSG_REQUIRED, [fieldNameConfirmPw]);
		return;
	}
	
	if(!IsEmpty(pw) && !IsEmpty(confirmPw) && pw != confirmPw)
	{
			document.getElementById(idPw).value = "";
			document.getElementById(idConfirm).value = "";
			
			SetError(idPw, MSG_CONFIRM, [fieldNamePw, fieldNameConfirmPw]);
			SetErrorStyle(idConfirm);
			return;
	}
	
	ClearColor(idPw);
	ClearColor(idConfirm);
	
}


function CheckPhoneNumber()
{

	// phone
	var id = "phone";
	var fieldName = "Phone Number";
	var phoneNumber = document.getElementById(id).value;
	if(IsEmpty(phoneNumber))
	{
		SetError(id, MSG_REQUIRED, [fieldName]);
		return;
	}
	
	if(phoneNumber.trim().length != 10){
		SetError(id, MSG_LENGTH_EQUAL, [fieldName, "10"]);
		return;
	}
	
	if(REG_EXP_PHONE_NUMBER.test(phoneNumber)){
		SetError(id, MSG_FORMAT, [fieldName]);
		return;
	}
	
	ClearColor(id);

}



function CheckAddress()
{

	var addressID = "address";
	var addressFieldName = "Address";
	var address = document.getElementById(addressID).value;
	
	var cityID = "city";
	var cityFieldName = "City";
	var city = document.getElementById(cityID).value;
	
	var provinceID = "province";
	var provinceFieldName = "Province";
	var province = document.getElementById(provinceID).value;
	
	var zipcodeID = "zipcode";
	var zipcodeFieldName = "Zipcode";
	var zipcode = document.getElementById("zipcode").value;
	
	// Address
	if(!IsEmpty(address) && address.trim().length > 50)
	{
		SetError(addressID, MSG_LENGTH_LESS, [addressFieldName, "50"]);
	}else
	{
		ClearColor(addressID);
	}
		

	// City
	if(!IsEmpty(city) && city.trim().length > 30)
	{
		SetError(cityID, MSG_LENGTH_LESS, [cityFieldName, "30"]);
	} else 
	{
		ClearColor(cityID);
	}

	
	// zipcode	
	if(IsEmpty(zipcode)){
		
		ClearColor(zipcodeID);
		
	}else 
	{
		
		if(zipcode.trim().length != 6)
		{
			SetError(zipcodeID, MSG_LENGTH_EQUAL, [zipcodeFieldName, "6"]);
			
		}else 
		{
		
			if(!REG_EXP_ZIPCODE.test(zipcode))
			{
				SetError(zipcodeID, MSG_FORMAT, [zipcodeFieldName]);
			}else 
			{
				ClearColor(zipcodeID);
			}
		}
	}			

}

function CheckOthers()
{

	// language
	var language = document.getElementsByName("language");
	if(!language[0].checked && !language[1].checked)
	{

		SetFocus("english");
		errorMessage.push(GetMessage(MSG_REQUIRED, ["Language"]));
		document.getElementById("englishLB").style="color:red;";
		document.getElementById("frenchLB").style="color:red;";
		document.getElementById("languageLB").style="color:red;";
		
	}
	
	// agreement
	if(!document.getElementById("agreement").checked)
	{
	SetError("agreement", MSG_REQUIRED, ["Terms and condition"]);
		
	}

}



function DisplayErrorMessage()
{
	var message = "";
	for(var i=0; i<errorMessage.length; i++)
	{
		message += errorMessage[i] + "<BR>";
	
	}
	
	// display error messages
	document.getElementById("errorArea").innerHTML = message;
	document.getElementById("errorArea").style = "display: block;";
}


function SetError(id, messageID, argArray)
{
	SetFocus(id);
	// set message;
	errorMessage.push(GetMessage(messageID, argArray));
	// set color
	SetErrorStyle(id);

}


function SetErrorStyle(id)
{
	// set color
	document.getElementById(id).style="background-color:pink; border-color: red;";
	var labelID = id + "LB";
	document.getElementById(labelID).style="color:red;";
			
}

function ClearColor(id)
{
	// set color
	document.getElementById(id).style="";
	var labelID = id + "LB";
	document.getElementById(labelID).style="";

}

/*
 * 
 */
function SetFocus(id)
{
	if(errorMessage.length == 0)
	{
		document.getElementById(id).focus();
	}
	
}		

function Capitalize(str)
{
	if(IsEmpty(str))
	{
		return str;
	}
	
	var strArray = str.split(" ");
	var ret = "";
	
	for(var i=0; i<strArray.length; i++)
	{
		if(i != 0)
		{
			ret += " ";
		}
		ret += strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1).toLowerCase();
	}
	
	return ret;
}

function RemoveWhiteSpace(str)
{
	return str == null ? str : str.trim();
}


function ToUpper(str)
{
	return IsEmpty(str) ? str : str.toUpperCase();
}

function GetMessage(messageID, argArray)
{
	var message = messageID;
	if(argArray != null && argArray.length > 0 )
	{
		for(var i=0; i<argArray.length; i++)
		{
			
			message = message.replace("{" + i + "}", argArray[i]);
		}		
	}

	return message;
}

function IsEmpty(str)
{
	return str == null || str.trim().length == 0;
}		