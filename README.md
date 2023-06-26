# GameBits

Uma rede social de catalogação e resenha de jogos de videogame.

<img src=https://i.imgur.com/4VzeehX.png>
<img src=https://i.imgur.com/MJQPmts.png>

O deploy da aplicação pode ser acessado em: https://gamebits-front.vercel.app/

## Sobre o projeto

Esta é uma aplicação desenvolvida em NextJS, completamente responsiva, onde tudo, desde design até a implementação, foi feito por mim. O objetivo do projeto é ser uma rede social de catalogação e resenha de jogos de videogame, onde o usuário pode criar uma conta, adicionar jogos à sua biblioteca e seguir outros usuários. Além disso é possível marcar os jogos como terminados, platinados e adicionar o tempo de jogo, para que o usuário possa ter um controle sobre seus jogos. Também conta com uma Wishlist, onde o usuário pode adicionar jogos que deseja adicionar à sua biblioteca futuramente.

O projeto integra uma API REST desenvolvida em NodeJS, cujo repositório pode ser acessado [aqui](https://github.com/encarnacao/gamebits-api), e também utiliza a API do IGDB para obter informações sobre os jogos.

Futuramente pretendo adicionar mais funcionalidades, como o sistema de reviews, onde o usuário poderá escrever uma resenha sobre um jogo, que contará com upvotes e downvotes, e também exibir estatísticas sobre os jogos, como tempo médio de jogo e nota baseada nas reviews.

## Tecnologias utilizadas

- NextJS
- HeroIcons
- Axios
- TypeScript
- DayJS
- TailwindCSS
- Nookies

## Como executar o projeto

Para executar o projeto é necessário a configuração da variável de ambiente `NEXT_PUBLIC_API_URL`, que deve conter a URL da API REST que pode ser executada seguindo os passos de seu [repositório](https://github.com/encarnacao/gamebits-api). Após isso, basta executar os seguintes comandos:

```bash
# Instalar as dependências
$ npm install

# Executar o projeto
$ npm run dev
```

### Autor

Feito por [Caio Encarnação](http://github.com/encarnacao).