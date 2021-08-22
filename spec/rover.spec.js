const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(50);
    expect(rover.position).toEqual(50);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  })
  it("response returned by receiveMessage contains name of message", function () {
    let rover = new Rover(0);
    let message = new Message("Test message");
    let response = rover.receiveMessage(message)
    expect(response.message).toEqual("Test message")
  }) 
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let rover = new Rover(0);
    let command1 = new Command('MOVE', 20);
    let command2 = new Command('MOVE', 40);
    let message = new Message('ROVER MOVE', [command1, command2]);    
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  }) 
  it("responds correctly to status check command", function () {
    let rover = new Rover(0);
    let command1 = new Command('STATUS_CHECK', 20);
    let message = new Message('ROVER MOVE', [command1]);    
    let response = rover.receiveMessage(message);
    let statusCheckResult = response.results[0];
    expect(statusCheckResult.roverStatus.position).toEqual(0);
    expect(statusCheckResult.roverStatus.mode).toEqual('NORMAL');
    expect(statusCheckResult.roverStatus.generatorWatts).toEqual(110);
  }) 
  it("responds correctly to mode change command", function () {
    let rover = new Rover(0);
    let command1 = new Command('MODE_CHANGE', 'LOW_POWER');
    let command2 = new Command('MODE_CHANGE', 'NORMAL');
    let command3 = new Command('MODE_CHANGE', 'BAD INPUT');
    let message = new Message('ROVER MOVE', [command1, command2, command3]);    
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[1].completed).toEqual(true);
    expect(response.results[2].completed).toEqual(false);
  })
  it("responds with false completed value when attempting to move in LOW_POWER mode", function () {
    let rover = new Rover(0);
    let command1 = new Command('MODE_CHANGE', 'LOW_POWER');
    let command2 = new Command('MOVE', 10);
    let message = new Message('ROVER MOVE', [command1, command2]);    
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[1].completed).toEqual(false);
  })
  it("responds with position for move command", function () {
    let rover = new Rover(0);
    let command1 = new Command('MOVE', 10);
    let message = new Message('ROVER MOVE', [command1]);    
    rover.receiveMessage(message);
    expect(rover.position).toEqual(10);
  }) 
});
