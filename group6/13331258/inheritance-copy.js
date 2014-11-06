
//用寄生组合式继承写法，优点是不用调用两次构造函数
//静态成员：直接定义；  实例成员：this/proto；


// 寄生构造函数
function object (o) {
    function F () {}
    F.prototype = o;
    return new F();
}


function extent (base, derived) {
	var prototype = object(base.prototype);
	prototype.constructor = derived;

	prototype.superClass = base.prototype;
	prototype.instanceMethod = function() {
		prototype.superClass.instanceMethod.call(this);
		alert("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}

	derived.prototype = prototype;
}					//difference


function Base (instanceVariable) {
	this.instanceVariable = instanceVariable;
}
Base.prototype.instanceMethod = function() {
	alert("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};
Base.staticVariable = 'Base';
Base.staticMethod = function () {
	alert("This is from Base class static-method, static-variable is: " + this.staticVariable);
}




function Derived (instanceVariable) {
	Base.call(this);				//diffrence
	this.instanceVariable = instanceVariable;
}


extent(Base,Derived);


/*Derived.prototype.instanceMethod = function () {
	alert("This is from Derived class instance-method, instance-variable is: " + instanceVariable);
}*/
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	this.prototype.superClass.constructor.staticMethod.call(this);
	alert("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};







//test
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();