// -The keyword 'this' is very confusing but important to understand. 

// -Have to learn .call and .bind to be able to switch value of 'this'. 

// -'this' shows up a lot in classes and objects.

const cat = {
    name: 'Blue',
    breed: 'Scottish Fold',
    dance: function() {
        console.log(`Meow, I am ${this.name} and I like to ${dance}`);
    }

}

cat.dance('tango') // Meow, I am Blue and I like to tango

const bluesDance = cat.dance; // points to the same thing but behave differently

bluesDance('salsa') // Meow, I am and I like to salsa 

// but if you console.log('THIS IS:', this); before the Meow message 

cat.dance('salsa') //{name: 'Blue', breed: 'Scottish F...'} Meow, I am Blue and I like to salsa -puts out the actual object cat that
// we are referring to but when you do reassignment of the cat.dance to bluesDance, it ends up printing out not the object, but the 
// bloody window which is hella weird.

// how about if we do it the other way around like this:

function whatIsThis() {
    console.log("this =", this);
}

const myObj = {
    func : whatIsThis(),
    color: 'purple' 
};  

myObj.func() // the contents of myObj are shown

// unless you do this:

whatIsThis() // just comes out as the window

// In a sense, javascript doesn't have functions. Everything is called on something, like  method. whatIsThis() and bluesDance('salsa')
// Seems like they just float over nowhere. When you call a function on nothing, you call it on the 'global object', which is the window object.

// In bowser JS, 'window',
// but NodeJS, 'global'.

// You've relied on it without even realizing

alert('Hi!')

window.alert('Hi!'); // are the exact same result

// how does all this relate to 'this'? Well, 'this' is set up to anything left of your dot. 

cat.dance('salsa') // calling this dance method of cat

// calling whatIsThis() is essentially the same thing as window.whatIsThis() for obtaining the window object

windows.bluesDance('salsa') // is another window object caller

// And if you call windows.bluesDance(), doesn't even show up as an existing function!

// You need to assign the value of the function with a period and to the left. Whatever is left of the function after a period,
// the value of 'this' is associated with the value, which is ${this.name}.

bluesDance('salsa') // doesn't print out the name in the meow sentence, because the window object already has a name property, set
// equal to an empty string ''. 

window.name // ""

// You can switch the ${this.name} to ${this.breed}, since it is not on the window. 

// STRICT MODE

class Cat{
    constructor(name, breed){
        this.name = name;
        this.breed = breed;
    }
    dance(danceType) {
        console.log('THIS IS:', this)
        console.log(`Meow, I am a ${this.breed} and I like to ${danceType}`);
    }
}

const rocket = new Cat('rocket', 'tabby');
rocket.dance('tango'); // works right, and shows 'this' as the object

const rocketDance = rocket.dance
rocketDance('tango') // THIS IS: becomes undefined, type error.

// If you go on Babel and paste in this Cat class code, it would say 'use srtict'. This version would actually you to deliver the window
// object on rocketDance('tango'). But 'this' becomes undefined, so ${this.breed} doesn't show up.

// -call

// call is what you use when you want to call on a function from an object. 

let fDance = fluffy.dance;
// call on fluffy, passing 'tango' as an argument
fdance.call(fluffy, 'tango');

const blueDance = cat.dance;
blueDance.call(cat); // returns thw window object, by the sentence shows ${danceType} as undefined.
// This can be fixed by involving other arguments, like blueDance.call(cat, 'jitterbug'), and it'll be complete.

const dog = {
    breed: 'Black Lab',
    name: 'Elton'
};

blueDance.call(dog, 'hip hop dance'); // Calls the function from the cat class object, even though the object we put through isn't 
// using it inside. No property called dance. 

// -call isn't used a whole lot. It calls on a function from a different object just the one time.

function printThis() {
    console.log('THIS ======>>>', this)
}

printThis.call(cat) // will actually bring cat's object and get assoicated with the 'this' in printThis. It specifies the value of 'this'.

// If you add another method into the cat object, you can add as many arguments into the call as you want.

// play : function(...toys){
//     for (let toy of toys){
//         console.log(`${this.name} plays with ${toy}`);
//     }
// }

cat.play('string', 'my pant leg') // Blue plays with string. Blue plays with my pant leg.

cat.play.call(dog, 'bone', 'my cat'); // Elton plays with bone. Elton plays with my cat.

// -bind

console.dir(alert) // summons a whole list and shows bind and call as built in methods.

// - call is a great one time thing. Bind can turn a 'perma-bind' a function to a context.

let betterDance = fDance.bind('fluffy');
betterDance('tango'); // bound so that 'this' is fluffy.

const bDance = blue.dance;
bDance.bind(blue); // gets a new function everytime, but isn't executed. 

// so 

const boundDance = bDance.bind(blue); 
boundDance() // THIS IS: ... Meow, I am a Scottish Fold and I like to undefined.

// And you can pass off a type of dance to the argument of boundDance() and which replace the undefined.
// But as soon as you pass bDance() as a function, you get the window object and ${this.bread} becomes undefined.

const rocketThePet = {
    name : 'Rocket',
    breed : 'Himalayan'
};

const rocketPetDance = blue.dance.bind(rocketThePet);

rocketPetDance()// The complete 'this' object and the finished sentence.

const newDog = {
    name : 'Tyson',
    breed : 'Mini Aussie',
    dance : rockerPetDance
}

// if you try to call newDog.dance(), you get rocketThePet's result, ignoring the newDog properties. We've bound the value of 'this' on
// rocketThePet

// -You can also bind other arguments to bind.

function applySalesTax(taxRate, price) {
    return price + price * taxRate;
  }
  
  // "null" for "this" means it doesn't matter what "this" is
  const applyCASalesTax = applySalesTax.bind(null, 0.0725);   // With the null, the value of 'this' won't be changed, it would whatever it normally would be without bind.
  applyCASalesTax(50);  // 53.63

  const applyCATax = applySalesTax.bind(null, 0.0725)
  const applyTXTax = applySalesTax.bind(null, 0.0625) 

  applyCATax(9) // 9.6525
  applyTXTax(19.99) // 21.239375 

  const blueDisco = blue.dance.bind(blue, 'disco');
  blueDisco() //Everything works. The 'this' and sentence.

  const playsWithSocks = blue.play.bind(blue, 'left sock', 'right sock');
  playsWithSocks(); // Will always print out these:
  // Blue plays with left sock
  // Blue plays with right sock

  playsWithSocks('dirty sock') // This just prints out the same thing but with a third, new sentence.

const bobsMembership = {
    name : "Bob",
    total : 250,
    collectMonthlyFee : function(free) {
        const remaining = this.total - free;
        this.total = remaining;
        return this.name + 'remaining balance:' + remaining;
    }
};

const jillsMembership = {
    name : 'Jill',
    total : 899
};

bobsMembership.collectMonthlyFee(50) // "Bob remaining balance: 200"
bobsMembership // {name: "Bob", total: 200, collectMonthlyFee: f}


const collectBobsFee = collectMonthlyFee.bind(bobsMembership, 5);
collectBobsFee() // "Bob remaining balance: 245"
collectBobsFee() // "Bob remaining balance: 240"  
bobsMembership // {name: "Bob", total: 240}

const collectJillsFee = collectMonthlyFee.bind(jillsMembership, 35); // Replace the 'this' to jillsMembership.
collectJillsFee() // "Jill remaining balance: 864"

// Binding Callbacks:

// Want to have object method as callback:
myBtn.addEventListener("click", fluffy.dance); // This won't work because the browser will call dance on global object :(

// Add another method to the blue object (the same one with play)

greet() { 
    alert(`${this.name} SAYS MEOW!`)
}

document.querySelector('#btn-1').addEventListener('click', blue.greet)
// When you click on the button, it should have an alert saying SAYS MEOW.

// But you can do the same thing by using bind:

document.querySelector('#btn-1').addEventListener('click', blue.greet.bind(blue));
// Alert says 'Blue SAYS MEOW'.

// Pre-Binding Calls
// Imagine we want three buttons which call popUp, but with different args:

<button id='a'>A</button>
<button id='b'>B</button>
<button id='c'>C</button>

function popUp(msg) {
    alert("Secret message is " + msg);
  }
  
  function handleClick(evt) {
    let id = evt.target.id;
  
    if (id === "a") popUp("Apple");
    else if (id === "b") popUp("Berry");
    else if (id === "c") popUp("Cherry");
  }
  
  const get = document.getElementById.bind(document);
  
  get('a').addEventListener("click", handleClick);
  get('b').addEventListener("click", handleClick);
  get('c').addEventListener("click", handleClick);

  // Using bind:

  const btnA = document.querySelector('#a');
  const btnB = document.querySelector('#b');
  const btnC = document.querySelector('#c');

  function popUp(msg){
    alert("Secret message is " + msg);
  }

btnA.addEventListener('click', popUp.bind(null, 'BUTTON A SAYS HI!'));
btnB.addEventListener('click', popUp.bind(null, 'BUTTON B SAYS HI!'));
btnC.addEventListener('click', popUp.bind(null, 'BUTTON C SAYS HI!'));

//   btnA.addEventListener('click', function()) {
//     popUp('BUTTON A SAYS HI!')
//   }
//   btnB.addEventListener('click', function()) {
//     popUp('BUTTON B SAYS HI!')
//   }
//   btnC.addEventListener('click', function()) {
//     popUp('BUTTON C SAYS HI!')
//   }

// Arrow functions and 'this'

const greeter = {
    msg : "I like chickens",
    sayHi : () => {
        alert(${this.msg});
    };
};

greeter.sayHi() // Ends up being undefined, unless I remove the arrow function for a regular one. 

// Arrow functions do not make their own 'this'.

const greeter = {
    msg : "I like chickens",
    sayHi : () => {
        console.log(this);
        alert(${this.msg});
    };
};

greeter.sayHi() // You guessed it, 'this' shows a window object when console.logged in an arrow function. It's not recommended to use arrow functions as methods.

waitAndGreet: function(delay) { // Add another method to the greeter object.
    setTimeout(function() {
        alert("Hi!");
    }, delay)
}

greeter.waitAndGreet(2000) // Says HI! after two seconds. Unless you replace the alert with 'this', which will show up as undefined. It's our friend the window object again.
//setTimeout is a window method.
// One way to solve this is using bind.

waitAndGreet: function(delay) { 
    console.log(this);
    let callback = function() {
        console.log(this);
        alert(this.msg);
    }
    setTimeout(callback.bind(this), delay);
}

// Or like in the older days:
// waitAndGreet : function(delay) {
//     setTimeout(
//         function(){
//             alert(this.msg);
//         }.bind(this),
//         delay
//     )
// }

//Arrow functions make it easier, without binding explicitly. 

waitAndGreet : function(delay) {
    setTimeout(() => {
        alert(this.msg);
    }, delay);
}













