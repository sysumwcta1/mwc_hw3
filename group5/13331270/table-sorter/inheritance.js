/*
*很抱歉，我的代码未能实现继承功能，由于时间有限，未实现的功能我会尽力在改进阶段实现
*这是作业第一题
*/

window.onload = function() {
	function Base(name) {
		this.instanceVariable = name;
	}
	Base.staticVariable = "Base";
	Base.staticMethod = function() {
		alert("This is from Base class static-method, static-variable is: "+this.staticVariable);
	}
	Base.prototype.instanceMethod = function() {
		alert("This is from Base class instance-method, static-variable is:"+this.instanceVariable);
	}

	function extend(Base, Derived) {
		var prototype = object(Base.prototype);
		prototype.constructor = Derived;
		Derived.prototype = prototype;
	}

	function Derived(name) {
		this.instanceVariable = name;
	}

	Derived.staticVariable = "Derived";
	Derived.staticMethod = function() {
		alert("This is from Derived class static-method, static-variable is: "+this.staticVariable);
	}
	Derived.prototype.instanceMethod = function() {
		alert("This is from Derived class instance-method, instance-variable is: "+this.instanceVariable);
	}

	example = new Derived("example");
	Derived.staticMethod();
	example.instanceMethod();

	example = new Derived('example');
	otherExample = new Derived('other-example');
	example.instanceMethod();
	otherExample.instanceMethod();

}