var Command = function() {
  this.trigger = 'equipmob';
  this.permsRequired = 'BUILDER';
  this.helpText = `
  Equip a mob instance with an item. Note this change is permanent and this mob will load in this equipment going forward.

  %yellow%Usage:%yellow%
         equipmob <mob id> <item id>

  %yellow%Usage:%yellow%
         > equipmob 1 1
         >
         > %bold%You equip the small chipmunk with a dwarven battle axe.%bold%
         > %bold%The small chipmunk struggles to wield a dwarven battle axe.%bold%
  `;
  this.callback = function (session, input) {
    var roomId = session.character.current_room;
    var zoneId = Rooms.room[roomId].zid;

    var commandParts = input.split(' ');

    if (commandParts.length < 2) {
      session.error('Equip who with what??');
      return false;
    }

    var miid = parseInt(commandParts[0]);
    var iid = parseInt(commandParts[1]);

    var mobileIndex = false;
    for (var i = 0; i < Rooms.room[roomId].mobiles.length; ++i) {
      var mobile = Rooms.room[roomId].mobiles[i];
      if (mobile.miid === miid) {
        mobileIndex = i;
        break;
      }
    }

    if (mobileIndex === false) {
      session.error('There is no mobile with that id in this room.');
      return false;
    }

    var Item = Models.Item;
    Item.findOne({where:{iid: iid}}).then(function(instance) {
      var item = instance.dataValues;
      item.properties = JSON.parse(item.properties);
      // place item in mob equipment slot.
      if (item.properties.flags.includes('WIELD')) {
        Rooms.room[roomId].mobiles[mobileIndex].equipment['WIELD'] = item;
        Rooms.message(session, roomId, 'You arm the mob with ' + item.name, false);
      }
      else if (item.properties.flags.includes('WEARABLE')) {
        var slot = item.properties.equipment_slot;
        Rooms.room[roomId].mobiles[mobileIndex].equipment[slot] = item;
        Rooms.message(session, roomId, 'You equip the mob with ' + item.name, false);
      }
      // update mob stats from item effects
      var equipment = Rooms.room[roomId].mobiles[mobileIndex].equipment;
      var eqKeys = Object.keys(equipment);
      var mobEQ = {};
      for (var i = 0; i < eqKeys.length; ++i) {
        var key = eqKeys[i];
        if (equipment[key] === false) {
          mobEQ[key] = false;
        }
        else {
          mobEQ[key] = equipment[key].iid;
        }
      }
      // Update mob definition in db, add item iid to equipment slot
      var MobilesInstance = Models.MobilesInstance;
      MobilesInstance.update({equipment: JSON.stringify(mobEQ)}, {where:{miid: miid}});
    });
  }
}

module.exports = new Command();