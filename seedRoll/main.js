const page_entropy = page * BigInt(20);

const entropy_size = words * 11 - Math.floor(words / 3);

const table_body = document.getElementById("table-body");

var array_of_adreses = [];

(async () => {
  for (let i = 0; i < PHRASE_COUNT_ON_PAGE; i++) {
    let page_entropy_bits = (page_entropy + BigInt(i))
      .toString(2)
      .padStart(entropy_size, "0");

    // .then((hash) => {});
    const hash = await crypto.subtle.digest(
      "SHA-256",
      convertStringToUint8Array(page_entropy_bits)
    );
    const page_entropy_hash = hex(hash);

    const checksum = hex2bin(page_entropy_hash).slice(
      0,
      Math.floor(page_entropy_bits.length / 32)
    );

    page_entropy_bits += checksum;

    seed_phrase = bigIntToArray(BigInt("0b" + page_entropy_bits))
      .map((x) => wordlist_eng[x])
      .reduce((a, i) => a + " " + i);

    const table_row = document.createElement("tr");
    const table_phrase = document.createElement("th");
    const table_token1 = document.createElement("td");
    const table_token2 = document.createElement("td");
    ("");
    table_row.classList.add(..."bg-white dark:bg-gray-800".split(" "));
    table_phrase.classList.add(
      ..."px-2 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white".split(
        " "
      )
    );
    table_token1.classList.add(..."token1 px-2 py-4".split(" "));
    table_token2.classList.add(..."token2 px-2 py-4".split(" "));

    table_phrase.innerText = seed_phrase;
    table_token1.innerText = "...";
    table_token2.innerText = "...";

    table_row.appendChild(table_phrase);
    table_row.appendChild(table_token1);
    table_row.appendChild(table_token2);
    table_body.appendChild(table_row);

    array_of_adreses.push(mnemonic_to_address(seed_phrase));
  }

  get_balance(
    "https://api.etherscan.io/api",
    array_of_adreses.join(","),
    API_CREDENTIALS_ETHERSCAN,
    "token1",
    "total_eth"
  );

  get_balance(
    "https://api.bscscan.com/api",
    array_of_adreses.join(","),
    API_CREDENTIALS_BSCSCAN,
    "token2",
    "total_bnb"
  );
})();
