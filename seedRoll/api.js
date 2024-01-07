function get_balance(
  endpoint,
  adresses,
  api_key,
  class_for_balances,
  id_for_total
) {
  axios
    .get(endpoint, {
      params: {
        module: "account",
        action: "balancemulti",
        tag: "latest",
        address: adresses,
        apikey: api_key,
      },
    })
    .then((rs) => {
      for (let i = 0; i < PHRASE_COUNT_ON_PAGE; i++) {
        document.getElementsByClassName(class_for_balances)[i].innerText =
          rs.data.result[i].balance;
      }

      let total = rs.data.result.reduce((a, i) => a + parseInt(i.balance), 0);

      total = total / 1e18;

      document.getElementById(id_for_total).children[0].innerText = total;

      if (total > 0) {
        document
          .getElementById(id_for_total)
          .classList.add(...STYLE_GREEN_CHIP.split(" "));

        document.getElementById(id_for_total).children[0].innerText =
          total.toFixed(18);
      }
    });
}
