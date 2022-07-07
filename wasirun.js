const { init, WASI } = require("@wasmer/wasi");
const fs = require('fs');
const wasmFilePath = "index.wasm";

(async () => {

    await init();

    const wasi = new WASI({
        args: ['{"hello":"world"}'],
        env: {
            abc: "def",
            foo: "bar",
        },
    });
    const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

    const wasm = await WebAssembly.compile(
        fs.readFileSync(wasmFilePath)
    );
    const instance = await WebAssembly.instantiate(wasm, importObject);
    console.log(instance);
    // wasi.start(instance);
})();