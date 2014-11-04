var initializing = false;
function extend(base, derived) {
	if (typeof(base) === "object") {
		derived = base;
		base = null;
	}

	function F() {
		if (!initializing) {
			this.init.apply(this, arguments);
		}
	}

	if (base) {
		initializing = true;
		F.prototype = new base();
		F.prototype.constructor = F;
		initializing = false;
	}

	for (var name in derived) {
		if (derived.hasOwnProperty(name)) {
			F.prototype[name] = derived[name];
		}
	}
	
	return F;
};

/*var Base() = extend({
	init: function(name) {
		this.staticVariable = name;
	},
	staticMethod: function() {
		document.write("This is from Base class static-method, static-variable is: " + this.staticVariable);
	}
});


function Base() {
	this.staticVariable = 'Base';
	this.staticMethod = function() {
		document.write("This is from Base class static-method, static-variable is: " + staticVariable);
	}
}

var instanceVariable = new Base('Base');
instanceVariable.instanceMethod = function() {
	document.write("This is from Base class instance-method, static-variable is: " + instanceVariable);
}*/

var Base = extend({
	init: function(value) {
		this.staticVariable = 'Base';
		var instanceVariable = value;
	},
	staticMethod: function() {
		document.write("This is from Base class static-method, static-variable is: " + this.staticVariable);
	},
	/*this.staticVariable = 'Base';
	this.staticMethod = function() {
		document.write("This is from Base class static-method, static-variable is: " + this.staticVariable);
	}*/
	instanceMethod: function() {
		document.write("This is from Base class instance-method, static-variable is: " + instanceVariable)
	}
});

var Derived = extend(Base, {
	init: function(value) {
		this.staticVariable = 'Derived';
		var instanceVariable = value;
	},
	staticMethod: function() {
		document.write("This is from Derived class static-method, static-variable is: " + this.staticVariable)
	},
	instanceMethod: function() {
		Base(this.instanceVariable).instanceMethod();
		document.write("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
	}
});

var example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();