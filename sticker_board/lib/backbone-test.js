var Test = Backbone.Model.extend({
	run : function() {
		console.log("It's working!");
		alert("It's working!");
	}
}),
	obj = new Test();
	obj.run();