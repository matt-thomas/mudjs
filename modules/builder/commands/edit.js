var editRoomPrompts = require('./prompts/editRoomPrompts.js');

var Command = function() {
  this.trigger = 'edit';
  this.permsRequired = 'BUILDER';
  this.helpText = `
  Builder only: universal in-game editing command for world building. Great for editing rooms and items.

  %yellow%Usage:%yellow%
         edit room name (change room name)
         edit room desc (change room description)
         edit room flags (change room flags)

         edit item name (change name for all instances of item)
         edit item roomdesc (change room description for all instances of item)
         edit item fulldesc (change full description for all instances of item)
         edit item properties (change item properties for all instances of item)

         Note: editing item properties on existing items will wipe out any customizations
         to any existing copies of that item.

  %yellow%Example:%yellow%
         > edit room name
         >
         > %bold%'Enter room name. (This is displayed at the top of the room description)'%bold%
         >
         > MacGrave's World of Pants
         >
         > %bold%Room changes saved%bold%
         >
         > look
         >
         > %bold%MacGrave's World of Pants%bold%
  `;
  this.callback = function (session, input) {
    commandArgs = input.split(' ');
    switch (commandArgs[0]) {
      case 'room':
        // room name (no argument passed (ex: 'edit room')
        if (commandArgs.length === 1) {
          session.error('What do you want to change?');
          break;
        }
        // room name (ex: 'edit room name')
        if (commandArgs[1] === 'name') {
          editRoomPrompts.editRoomName(session);
          break;
        }
        // long desc (ex: 'edit room desc')
        if (commandArgs[1] === 'desc') {
          editRoomPrompts.editRoomDesc(session);
          break;
        }
        // flags (ex: 'edit room flags')
        if (commandArgs[1] === 'flags') {
          editRoomPrompts.editRoomFlags(session);
          break;
        }
        // Garbled 2nd arg
        session.error('Edit what??');
        break;
      default:
        // Unknown 1st arg
        session.error('Edit what??');
    }

  }

}

module.exports = new Command();
