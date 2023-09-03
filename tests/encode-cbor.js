import cbor from 'cbor'
import { readFileSync, writeFileSync } from 'fs'
import { dataUriToBuffer } from 'data-uri-to-buffer'

// Read a GLTF file with embedded buffers and parse as JSON
const gltf = readFileSync('DamagedHelmet.gltf', 'utf8');
const src = JSON.parse(gltf);

// Convert buffers from base64 uri to binary
for (let i = 0; i < src.buffers.length; i++) {
    src.buffers[i] = dataUriToBuffer(src.buffers[i].uri);
}

// Convert images from base64 uri to binary
for (let i = 0; i < src.images.length; i++) {
    src.images[i] = dataUriToBuffer(src.images[i].uri);
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
    writeFileSync('DamagedHelmet.cbor', encoded)
})

// Start encoding src JSON
e.end(src)