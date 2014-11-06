        function Base(baseInstance){
            this.intanceVariable = baseInstance;
        }

        Base.staticVariable = 'Base';
        Base.staticMethod = function(){
            console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
        };

        Base.prototype.instanceMethod = function(){
            console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
        };

        function Derived(derivedInstance){
            this.instanceVariable = derivedInstance;
        }

        Derived.staticVariable = 'Derived';

        function extend(base,derived){
            derived.staticMethod =function()
            {
                base.staticMethod.apply(derived);
                console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
            };

            derived.prototype.instanceMethod = function(){
                derived.staticMethod();
                base.prototype.instanceMethod.call(this);
                console.log("This is from Derived class instance-method, static-variable is: " + this.instanceVariable);
            }
        }

        extend(Base, Derived);
        console.log("==========================example1 output=============================");
        example = new Derived('example');
        Derived.staticMethod();
        example.instanceMethod();
        console.log("=========================example2 output==============================");
        example = new Derived('example');
        otherExample = new Derived('other-example');
        example.instanceMethod();
        otherExample.instanceMethod();