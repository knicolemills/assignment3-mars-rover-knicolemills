class Rover {
   constructor(position){
     this.position = position;
     this.generatorWatts = 110;
     this.mode = 'NORMAL';
   }
 
   receiveMessage(message){
     const results = [];
     if (message.commands && message.commands.length) {
       for(let i = 0; i < message.commands.length; i++) {
         results.push(this.runCommand(message.commands[i]));
       }
     }
     return {
       message: message.name,
       results: results,
     }
   }
 
   runCommand(command) {
   switch(command.commandType) {
     case 'MOVE': {
       if (this.mode === 'LOW_POWER') {
         return {
           completed: false,
         }
       }
       this.position = command.value;
       return {
         completed: true,
       };  
     }
     case 'STATUS_CHECK': {
       return {
         completed: true,
         roverStatus: {
           position: this.position,
           mode: this.mode,
           generatorWatts: this.generatorWatts,
         },
       };
     }
     case 'MODE_CHANGE': {
       if (command.value === 'NORMAL' || command.value === 'LOW_POWER') {
         this.mode = command.value;
         return { completed: true, }
       }
       return { completed: false, };
     }
     default: {
       return {};
     }
   }
   }
 }
 
 module.exports = Rover;