
/**
 * to understance how RZPP use-controls.tsx code works.
 */

/************* how to use type to hold a set of functions for export in one call *********************************/
// to understand code at: https://github.com/BetterTyped/react-zoom-pan-pinch/blob/master/src/utils/context.utils.ts line 23
// declare some pet greeting functions 
const printDog = (petName) => { return  petName + ', my dog '} 
const printCat = (petName) =>  { return  petName + ', my cat'} 
// setup a type which holds function names, signatures but doesnt define them
type petGreetingType = {
    dog: ReturnType<typeof String>;
    cat: ReturnType<typeof String>;
    moose: ReturnType<typeof String>;
    rat: ReturnType<typeof String>;
}
// return a type instance having set of functions
const getAllPetGreetingFunctions = (
    petName: String,          // the parameter to function(s)
  ): petGreetingType => {     // the return type of this function, in this case a set of functions
    return {
      dog: printDog(petName),
      cat: printCat(petName),
      moose: petName + ', a moose but not really anyone\'s pet',
      rat: 'rats dont get a name'
    };
  };
const TestGetSetOfFunctions = () => {
    console.log('getpets: ' + getAllPetGreetingFunctions('fuzzy').dog)
    console.log('getpets: ' + getAllPetGreetingFunctions('fuzzy').cat)
    console.log('getpets: ' + getAllPetGreetingFunctions('fuzzy').moose)
    console.log('getpets: ' + getAllPetGreetingFunctions('').rat)
}
/************* END how to use type to hold a set of functions for export in one call *********************************/


// type petSet = {
//     dog: ReturnType<typeof String>;
//     cat: ReturnType<typeof String>;
// }
// const printDog = (petName) => { return 'dog'} // { console.log('my pet is a dog named ' + petName)}
// const printCat = (petName) =>  { return 'cat'} //{ console.log('my pet is a cat named ' + petName)}
// export const getPets = (
//     myPet: String,
//   ): petSet => {
//     return {
//       dog: printDog(myPet),
//       cat: printCat(myPet)
//     };
//   };
// console.log('getpets: ' + getPets('fuzzy').dog)

type Abcd = {
    price : number, color : string;
}
type AnotherType = {
    chicken: Abcd;
    color : string;
};
var foo: Abcd = { price: 5, color:'blue' }
var foo2: AnotherType = {chicken : { price: 5, color:'blue' }, color:'red' }
var fnReturnsTypeInstance = (): Abcd => { 
    return { price: 5, color:'green' }
}

const bzz = () => { console.log(
    'bzz from TypeScriptExample ' + foo.color + 
    ' fnReturnsTypeInstance: ' + fnReturnsTypeInstance().color)}
export { bzz, TestGetSetOfFunctions, getAllPetGreetingFunctions }