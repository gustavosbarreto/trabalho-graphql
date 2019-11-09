# Trabalho GraphQL

## Executando

Antes de executar o projeto é preciso instalar os módulos do npm:

```$ npm install```

Para um funcionamento correto da aplicação é necessário executar o projeto
com o comando `npm start` para que as migrações e as sementes sejam executadas
antes de iniciar o servidor GraphQL.

Quando a aplicação é executada pela primeira vez um usuário administrador inicial
é criado com o email `admin@example.com` e com a senha `admin`.

## Executando com Docker

O projeto foi containerizado em uma imagem e disponilizado no Docker Hub.
Para executar com o Docker execute o seguinte comando:

```
$ docker run -p 4000:4000 gustavosbarreto/trabalho-graphql
```

# GraphQL Schema

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [Subscription](#subscription)
    * [TimeRegistry](#timeregistry)
    * [Token](#token)
    * [User](#user)
  * [Enums](#enums)
    * [Role](#role)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>users</strong></td>
<td valign="top">[<a href="#user">User</a>!]</td>
<td>

Query que retorna todos os usuários
Note que somente administradores podem executar essa query

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currentUser</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td>

Retorna o usuário corrente que está autenticado

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timeRegistries</strong></td>
<td valign="top">[<a href="#timeregistry">TimeRegistry</a>!]</td>
<td>

Query que retorna todas as batidades de pontos de todos usuários.
Note que somente administradores podem executar essa query

</td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>signUp</strong></td>
<td valign="top"><a href="#token">Token</a>!</td>
<td>

Mutation para registro de novos usuários

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>signIn</strong></td>
<td valign="top"><a href="#token">Token</a>!</td>
<td>

Mutation para login de usuários registrados

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createTimeRegistry</strong></td>
<td valign="top"><a href="#timeregistry">TimeRegistry</a>!</td>
<td>

Efetua uma batida de ponto para o usuário corrente.
Note que somente usuários authenticados podem executar essa mutation

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteTimeRegistry</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Apaga uma batida de ponto de qualquer usuário.
Note que somente administradores podem executar essa mutation

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Subscription

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>_</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timeRegistryCreated</strong></td>
<td valign="top"><a href="#timeregistry">TimeRegistry</a></td>
<td>

Evento que é disparado quando uma batida é efetuada.
Note que somente administradores podem subscrever a este evento

</td>
</tr>
</tbody>
</table>

### TimeRegistry

TimeRegistry representa uma batida de ponto

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userId</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

ID do usuário que efetuou a batida de ponto

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

Usuário que efetuou a batida de ponto

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#date">Date</a>!</td>
<td>

Data em quem a batida de ponto foi efetuada

</td>
</tr>
</tbody>
</table>

### Token

Token de autenticação

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>token</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### User

User representa um usuário

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Nome do usuário

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

E-mail do usuário

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Senha de acesso do usuário

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>role</strong></td>
<td valign="top"><a href="#role">Role</a></td>
<td>

Papel do usuário

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timeRegistries</strong></td>
<td valign="top">[<a href="#timeregistry">TimeRegistry</a>!]!</td>
<td>

Batidas de pontos do usuário

</td>
</tr>
</tbody>
</table>

## Enums

### Role

Tipos de papéis de usuários

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>USER</strong></td>
<td>

Usuário comum

</td>
</tr>
<tr>
<td valign="top"><strong>ADMIN</strong></td>
<td>

Administrador

</td>
</tr>
</tbody>
</table>
