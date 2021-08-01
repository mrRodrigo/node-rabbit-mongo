# Backend Challenge

A ideia deste repositório é implementar o desafio Backend proposto pela empresa Delivery Much. Para consultá-lo clique [aqui](https://github.com/delivery-much/backend-challenge).

[Aqui](https://github.com/mrRodrigo/node-rabbit-mongo/projects/1) pode ser consultado o plano de desenvolvimento.

### Tecnologias utilizadas

- NodeJS (14.17.4)
- MongoDB

### Como rodar

#### Ambiente

Primeiro é preciso subir todo o ambiente da aplicação. Para isso pode-se utilizar o docker-compose.yml localizado na raiz deste repositório. Basta utilizar o comando abaixo.

```shell
$ docker-compose up
```

Com ele teremos o serviço do RabbitMQ, MongoDB, serviço de stock disponibilizado pela Delivery Much e o seed para o Mongo.

#### Aplicação

Para rodara a aplicação primeiro é necessário instalar todas dependências. Utilizando o npm, por exemplo:

``` npm install ```

A aplicação contém 2 scripts básicos:

``` npm run dev ``` Para rodar em ambiente de desenvolvimento (único).

``` npm run test:unit ``` Para rodar os testes unitários.

Por padão a aplicação aceita requisições HTTP na porta 4000.
