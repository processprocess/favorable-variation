const os = require('os');
const ifaces = os.networkInterfaces();
let ip = 'localhost';

Object.keys(ifaces).forEach((ifname) => {
  ifaces[ifname].forEach((iface) => {
    if (iface.family === 'IPv4' && !iface.internal) {
      ip = iface.address;
    } else { return; }
  });
});

module.exports = ip;
