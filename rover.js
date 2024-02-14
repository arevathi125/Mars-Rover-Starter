 const Command = require('./command.js');
const Message = require('./message');

class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message){
      let completed = '';
      let response = {
         message: message.name,
         results : message.commands.map(element =>{
         if (element.commandType === 'MODE_CHANGE' && element.value){
               this.mode = element.value;
               return {'completed' : true};
            }
            
         if(element.commandType === 'STATUS_CHECK') {
              return {'completed' : true, 'roverStatus' : {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}};
         }
         if (element.commandType === 'MOVE'){
             if(this.mode === 'LOW_POWER'){
               return {'completed' : false};
             }
             else {
               this.position = element.value;
               return {'completed' : true};
             }
         }
      }
   )
      }
     // return response.results[1].roverStatus.generatorWatts;
     return response;
   }
   
   }

   //  let newobj = new Rover(123);
   // // console.log(newobj);
   // let message = new Message()
   //  let response = newobj.receiveMessage(message);

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);    // Passes 98382 as the rover's position.
// let response = rover.receiveMessage(message);

// console.log(response);
    
   //console.log(newobj);
   //console.log(response);

   let rover = new Rover(100);
   let commands = [
      new Command('MOVE', 4321),
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 3579),
      new Command('STATUS_CHECK')
   ];
   let message = new Message('TA power', commands);
   let response = rover.receiveMessage(message);

   console.log(response);

module.exports = Rover;