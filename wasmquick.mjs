const [_, __, wasm_file, func_name, ...args] = process.argv;

import("fs/promises")
  .then(module => module.default.readFile(wasm_file))
  .then(bytes => WebAssembly.compile(bytes))
  .then(
    module =>
      new WebAssembly.Instance(module, {
        env: {
          memory: new WebAssembly.Memory({ initial: 256 }),

          table: new WebAssembly.Table({
            initial: 0,
            element: "anyfunc",
          }),
        },
      })
  )
  .then(instance => instance.exports[func_name](...args))
  .then(console.log, console.error);