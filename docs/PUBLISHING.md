# 🚀 Guia de Publicação (GitHub & NPM)

Este guia explica passo a passo como subir seu projeto `xdcanvas` para o GitHub e publicar a biblioteca no NPM.

---

## 📦 Parte 1: Subindo para o GitHub

### 1. Inicializar o Git
Abra o terminal na pasta do projeto e rode:

```bash
git init
git add .
git commit -m "Initial commit: XDCanvas v1.0.0"
```

### 2. Criar o Repositório
1.  Vá em [GitHub.com](https://github.com) e crie um novo repositório (ex: `xdcanvas`).
2.  **Não** marque para criar README ou .gitignore (já temos).

### 3. Conectar e Enviar
Copie os comandos que o GitHub te der, que serão parecidos com estes:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/xdcanvas.git
git push -u origin main
```

---

## 📦 Parte 2: Publicando no NPM

### 1. Preparação (Já feito!)
Eu já configurei para você:
*   ✅ `package.json`: Nome, versão, arquivos permitidos (`dist/`).
*   ✅ `.npmignore`: Ignora arquivos de teste e código fonte cru.
*   ✅ `build`: O script `npm run build` gera a pasta `dist`.

### 2. Login no NPM
Se você ainda não está logado no terminal:

```bash
npm login
```
*(Siga as instruções na tela: Username, Password, Email)*

### 3. Verificar o Nome
Certifique-se que o nome `xdcanvas` no `package.json` é único. Se der erro de permissão, mude o nome para algo como `@seu-usuario/xdcanvas`.

### 4. Publicar
Rode o comando mágico:

```bash
npm publish --access public
```

---

## 🔄 Atualizando Versões Futuras

Quando você fizer alterações e quiser lançar a **v1.0.1**:

1.  **Atualize a versão**:
    ```bash
    npm version patch
    # ou 'minor' para 1.1.0, 'major' para 2.0.0
    ```
2.  **Recompile**:
    ```bash
    npm run build
    ```
3.  **Publique novamente**:
    ```bash
    npm publish
    ```
4.  **Envie para o GitHub**:
    ```bash
    git push
    ```
