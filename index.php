<html>
 <head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="http://malsup.github.com/jquery.form.js"></script> 
	 <script src="constants.js"></script> 
	<script> 
        
        $(document).ready(function() { 
            	
		if (localStorage["user_token"]) {
			$("#login").html(welcome.replace("<name>",localStorage.getItem("user_name")));

  		}
		$('#LoginSubmit').on('click',function(){
                $('#LoginForm').ajaxForm({
                        
                        beforeSubmit:function(e){
                                
                        },
                        success:function(e){
                               var response = JSON.parse(e);
				if(response["status"]==0){
					$("#alert").html(response["message"]);
				}
				else if(response["status"]==1){
					$("#alert").html(response["message"]);
					localStorage.setItem("user_token", response['data']['token']);
					localStorage.setItem("user_name", response['data']['name']);
					localStorage.setItem("user_id", response['data']['id']);
					localStorage.setItem("user_login", response['data']['login_name']);

					$("#login").html(welcome.replace("<name>",response['data']['name']));

				}
                        },
                        error:function(e){
                        }
                }).submit();

        });

	


 
        }); 
    </script> 

 </head> 


<?php

session_start();
if(isset($_SESSION['token']))
	header("Location:/");
else{

?>
<div class="login" id ="login">
<form id ="LoginForm" action="http://localhost/gmail/login.php" method ="post">

<div class="fields" text-align="center">
    <label><b>Login Name</b></label>
    <input type="text" placeholder="Username" name="username" required>

    <label><b>Password</b></label>
    <input type="password" placeholder="Password" name="password" required>

    <button type="submit" name="LoginSubmit" id ="LoginSubmit">Login</button>
</div>

</form>
</div>

<div id ="alert" > </div>

<?php
}
?>


</html>
