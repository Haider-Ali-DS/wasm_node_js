const { init, WASI } = require("@wasmer/wasi");
const fs = require('fs');
const wasmFilePath = "index.wasm";
const filebytes = fs.readFileSync(wasmFilePath)

// This is needed to load the WASI library first (since is a Wasm module)
(async () => {
    await init();

    let wasi = new WASI({
        env: {
            // 'ENVVAR1': '1',
            // 'ENVVAR2': '2'
        },
        args: [
            // 'command', 'arg1', 'arg2'
        ],
    });

    const module = await WebAssembly.compileStreaming(filebytes);
    // Instantiate the WASI module
    await wasi.instantiate(module, {});

    // Run the start function
    let exitCode = wasi.start();
    let stdout = wasi.getStdoutString();

    // This should print "hello world (exit code: 0)"
    console.log(`${stdout}(exit code: ${exitCode})`);
})();