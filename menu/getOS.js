const getOS = (os, cb) => {
  if (process.platform === os) {
    return cb();
  }
}


const MACOS = 'darwin';
const onMac = (process.platform === MACOS);
const COMMAND = onMac ? 'Command' : 'Ctrl';

module.exports = {getOS, MACOS, COMMAND, onMac};
