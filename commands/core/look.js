var Command = function() {
  this.trigger = 'look';
  this.helpText = '';
  this.callback = function (socket, input) {
    console.log('look input:' + input);
    console.log(typeof input);
    // Room look, aka look with no additional arguments passed.
    if (input === '') {
      var roomId = socket.playerSession.character.currentRoom;
      // display room title
      socket.write(global.colors.bold(global.rooms.room[roomId].name) + "\n");
      // display room description
      socket.write(global.rooms.room[roomId].full_description + "\n\n");
      // display room inventory
      var display = global.items.inventoryDisplay(socket, global.rooms.room[roomId].inventory);
      socket.write(display + "\n\n");
      // display exits
      var exits = [];
      for (i = 0; i < global.rooms.room[roomId].exits.length; ++i) {
        exit = global.rooms.room[roomId].exits[i];
        exits.push(global.colors.yellow(exit.label));
      }
      socket.playerSession.write('Exits: [ ' + exits.join(' ') + ' ]\n');
      console.log('completed look output');
    }
  }

}

module.exports = new Command();
