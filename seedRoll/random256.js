function random256() {
  let number_string = "0b";
  for (let i = 0; i < 256; i++) {
    number_string += Math.random() >= 0.5 ? "1" : "0";
  }
  return BigInt(number_string);
}
