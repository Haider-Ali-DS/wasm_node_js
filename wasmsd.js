const util = require('util');
const fs = require('fs');
const source = fs.readFileSync('./index.wasm');
const env = {
  __memoryBase: 0,
  __tableBase: 0,
  memory: new WebAssembly.Memory({
    initial: 256
  }),
  table: new WebAssembly.Table({
    initial: 0,
    element: 'anyfunc'
  })
};

(async() => {
  try {
    const wasm = await WebAssembly.instantiate(new Uint8Array(source), {env})
    // console.log(util.inspect(wasm, true, 0));
    console.log(wasm.instance.exports);
  } catch (err) {
    console.error(err);
  }
})();