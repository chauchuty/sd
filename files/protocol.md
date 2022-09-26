## Login:
##### Cliente
```json
{
    "operacao": "login",
    "parametros": {
        "ra": "2098270",
        "senha": "010203"
    }
}
```
### Servidor:
```json
{
    "status": 200,
    "mensagem": "Usuário logado com sucesso!",
    "dados": {
    }
}

{
    "status": 404,
    "mensagem": "Usuário não encontrado / Usuário ou senha inválido!",
    "dados": {}
}

{
    "status": 403,
    "mensagem": "Usuário já encontra-se conectado!",
    "dados": {}
}

{
    "status": 500,
    "mensagem": "Erro interno do servidor",
    "dados": {}
}
```

## Cadastro:
##### Cliente
```json
{
    "operacao": "cadastrar",
    "parametros": {
        "nome": "Jacúncio José",
        "ra": "2098270",
        "senha": "010203",
        "categoria_id": 3,
        "descricao": "Estudante de Engenharia de Software"
    }
}

```
### Servidor:
```json
{
    "status": 201,
    "mensagem": "Usuário cadastrado com sucesso!",
    "dados": {}
}

{
    "status": 400,
    "mensagem": "Parâmetros enviados não correspondem à operação!",
    "dados": {}
}

{
    "status": 202,
    "mensagem": "Usuário já encontra-se conectado!",
    "dados": {}
}

{
    "status": 500,
    "mensagem": "Erro interno do servidor",
    "dados": {}
}
```

## Logout:
##### Cliente
```json
{
    "operacao": "logout",
    "parametros": {
        "ra": "2098270",
        "senha": "010203",
    }
}

```
### Servidor:
```json
{
    "status": 600,
    "mensagem": "Usuário desconectado com sucesso!",
    "dados": {}
}

{
    "status": 404,
    "mensagem": "Usuário não encontrado!",
    "dados": {}
}

{
    "status": 202,
    "mensagem": "Usuário já  encontra-se desconectado!",
    "dados": {}
}

{
    "status": 500,
    "mensagem": "Erro interno do servidor",
    "dados": {}
}
```