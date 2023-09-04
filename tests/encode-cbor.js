import cbor from 'cbor'
import { readFileSync, writeFileSync } from 'fs'

// Read a GLTF file with embedded buffers and parse as JSON
const gltf = readFileSync('../public/gltf/DamagedHelmet.gltf', 'utf8');
const src = JSON.parse(gltf);

// Convert buffers from base64 uri to binary
for (let i = 0; i < src.buffers.length; i++) {
    const { uri } = src.buffers[i];
    const { buffer } = readFileSync(`../public/gltf/${uri}`);
    src.buffers[i].data = buffer
}

// Convert images from base64 uri to binary
for (let i = 0; i < src.images.length; i++) {
    const { uri } = src.images[i];
    const { buffer } = readFileSync(`../public/gltf/${uri}`);
    src.images[i].data = buffer
}

// Create encoder
const e = new cbor.Encoder();
const dst = [];

e.on("error", (err) => {
    console.log("ERRROR")
    throw err;
})

e.on("data", (buf) => {
    dst.push(buf);
})

e.on("finish", () => {
    const encoded = Buffer.concat(dst)
    writeFileSync('../public/cbor/DamagedHelmet.cbor', encoded)
})

// Start encoding src JSON
e.end(src)