function addCommas(num) {
  if (typeof num !== "number") parseInt(num);
  // let hNum = Math.floor(num)
  console.log(typeof num)
  let numParts = num.toString().split(".");
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numParts.join(".");
}

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}


function getCrypto() {

  var xhr = new XMLHttpRequest();

  xhr.open('get', "https://api.coinlore.net/api/tickers/");

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {

      var rawData = JSON.parse(xhr.responseText);
      console.log(rawData);

      for (let coin of rawData.data) {
        let row = document.createElement('tr');
        let rank = document.createElement('td');
        rank.textContent = coin.rank;
        row.appendChild(rank);
        
        let name = document.createElement('td');
        name.textContent = coin.name + " " + coin.symbol;
        row.appendChild(name);

        let price = document.createElement('td');
        price.textContent = "$" + coin.price_usd;
        row.appendChild(price);
        
        let hour = document.createElement('td');
        if ( 0<coin.percent_change_1h) {
          hour.style.color = 'greenyellow';
          hour.textContent = "▲" + coin.percent_change_1h; 
        } else if ( 0>coin.percent_change_1h) {
          hour.style.color = 'tomato';
          hour.textContent = "▼" + coin.percent_change_1h;
        } else if ( 0 == coin.percent_change_1h) {
          hour.style.color = 'white';
          hour.textContent = "😗" + coin.percent_change_1h; 
        }
        row.appendChild(hour);
        
        let day = document.createElement('td');
        if ( 0<coin.percent_change_24h) {
          day.style.color = 'greenyellow';
          day.textContent = "▲" + coin.percent_change_24h  
        } else if ( 0>coin.percent_change_24h) {
          day.style.color = 'tomato';
          day.textContent = "▼" + coin.percent_change_24h
        } else if ( 0 == coin.percent_change_24h) {
          day.style.color = 'white';
          day.textContent = "😗" + coin.percent_change_24h; 
        }
        
        row.appendChild(day);

        let week = document.createElement('td');
        if ( 0<coin.percent_change_7d) {
          week.style.color = 'greenyellow';
          week.textContent = "▲" + coin.percent_change_7d  
        } else if ( 0>coin.percent_change_7d) {
          week.style.color = 'tomato';
          week.textContent = "▼" + coin.percent_change_7d
        } else if ( 0 == coin.percent_change_7d) {
          week.style.color = 'white';
          week.textContent = "😗" + coin.percent_change_7d; 
        }
        row.appendChild(week);
        
        let mark = document.createElement('td');
        mark.textContent = "$" + addCommas(financial(coin.market_cap_usd));
        row.appendChild(mark);
        
        let vol = document.createElement('td');
        vol.textContent = addCommas(financial(coin.volume24));
        row.appendChild(vol);
        
        let sup = document.createElement('td');
        sup.textContent = addCommas(parseInt(coin.csupply)) + ' ' + coin.symbol;
        row.appendChild(sup);
        
        
        

        let table = document.querySelector('table');
        table.appendChild(row);
      }

    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
      console.log(`there's an error
      code: ${xhr.status}
      text: ${xhr.statusText}`);
    }
  });
  xhr.send(null);
};
getCrypto();