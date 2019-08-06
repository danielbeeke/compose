# Run test.
deno run test/Compose.test.ts

# Compile to amd.
deno bundle src/Compose.ts build/Compose.amd.js

# Compile to es6.
tsc src/Compose.ts -t es2018
mv src/Compose.js build/Compose.es6.js