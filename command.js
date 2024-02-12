class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }

//  let newProperty = new Command(23);
//  console.log(newProperty);
 
 module.exports = Command;