var Command = function() {
  this.trigger = 'drop';
  this.helpText = `
  Drop an item that you are holding or carrying in your inventory.
  Once dropped an item can be retrieved from the room by anyone.

  %yellow%Usage:%yellow%
         drop <item>

  %yellow%Example:%yellow%
         > drop waybread
         >
         > %bold%You drop a waybread.%bold%
  `;
  this.callback = function(session, input) {
    var index = Items.findItemInContainer(input, 'name', session.character.inventory, true);
    if (index !== false) {
      var transferDetails = {
        transferType: 'character-to-room',
        item: session.character.inventory[index],
        index: index
      }
      Items.transferItemInstance(session, transferDetails);
      var roomId = session.character.current_room;
      var name = session.character.name;
      // player message
      //TODO: write a thing to determine if a or an is appropriate.
      session.write('You drop a ' + transferDetails.item.name);
      // room message
      Rooms.message(session, roomId, name + ' drops a ' + transferDetails.item.name, true);
    }
    else {
      session.error('Drop what??\n');
    }
  }

}

module.exports = new Command();
