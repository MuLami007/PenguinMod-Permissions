/* 
   This is the real code of the PenguinMod Permissions
   extension before it was deprecated and removed from
   the PenguinMod extensions gallery.
   I found this code:
   https://scratch.mit.edu/users/mnmsv/
*/
// Name: Permissions
// ID: penguinmodPermissions
// Description: Request permissions to the user.
// By: JustLuke <https://github.com>
// License: MIT

(function (Scratch) {
  'use strict';

  class Permissions {
    getInfo() {
      return {
        id: 'penguinmodPermissions',
        name: 'Permissions',
        color1: '#4c97ff',
        color2: '#3373cc',
        blocks: [
          {
            opcode: 'requestNotification',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'request notification permission'
          },
          {
            opcode: 'hasNotification',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'has notification permission'
          },
          {
            opcode: 'requestGeoloc',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'request geolocation permission'
          }
        ]
      };
    }

    requestNotification() {
      if (!('Notification' in window)) return Promise.resolve(false);
      if (Notification.permission === 'granted') return Promise.resolve(true);
      
      return Notification.requestPermission().then(permission => {
        return permission === 'granted';
      });
    }

    hasNotification() {
      if (!('Notification' in window)) return false;
      return Notification.permission === 'granted';
    }

    requestGeoloc() {
      if (!('navigator' in window) || !('geolocation' in navigator)) return Promise.resolve(false);
      
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => resolve(true),
          () => resolve(false)
        );
      });
    }
  }

  Scratch.extensions.register(new Permissions());
})(Scratch);
