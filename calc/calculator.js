window.onload = function() {
	var calculator = {
		id:'calculator',
		prepareArguments:function() {
			this.a = parseInt(this.firstArgument);
			this.b = parseInt(this.secondArgument);				
			},
		actions:{

			add:function(a, b) {
				return (a + b);
			},
			subtract:function(a, b) {
				return (a - b);
			},
			multiply:function(a, b) {
				return (a * b);
			},
			divide:function(a, b) {
				return (b === 0)?'change second argument to not 0':(a / b);
			}
		},
		getResult:function(){
			this.prepareArguments();
			return(this.actions[this.chosenAction](this.a,this.b));			
		},
		returnResult:function() {
			document.getElementById("result").value = this.getResult();
		}		
	};

	function runCalculator(calculator) {

	 	var elems = document.getElementById(calculator.id).getElementsByTagName('*');
		var i;
		for (i in elems) {
			//find action buttons
		        if((' ' + elems[i].className + ' ').indexOf(' ' + 'calculatorActionButton' + ' ') > -1) {
		            elems[i].onclick = function() {
						calculator.chosenAction = this.value;
					};
		        }
			//find submit button
		        if((' ' + elems[i].className + ' ').indexOf(' ' + 'submitButton' + ' ') > -1) {
		            elems[i].onclick=function(){
						calculator.returnResult();
						return false;
					}
		        }
		        //find first Argument
		        if((' ' + elems[i].className + ' ').indexOf(' ' + 'firstArgument' + ' ') > -1) {
		            elems[i].onchange=function(){
						calculator.firstArgument=this.value;
					}
		        }
		        //find second Argument
		        if((' ' + elems[i].className + ' ').indexOf(' ' + 'secondArgument' + ' ') > -1) {
		            elems[i].onchange=function(){
						calculator.secondArgument=this.value;
					}
		        }
		    }		

	}

	runCalculator(calculator);

}