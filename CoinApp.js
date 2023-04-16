import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [result, setResult] = useState(0);
  const [selectId, setSelectId] = useState("");

  const handleMoney = (event) => {
    setMoney(event.target.value);
  };

  const handleClick = () => {
    console.log("in Click selectId = " + selectId);
    const selectCoin = coins.find((it) => it.id === selectId);
    console.log(selectCoin);
    setResult(money / selectCoin.quotes.USD.price);
  };

  const handleSelect = (event) => {
    console.log("selected = " + event.target.value);
    setSelectId(event.target.value);

    console.log("let selected = " + selectId);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? <string>Loading...</string> : null}

      <select onChange={handleSelect}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
          </option>
        ))}
      </select>
      <hr />
      <input value={money} onChange={handleMoney} placeholder="$ money"></input>
      <button onClick={handleClick}>clac</button>

      <h3>Can Buy: {result}</h3>
    </div>
  );
}

export default App;
