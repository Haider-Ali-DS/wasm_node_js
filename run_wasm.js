const fs = require('fs');
const { WASI } = require("@wasmer/wasi");
// let nodeBindings = require("@wasmer/wasi/lib/bindings/node");


const wasmFilePath = "index.wasm";
// nodeBindings = nodeBindings.default || nodeBindings;


let wasi = new WASI({
  args: [wasmFilePath],
  env: {},
  // bindings: nodeBindings
});

let wasmBytes = new Uint8Array(fs.readFileSync(wasmFilePath)).buffer;
const wasmBuffer = fs.readFileSync(wasmFilePath);

WebAssembly.compile(wasmBytes).then((wasmModule) => {

  console.log({ ...wasi.getImports(wasmModule) });//////////////////
  WebAssembly.instantiate(wasmBuffer, {
    ...wasi.getImports(wasmModule)
  }).then(wasmModule2 => {

    console.log(wasmModule2.instance.exports);//////////////////
    exports.main();
  });
});