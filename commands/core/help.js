var Command = function() {
  this.trigger = 'help';
  this.helpText = 'Are you for real?';
  this.callback = function (socket, input) {
    if (input === '') {
      socket.write('There is help for the following commands:\n\n');
      keys = Object.keys(global.commands.commands);
      for (i = 0; i < keys.length; ++i) {
        command = global.commands.commands[keys[i]];
        if (command.helpText !== '') {
          socket.write(command.trigger.toUpperCase() + '\n');
        }
      }
      socket.playerSession.write('');
      return;
    }
    if (typeof global.commands.commands[input] !== 'undefined') {
      command = global.commands.commands[input];
      var helpText = command.helpText;
      // Valid commands may have their help text intentionally blanked
      if (command.helpText !== '') {
        socket.playerSession.write(helpText);
      }
      else {
        socket.playerSession.write('There is no help for that term.');
      }
    }
    else {
      socket.playerSession.write('There is no help for that term.');
    }
  }

}

module.exports = new Command();
