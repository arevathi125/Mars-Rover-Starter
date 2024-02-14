const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);

describe("Rover class", function() {
   
  //Test 7
 it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
 });

 //Test 8
 it("response returned by receiveMessage contains the name of the message", function(){
     expect(response.message).toBe('Test message with two commands');
 });

 //Test 9
 it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    expect(response.results.length).toBe(2);
 });

 //Test 10
 it("responds correctly to the status check command", function(){
  if (message.commands.commandType === 'STATUS_CHECK'){
    expect(response.results.completed).toBe(true);
    //expect(response.results.length).toBe(2);
    expect(rover.results[1]).toEqual('roverStatus');
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('LOW_POWER');
    expect(rover.generatorWatts).toBe(110);
  }
  });

//Test 11
it('responds correctly to the mode change command', function(){
if (message.commands.commandType === 'MODE_CHANGE'){
  expect(rover.completed).toBe(true);
  expect(rover.mode).toBe('LOW_POWER');
  expect(rover.mode).toBe('NORMAL');
}
});

//Test 12
it('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
  if (message.commands.commandType === 'MOVE'){
   if(rover.mode === 'LOW_POWER'){
    expect(rover.completed).toBe(false);
   }
    }
  });

//Test 13
it('responds with the position for the move command', function(){
  let commands = new Command('MOVE', 3579);
  expect(rover.position).toBe(98382);
 // expect(rover.position).toBe(3579);
});

});