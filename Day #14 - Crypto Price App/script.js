// Realiza uma requisição à API CoinGecko para obter informações sobre criptomoedas específicas
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true')
    .then(res => res.json())  // Converte a resposta para formato JSON
    .then(json => {
        // Seleciona o elemento HTML com a classe 'container' para exibir as informações
        const container = document.querySelector('.container');
        // Obtém os nomes das criptomoedas a partir das propriedades do objeto JSON
        const coins = Object.getOwnPropertyNames(json);

        // Loop sobre cada criptomoeda para exibir as informações na interface do usuário
        for (let coin of coins) {
            // Obtém as informações de preço e variação de 24 horas da criptomoeda atual
            const coinInfo = json[`${coin}`];
            const price = coinInfo.usd;
            const change = coinInfo.usd_24h_change.toFixed(5);

            // Adiciona as informações ao HTML, criando divs para representar cada criptomoeda
            container.innerHTML += `
                <div class="coin ${change < 0 ? 'falling' : 'rising'}">
                    <div class="coin-logo">
                        <img src="images/${coin}.png">
                    </div>
                    <div class="coin-name">
                        <h3>${coin}</h3>
                        <span>/USD</span>
                    </div>
                    <div class="coin-price">
                        <span class="price">$${price}</span>
                        <span class="change">${change}</span>
                    </div>
                </div>
            `;
        }
    });
