function Base (instanceVariable) {
	 this.instanceVariable = instanceVariable;
	// body...
}
Base.prototype.instanceMethod = function(instanceVariable) {

	alert("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	// body...
};
Base.staticVariable = 'Base';
Base.staticMethod = function(staticVariable) {

	alert("This is from Base class static-method, static-variable is: " + this.staticVariable);
}
instanceVariable = new Base();
var obj = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
}
function extent(base, derived) {
	var prototype = obj(base.prototype);
	prototype.constructor = derived;
	prototype.superClass = base.prototype;
	prototype.instanceMethod = function() {
		prototype.superClass.instanceMethod.call(this);
		alert("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	derived.prototype = prototype;
}
extent(Base,Derived);
function Derived(instanceVariable) {
	Base.call(this, instanceVariable);
	this.instanceVariable = instanceVariable;
}

Derived.staticVariable = 'Derived';
Derived.staticMethod = function(staticVariable) {
	Base.staticMethod(this.staticVariable);
	alert("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();