function hex2bin(hex) {
  hex = hex.replace("0x", "").toLowerCase();
  var out = "";
  for (var c of hex) {
    switch (c) {
      case "0":
        out += "0000";
        break;
      case "1":
        out += "0001";
        break;
      case "2":
        out += "0010";
        break;
      case "3":
        out += "0011";
        break;
      case "4":
        out += "0100";
        break;
      case "5":
        out += "0101";
        break;
      case "6":
        out += "0110";
        break;
      case "7":
        out += "0111";
        break;
      case "8":
        out += "1000";
        break;
      case "9":
        out += "1001";
        break;
      case "a":
        out += "1010";
        break;
      case "b":
        out += "1011";
        break;
      case "c":
        out += "1100";
        break;
      case "d":
        out += "1101";
        break;
      case "e":
        out += "1110";
        break;
      case "f":
        out += "1111";
        break;
      default:
        return "";
    }
  }

  return out;
}

function bigIntToArray(big_number) {
  const bin_string = big_number
    .toString(2)
    .padStart(BITS_FOR_WORD * words, "0");
  const array = (
    bin_string.match(new RegExp(".{1," + BITS_FOR_WORD + "}", "g")) || []
  ).map((x) => parseInt(x, 2));
  return array;
}

function convertStringToUint8Array(str) {
  const len = Math.floor(str.length / 8);
  const uint8Array = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const byte = str.slice(i * 8, (i + 1) * 8);
    uint8Array[i] = parseInt(byte, 2);
  }
  return uint8Array;
}

function hex(buffer) {
  var digest = "";
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    var value = view.getUint32(i);
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    var stringValue = value.toString(16);
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    var padding = "00000000";
    var paddedValue = (padding + stringValue).slice(-padding.length);
    digest += paddedValue;
  }
  return digest;
}

function hex(buffer) {
  var digest = "";
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    var value = view.getUint32(i);
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    var stringValue = value.toString(16);
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    var padding = "00000000";
    var paddedValue = (padding + stringValue).slice(-padding.length);
    digest += paddedValue;
  }

  return digest;
}
