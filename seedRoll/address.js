function calcBip32ExtendedKey(path) {
  // Check there's a root key to derive from
  if (!bip32RootKey) {
    return bip32RootKey;
  }
  var extendedKey = bip32RootKey;
  // Derive the key from the path
  var pathBits = path.split("/");
  for (var i = 0; i < pathBits.length; i++) {
    var bit = pathBits[i];
    var index = parseInt(bit);
    if (isNaN(index)) {
      continue;
    }
    var hardened = bit[bit.length - 1] == "'";
    var isPriv = !extendedKey.isNeutered();
    var invalidDerivationPath = hardened && !isPriv;
    if (invalidDerivationPath) {
      extendedKey = null;
    } else if (hardened) {
      extendedKey = extendedKey.deriveHardened(index);
    } else {
      extendedKey = extendedKey.derive(index);
    }
  }
  return extendedKey;
}

function joinWords(words) {
  var space = " ";
  return words.join(space);
}

function splitWords(mnemonic) {
  return mnemonic.split(/\s/g).filter(function (x) {
    return x.length;
  });
}

function normalizeString(str) {
  return str.normalize("NFKD");
}

function hmacSHA512(key) {
  var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
  this.encrypt = function () {
    return hasher.encrypt.apply(hasher, arguments);
  };
}

function mnemonic_to_seed(mnemonic) {
  let passphrase = "";
  mnemonic = joinWords(splitWords(mnemonic)); // removes duplicate blanks
  var mnemonicNormalized = normalizeString(mnemonic);
  passphrase = normalizeString(passphrase);
  passphrase = "mnemonic" + passphrase;
  var mnemonicBits = sjcl.codec.utf8String.toBits(mnemonicNormalized);
  var passphraseBits = sjcl.codec.utf8String.toBits(passphrase);
  const PBKDF2_ROUNDS = 2048;
  var result = sjcl.misc.pbkdf2(
    mnemonicBits,
    passphraseBits,
    PBKDF2_ROUNDS,
    512,
    hmacSHA512
  );
  var hashHex = sjcl.codec.hex.fromBits(result);
  return hashHex;
}

function mnemonic_to_address(m) {
  let bip39seed = mnemonic_to_seed(m); // without password
  bip32RootKey = bitcoinjs.bitcoin.HDNode.fromSeedHex(
    bip39seed,
    bitcoinjs.bitcoin.networks.bitcoin
  );
  const path = "m/44'/60'/0'/0"; // ETH derivation path
  let extendedKey = calcBip32ExtendedKey(path);
  let key = extendedKey.derive(0);
  let keyPair = key.keyPair;
  let pubkeyBuffer = keyPair.getPublicKeyBuffer();
  let ethPubkey = ethUtil.importPublic(pubkeyBuffer);
  let addressBuffer = ethUtil.publicToAddress(ethPubkey);
  let hexAddress = addressBuffer.toString("hex");
  let checksumAddress = ethUtil.toChecksumAddress(hexAddress);
  address = ethUtil.addHexPrefix(checksumAddress);

  return address;
}

//mnemonic_to_address('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about');
