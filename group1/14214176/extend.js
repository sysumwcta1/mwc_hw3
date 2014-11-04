function Base(val) {
	this.instanceVariable = val;
}
Base.staticVariable = 'Base';
Base.prototype.instanceMethod = function() {
	console.log('This is from Base class instance-method, instance-variable is:' + this.instanceVariable);
}
Base.staticMethod = function() {
	console.log('This is from Base class static-method, static-variable is:' + this.staticVariable);
}

function Derived(val) {
	this.instanceVariable = val;
}
Derived.staticVariable = 'Derived';

function extend() {
	/*静态方法处理*/
	Derived.staticMethod = function() {
		Base.staticMethod.apply(Derived);
		console.log('This is from Derived class static-method, static-variable is:' + this.staticVariable);
	}
	/*实例方法处理*/
	Derived.prototype.instanceMethod = function() {
		Derived.staticMethod();
		Base.prototype.instanceMethod.apply(this);
		console.log('This is from Derived class instance-method, instance-variable is:' + this.instanceVariable);
	}



}


var base = new Base();
var derived = new Derived();

extend(base, derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log('__________________');

example = new Derived('example');
otherExample = new Derived('other-example');
example.instanceMethod();
otherExample.instanceMethod();