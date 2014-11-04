function Base(){
    this.staticVariable = "Base";
    this.staticMethod = function () {
        console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
    };
}

var instance =new Base();
instance.instanceVariable;
instance.instanceMethod = function () {
    console.log("This is from Base class instance-method, static-variable is: " + instanceVariable);
};

function extend (base,derived) {

}