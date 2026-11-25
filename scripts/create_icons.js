const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function generatePng(size) {
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); // width
  ihdr.writeUInt32BE(size, 4); // height
  ihdr.writeUInt8(8, 8);       // bit depth
  ihdr.writeUInt8(6, 9);       // color type RGBA
  ihdr.writeUInt8(0, 10);      // compression
  ihdr.writeUInt8(0, 11);      // filter
  ihdr.writeUInt8(0, 12);      // interlace

  // Raw bitmap with filter byte 0 per line
  const rawData = [];
  const radius = size * 0.46;
  const center = size / 2;

  for (let y = 0; y < size; y++) {
    rawData.push(0); // Filter byte: None
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        // 圆角深色背景 #0C1B18 带薄荷绿边框 #6ED4B7
        if (dist > radius - 2) {
          rawData.push(110, 212, 183, 255); // #6ED4B7
        } else {
          rawData.push(12, 27, 24, 255);     // #0C1B18
        }
      } else {
        rawData.push(0, 0, 0, 0); // 透明
      }
    }
  }

  const rawBuf = Buffer.from(rawData);
  const compressed = zlib.deflateSync(rawBuf);

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

[16, 48, 128].forEach(size => {
  const png = generatePng(size);
  const file = path.join(iconsDir, `icon${size}.png`);
  fs.writeFileSync(file, png);
  console.log(`Generated ${file} (${png.length} bytes)`);
});
