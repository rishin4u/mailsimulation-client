var inboxtable ="<table><tr><th>From</th><th>Time</th> <th>Subject</th> </tr><rows></table>"
var inboxrow ="<tr><td><from></td><td><time></td><td><a href = # id='view_mail_<mailid>' class='view_mail' ><subject></a></td></tr>"
var expandheading = "<h2 class ='exhead'><heading></h2>"
var  anchor_mail ="<div> On<b> <time></b>  <i><user></i> wrote  <div class='quote'><message></div></div>"
$(document).ready(function() { 

	$.ajax({
    		type: 'POST',
		beforeSend: function (request)
            	{
                	request.setRequestHeader("user-token", localStorage["user_token"]);
            	},
    		data: '',
    		url: 'http://localhost/gmail/inbox.php',
    		success: function(data) {
			var rows=''   
        		var response = JSON.parse(data);
                        if(response["status"]==0){
                                $("#mails").html(response["message"]);
                         }
                         else if(response["status"]==1){
				result = response["data"];
				for (var i = 0, len = result.length; i < len; i++) {
					var theDate = new Date(result[i]["mailtime"] * 1000);
					var dateString = theDate.toGMTString();
 					rows = rows+inboxrow.replace("<from>",result[i]["login_name"]).
					replace("<subject>",result[i]["subject"]).
					replace("<time>",dateString).
					replace("<mailid>",result[i]["rid"])
		 ;
				}
			}
				$("#mails").html(inboxtable.replace("<rows>",rows))	

    		}

	});



	$('body').on('click',".view_mail",function(){
		var mailid = ($(this).attr("id")).split("_")
		$.ajax({
                	type: 'POST',
                	beforeSend: function (request)
                	{
                        	request.setRequestHeader("user-token", localStorage["user_token"]);
                	},
                	data: 'rmailid='+mailid[2],
                	url: 'http://localhost/gmail/loadthread.php',
                	success: function(data) {
				var response = JSON.parse(data);
				var expand ='';
				expand+=expandheading.replace("<heading>",response["data"]["thread"]["subject"])
				expand+=anchor_mail.replace("<time>",response["data"]["anchor_mail"]["mailtime"])
					.replace("<user>",response["data"]["anchor_mail"]["name"])
					.replace("<message>",response["data"]["anchor_mail"]["message"])
				$("#expand").html(expand);
			}
		});	
	});
	

	
});
