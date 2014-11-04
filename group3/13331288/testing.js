function Base(InsVar) {
    var staticVariable = 'Base';
    this.staticMethod = function() {
        document.write("This is from Base class static-method, static-variable is: "+staticVariable+"<br>");
    }
    var instanceVariable = InsVar;
    this.instanceMethod = function() {
        document.write("This is from Base class instance-method, static-variable is: " + instanceVariable+"<br>");
    }
}

function Derived(InsVar) {
    var staticVariable = 'Derived';
    var base = new Base('Derived');
    this.staticMethod = function() {
        Base.staticMethod();
        document.write("This is from Derived class static-method, static-variable is: "+staticVariable+"<br>");
    }
    var instanceVariable = InsVar;
    this.instanceMethod = function() {
        base.instanceMethod();
        document.write("This is from Derived class instance-method, static-variable is: " + instanceVariable+"<br>");
    }
}

example = new Derived('example');
otherExample = new Derived('other-example');
example.instanceMethod();
otherExample.instanceMethod();