### CLEAN ARCHITECTURE

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" width="400" alt="Brain-ag logo" /></a>
</p>

---

### Descrição

Este projeto foi desenvolvido visando estudar e aplicar os conceitos da Clean Architecture (Arquitetura Limpa). Ela é um modelo de design de software que visa a separação clara de responsabilidades, garantindo que as regras de negócio do sistema permaneçam isoladas de detalhes de implementação como frameworks, bancos de dados ou interfaces de usuário. Ou seja, nossas classes não devem ser diretamente acopladas a outras classes e sim trabalhar em cima de uma interface ou classe abstrata. Dessa forma, nossa classe conhece apenas a abstração, que define os métodos e atributos necessários para ela conseguir atingir seu propósito.

### Sobre a Aplicação

A API que desenvolvi para aperfeiçoar meus conhecimentos sobre a clean architecture foi um sistema de compra de um plano médico, onde o usuário pode adquirir, ver a lista de planos, adquirir e cancelar se desejar. Para desenvolver essa aplicação, utilizei o Express como framework, já que ele eh mais modularizado e assim iria conseguir aplicar as boas práticas da Clean Archictecure da melhor maneira. Para persistir os dados, optei pelo banco de dados relacional PostgreSQL, e para fazer a comunicação entre a API e o banco, utilizei o TypeORM.

### Tecnologias usadas

- Node.js
- Express
- Postgres
- TypeORM
- Docker
- Node Mailer
- Jest
- Typescript

Entre outras bibliotecas.
