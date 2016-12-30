var Command = function() {
  this.trigger = 'where';
  this.helpText = 'Displays information about the zone you are in.';
  this.callback = function (socket, input) {
    var roomId = socket.playerSession.character.currentRoom;
    var room = global.rooms.room[roomId];
    var zoneId = room.zid;
    var zone = global.zones.zone[zoneId];
    var output = global.colors.cyan(zone.name) + '\n';
    output += global.colors.yellow('Difficulty:' + zone.rating) + '\n';
    output += zone.description;
    socket.playerSession.write(output);
  }

}

module.exports = new Command();
