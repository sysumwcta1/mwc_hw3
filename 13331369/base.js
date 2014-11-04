function base(constructor, methods) {
	var staticVariable = 'Base';
	staticMethod: function() {
		console.log('This is from Base class static-method, static-variable is: ' + staticVariable);
	}
	if (methods) {
		extend(constructor.prototype, methods);
	}
	return constructor;
}



var i = 'instanceVariable';
var instanceVariable = base(function(i) {
	this.instanceVariable = i;
}, {
	instanceMethod: function() {
		console.log('This is from Base class instance-method, static-variable is:' + this.instanceVariable)
	}
});

function extend(base, derived) {
     var staticVariable = 'Derived';
     staticMethod: function() {
     	console.log("This is from Derived class static-method, static-variable is: " + staticVariable)
     }
}

