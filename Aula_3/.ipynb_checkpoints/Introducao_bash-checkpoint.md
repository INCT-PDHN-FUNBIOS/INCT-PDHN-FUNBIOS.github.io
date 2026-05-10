# Introdução ao UNIX para a Bioinformática

---

> **Antes de começar:** o seu **nome de usuário** e **senha provisória** para acessar o servidor do LGBIO serão enviados individualmente por **e-mail**, por motivos de segurança. Verifique a sua caixa de entrada (e a pasta de spam) antes da aula. Caso não tenha recebido, entre em contato com a docente responsável.

---

## Objetivos de aprendizagem

Ao final desta aula, você será capaz de:

1. Explicar, em poucas palavras, o que é UNIX, o que é um *shell* e por que essas ferramentas são tão usadas em Bioinformática.
2. Conectar-se ao servidor do LGBIO via SSH e trocar a sua senha provisória.
3. Navegar entre diretórios e listar arquivos no servidor (`pwd`, `ls`, `cd`, `mkdir`).
4. Criar, copiar, mover e remover arquivos com segurança (`nano`, `cp`, `mv`, `rm`).
5. Transferir arquivos entre o seu computador e o servidor (`scp`).
6. Usar atalhos de teclado essenciais do terminal e o histórico de comandos.
7. Manipular grandes arquivos de texto encadeando comandos com *pipes* (`cat`, `head`, `tail`, `wc`, `grep`, `cut`, `sort`, `uniq`, `sed`).
8. Verificar o uso de espaço em disco e os processos em execução no servidor.
9. Manter sessões persistentes com `tmux` para rodar análises longas sem perder o trabalho ao desconectar.
10. Pedir ajuda ao próprio sistema (`--help`, `man`) sempre que esquecer um comando.

**Tempo estimado:** 2h00 a 2h30 de leitura + prática.

---

## Pré-requisitos

- Um computador com acesso à internet.
- Seu **usuário e senha provisória** (enviados por e-mail).
- Disposição para errar e tentar de novo. Errar comandos é parte do aprendizado — o terminal não vai quebrar o computador.

---

# Parte 0 — Por que UNIX em Bioinformática?

> *Esta seção é só leitura. Se quiser pular direto para a prática, vá para a **Parte 1**, mas recomendamos voltar aqui depois.*

## O que é UNIX (e Linux)?

**UNIX** é uma família de sistemas operacionais criada nos anos 1970 e que hoje serve de base para a maioria dos servidores do mundo, do macOS, do Android e de toda a família **Linux**. Quando dizemos "comandos UNIX", estamos nos referindo a um conjunto de ferramentas pequenas e especializadas que podem ser combinadas para resolver problemas grandes — uma filosofia conhecida como *"Unix philosophy: do one thing and do it well"*.

## Servidor x computador local

Em Bioinformática, raramente analisamos dados no nosso próprio notebook. Os arquivos costumam ser **muito grandes** (genomas inteiros, milhões de leituras de sequenciamento) e exigem **muita memória, vários processadores e bastante espaço em disco**. Por isso usamos **servidores**: computadores potentes que ficam ligados o tempo todo e que acessamos remotamente.

O servidor do **LGBIO** é um desses computadores. Você não vai abrir o navegador nele nem clicar em ícones. Você vai se conectar pelo terminal e dar comandos por escrito.

## Shell, terminal e linha de comando

Esses três termos costumam confundir no começo:

- **Terminal**: a *janela* preta (ou colorida) onde você digita.
- **Shell**: o *programa* que interpreta o que você digitou e executa. O shell mais comum no Linux é o **Bash** (*Bourne Again SHell*).
- **Linha de comando** (ou *command line*): a *linha* dentro do terminal onde você digita o comando (por isso aparece um cursor piscando ali).

Quando você abre o terminal e vê algo como `usuario@servidor:~$`, o que está ali é o **prompt do shell**, esperando você digitar.

## Por que bioinformatas usam tanto UNIX?

1. **Automação**: você consegue processar mil arquivos com um único comando.
2. **Reprodutibilidade**: comandos podem ser salvos em scripts e executados de novo, exatamente igual.
3. **Combinação de ferramentas**: cada programa faz uma coisa, e você liga eles com *pipes* (`|`).
4. **Padrão da área**: praticamente todas as ferramentas de bioinformática (BLAST, BWA, samtools, bcftools…) rodam em linha de comando.

## O que é SSH?

**SSH** (*Secure SHell*) é o protocolo que permite **abrir um terminal de um computador remoto a partir do seu computador**, de forma segura (criptografada). Quando você executa `ssh usuario@servidor`, é como se você "entrasse" no servidor pelo terminal — tudo o que você digitar a partir dali será executado **lá**, não no seu computador.

---

# Parte 1 — Acessando o servidor via SSH

## 1.1) Abrindo um terminal no seu computador

Antes de tudo, você precisa abrir um terminal **no seu computador**:

| Sistema operacional | Como abrir o terminal |
|---|---|
| **Windows 10/11** | Abra o **Prompt de Comando** (cmd) ou o **PowerShell** ou o **Windows Terminal**. Qualquer um serve. |
| **macOS** | Abra o **Terminal** (`Applications > Utilities > Terminal` ou ⌘+Espaço e digite "Terminal"). |
| **Linux** | Abra o **Terminal** do seu ambiente (atalho comum: `Ctrl + Alt + T`). |

No Laboratório de Informática, basta abrir o **Prompt de Comando** do Windows.

## 1.2) Conectando ao servidor

Com o terminal aberto, digite (substituindo `seuusuario` pelo usuário que você recebeu por e-mail):

```bash
ssh seuusuario@lg.bio.br -p 53846
```

Na **primeira conexão**, o servidor vai te perguntar se você confia naquela máquina, com uma mensagem parecida com:

```
The authenticity of host 'lg.bio.br ...' can't be established.
ED25519 key fingerprint is SHA256:...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Digite `yes` e aperte **Enter**. Depois, o servidor vai pedir a sua **senha provisória** (a que você recebeu por e-mail).

> **Atenção:** ao digitar a senha, **nada aparece na tela** — nem mesmo asteriscos. Isso é normal e proposital. Digite a senha completa e aperte **Enter**.

## 1.3) Trocando a senha no primeiro acesso

No seu primeiro acesso, o servidor vai pedir que você troque a senha provisória por uma nova. Escolha uma **senha forte** (mistura de letras maiúsculas, minúsculas, números e símbolos) e **anote em local seguro** — sem ela, você não consegue mais entrar.

## 1.4) Você está dentro

Após o login, você verá o **prompt de comando do servidor**. É ali que você digitará os comandos. Se o prompt não estiver visível, é porque o servidor está ocupado executando algo — basta aguardar.

## 1.5) Saindo do servidor

Para fechar a conexão e voltar ao terminal do seu computador, basta digitar:

```bash
exit
```

> **Troubleshooting — problemas comuns no primeiro acesso**
>
> - **`ssh: command not found`** — Você está em uma versão antiga do Windows sem cliente SSH. Atualize o Windows ou instale o [Git Bash](https://git-scm.com/downloads).
> - **`Connection refused` ou `Connection timed out`** — Confira se digitou o endereço do servidor corretamente (`lg.bio.br`) e se a sua conexão de internet está funcionando.
> - **`Permission denied (publickey,password)`** — A senha foi digitada errada. Lembre-se: é a senha provisória recebida por e-mail. Caracteres não aparecem ao digitar.
> - **Senha não é aceita ao trocar** — A senha nova precisa ser **forte** (≥ 8 caracteres, com letras, números e símbolos) e **diferente** da provisória.
> - **A tela parece travada após digitar a senha** — Provavelmente não está travada. Aperte **Enter** e veja se o login completa.

---

# Parte 2 — Navegando entre os diretórios do servidor

## 2.1) Onde eu estou? (`pwd`)

Todos os seus passos no servidor envolvem **digitar comandos**. Por exemplo, para descobrir em qual diretório você está, digite `pwd` (do inglês *Print Working Directory*):

```bash
# Esta linha é um COMENTÁRIO.
# Em Bash, linhas iniciadas por # são ignoradas pelo computador.
# Use comentários para deixar anotações para você mesmo(a) ou para colegas.

# Para identificar o caminho até o seu diretório atual:
pwd
```

O caminho retornado por `pwd` é um **caminho absoluto**, ou seja, expresso em relação à raiz (`/`) do servidor. Mais adiante, você vai usar também **caminhos relativos**, que partem do diretório atual (ex.: `../diretorio2`).

> Sempre que você entrar no servidor, será direcionado(a) ao seu diretório **home**, que é justamente esse mostrado pelo `pwd` agora.

## 2.2) O que tem aqui? (`ls`)

Para listar arquivos e diretórios do diretório atual, use `ls` (de *list*):

```bash
# Lista simplificada:
ls
```

## 2.3) Criando uma pasta (`mkdir`)

Provavelmente o `ls` ainda não retornou nada — sua pasta está vazia. Para criar um diretório novo, use `mkdir` (*Make Directory*):

```bash
mkdir novodiretorio
```

> **Importante — nomes de arquivos e diretórios**
>
> Evite ao máximo espaços e caracteres especiais (`@`, `#`, `&`, acentos, `ç`, etc.) em nomes de arquivos e diretórios no Linux. Para separar palavras, use:
>
> - `_` (underline) → `meu_arquivo.txt`
> - `-` (traço) → `meu-arquivo.txt`
> - `.` (ponto) → `meu.arquivo.txt`

## 2.4) Listando com mais detalhes

Agora, ao listar de novo, você verá o `novodiretorio`:

```bash
# Lista simplificada:
ls

# Lista detalhada (permissões, dono, tamanho, data, arquivos ocultos):
ls -lah
# -l : detalhes em formato de lista (permissões, dono, tamanho...)
# -a : mostra arquivos ocultos (que começam com ".")
# -h : tamanhos legíveis para humanos (KB, MB, GB)
```

<details>
<summary><b>Outras opções úteis do <code>ls</code></b></summary>

| Opção | Descrição |
|---|---|
| `ls -l` | Lista com detalhes (permissões, tamanho, dono, etc.). |
| `ls -a` | Exibe arquivos ocultos (que começam com `.`). |
| `ls -h` | Mostra tamanhos em formato legível (KB, MB, GB). |
| `ls -t` | Ordena por data de modificação mais recente. |
| `ls -r` | Exibe os arquivos em ordem reversa. |
| `ls -R` | Lista recursivamente (inclui subdiretórios). |
| `ls -1` | Mostra um arquivo por linha. |
| `ls -S` | Ordena por tamanho (do maior para o menor). |

</details>

<details>
<summary><b>Anatomia da saída do <code>ls -l</code></b></summary>

Cada linha do `ls -l` mostra informações detalhadas de um arquivo ou diretório. Por exemplo:

```
-rw-r--r-- 1 root root 1528 Out 31 22:33 /etc/passwd
```

Os campos, da esquerda para a direita, são:

| Campo | Exemplo | O que indica |
|---|---|---|
| Tipo + permissões | `-rw-r--r--` | Tipo de objeto e permissões (detalhe abaixo) |
| Nº de links | `1` | Quantos atalhos apontam para este item |
| Dono | `root` | Usuário dono |
| Grupo | `root` | Grupo dono |
| Tamanho | `1528` | Tamanho em bytes (ou legível com `-h`) |
| Data e hora | `Out 31 22:33` | Última modificação |
| Nome | `/etc/passwd` | Nome (ou caminho) do arquivo |

### Os 10 caracteres iniciais (tipo + permissões)

Os primeiros 10 caracteres dividem-se em **1 + 3 + 3 + 3**:

```
 -    rw-    r--    r--
 |     |      |      |
tipo  dono  grupo  outros
```

**1º caractere — tipo do objeto:**

| Caractere | Significado |
|---|---|
| `-` | arquivo comum |
| `d` | diretório |
| `l` | link simbólico (atalho) |
| `b` | arquivo de bloco |

**Caracteres 2–10 — três trios de permissões**, sempre na ordem `r w x`:

| Letra | Significado em arquivo | Significado em diretório |
|---|---|---|
| `r` (*read*) | ler o conteúdo | listar o conteúdo (`ls`) |
| `w` (*write*) | modificar o conteúdo | criar/apagar arquivos dentro |
| `x` (*execute*) | executar o arquivo | entrar (`cd`) no diretório |
| `-` | permissão ausente | permissão ausente |

Os três trios indicam, nesta ordem, as permissões do **dono**, do **grupo dono** e dos **outros** (todo mundo).

### Exemplos

| Notação | Tipo | Dono | Grupo | Outros |
|---|---|---|---|---|
| `-rw-r--r--` | arquivo | lê e escreve | só lê | só lê |
| `-rwxr-xr-x` | arquivo executável | tudo | lê e executa | lê e executa |
| `drwxr-xr-x` | diretório | tudo | lê e entra | lê e entra |
| `drwx------` | diretório privado | tudo | nada | nada |
</details>

## 2.5) Entrando e saindo de diretórios (`cd`)

Use variações do `cd` (*Change Directory*) para se mover:

```bash
# Entrar em um subdiretório:
cd novodiretorio

# Conferir onde você está agora:
pwd

# Voltar ao diretório anterior (subir um nível):
cd ..

# Voltar para o seu diretório home, de qualquer lugar do servidor:
cd
# Ou, equivalente:
cd ~
```

> **Atalhos úteis de caminho:**
>
> - `.` → diretório atual (ex.: `cp arquivo.txt .` copia para a pasta atual)
> - `..` → diretório pai (um nível acima)
> - `~` → seu diretório home (ex.: `cd ~/Documentos`)
> - `/` → raiz do servidor

## 2.6) Outros comandos básicos úteis

Antes de avançar, vale conhecer alguns comandos curtos que você usará o tempo todo:

```bash
# Quem sou eu? (mostra seu nome de usuário)
whoami

# Que dia/horário é agora no servidor?
date

# Imprime um texto na tela (útil para testar e ver variáveis):
echo "Olá, mundo!"
echo $HOME           # mostra o caminho do seu diretório home
echo $USER           # mostra seu usuário (mesma coisa que whoami)

# Cria um arquivo vazio (útil quando você só quer criar, sem editar):
touch arquivo_vazio.txt

# Limpa a tela do terminal (mas o histórico continua acessível com a seta para cima):
clear
# Atalho equivalente: Ctrl + L
```

> **Variáveis de ambiente** são "atalhos" do sistema que guardam informações úteis. Sempre que você ver `$NOME`, é uma variável. As mais comuns são `$HOME` (caminho do home), `$USER` (seu usuário) e `$PATH` (lista de pastas onde o sistema busca programas).

---

# Parte 3 — Criando, copiando, movendo e removendo arquivos

## 3.1) Criando um arquivo de texto (`nano`)

Você pode criar arquivos diretamente no servidor com editores de texto. Vamos usar o **`nano`**, que é o mais simples para começar:

```bash
# Abrir/criar o arquivo:
nano novoarquivo.txt
```

O `nano` vai abrir uma tela em branco. Digite as seguintes informações, substituindo pelas suas próprias respostas — pode ser o que primeiro vier à mente, não tem certo nem errado:

```
Olá mundo!
Organismo de interesse: Escherichia coli
Gene favorito: TP53
Banco de dados que mais usa: NCBI
Linguagem que quer aprender: Python
Área de pesquisa: Genômica
```

Para salvar e sair:

1. Aperte **Ctrl + X** (sair)
2. Quando perguntar se quer salvar, digite **S** (sim)
3. Aperte **Enter** para confirmar o nome do arquivo

> Para abrir o arquivo de novo (para editar), basta rodar `nano novoarquivo.txt` outra vez. Lembre-se: dentro do `nano`, você navega usando as **setas** do teclado (não dá para clicar com o mouse).

## 3.2) Copiando e movendo arquivos (`cp` e `mv`)

Os comandos `cp` (*CoPy*, copiar) e `mv` (*MoVe*, mover) seguem **exatamente o mesmo padrão**:

```bash
cp ORIGEM DESTINO    # copia (origem continua existindo)
mv ORIGEM DESTINO    # move  (origem some)
```

A única diferença é que `cp` mantém o original e `mv` não. Vamos ver na prática.

### Copiar (`cp`)

```bash
# Copia "novoarquivo.txt" para dentro de "novodiretorio/":
cp novoarquivo.txt novodiretorio/
```

```
ANTES:                          DEPOIS:
home/                           home/
├── novoarquivo.txt             ├── novoarquivo.txt        ← original continua
└── novodiretorio/              └── novodiretorio/
                                    └── novoarquivo.txt    ← cópia criada
```

### Mover (`mv`)

```bash
# Move "novoarquivo.txt" para dentro de "novodiretorio/":
mv novoarquivo.txt novodiretorio/
```

```
ANTES:                          DEPOIS:
home/                           home/
├── novoarquivo.txt             └── novodiretorio/
└── novodiretorio/                  └── novoarquivo.txt    ← agora está aqui
```

### Renomear: é só "mover para um nome novo"

No Linux **não existe** um comando "rename" separado — você renomeia "movendo" o arquivo para um novo nome, no mesmo lugar:

```bash
# Renomeia "novoarquivo.txt" para "velhoarquivo.txt" (no mesmo diretório):
mv novoarquivo.txt velhoarquivo.txt
```

> **Como o `mv` decide entre "mover" e "renomear"?**
>
> - Se o **destino é um diretório existente** (ex.: `novodiretorio/`) → ele **move** o arquivo para lá, mantendo o nome.
> - Se o **destino é um nome novo** no mesmo lugar (ex.: `velhoarquivo.txt`) → ele **renomeia**.
>
> A mesma regra vale para `cp`: copiar para uma pasta mantém o nome; copiar para um nome novo gera uma cópia com nome diferente. Pratique chamando `ls` antes e depois de cada comando para ver o resultado.

> **Para o tutorial seguir**, deixe seu arquivo agora chamado `velhoarquivo.txt` e dentro de `novodiretorio/`:
>
> ```bash
> mv novoarquivo.txt velhoarquivo.txt        # primeiro renomeia
> mv velhoarquivo.txt novodiretorio/         # depois move para o novodiretorio
> ```

## 3.3) Caminhos absolutos vs. caminhos relativos

```bash
# Confirme onde você está:
pwd

# Caminho RELATIVO até o velhoarquivo.txt (a partir do diretório atual):
./novodiretorio/velhoarquivo.txt
```

> **QUESTÃO 1:** Qual o **caminho absoluto** para o `velhoarquivo.txt`? Ou seja, o caminho começando da raiz `/` do servidor.

> Lembrete: o diretório atual é representado por `.` e o diretório pai por `..`. Assim:
>
> - `..` → diretório pai
> - `../..` → "pai do pai" (dois níveis acima)
> - `../OutroDiretorio` → outro diretório dentro do diretório pai

> **DICA — autocompletar com Tab**
>
> Ao digitar um caminho, pressione **Tab** para que o sistema **complete automaticamente** os nomes de diretórios e arquivos. Se nada acontecer com um toque, pressione **Tab duas vezes** para ver todas as opções disponíveis. Use isso o tempo todo — economiza muita digitação e evita erros.

## 3.4) Removendo arquivos (`rm`)

```bash
# Remover um arquivo:
rm novodiretorio/backup.txt
```

> **CUIDADO COM `rm`**
>
> O `rm` **não manda para a lixeira** — ele apaga **definitivamente**, sem volta. Antes de rodar, **sempre confira o caminho** que você vai apagar. Em particular:
>
> - **Nunca** rode `rm -rf /` ou `rm -rf *` sem ter 100% de certeza do que está fazendo.
> - Use `ls` antes para conferir o que existe naquele caminho.
> - Em caso de dúvida, use `rm -i`, que pede confirmação para cada arquivo.

---

# Parte 4 — Transferindo arquivos entre o seu computador e o servidor

Em Bioinformática, é muito comum você ter um arquivo no seu computador (ex.: uma sequência baixada do NCBI) que precisa subir para o servidor para análise — e depois trazer os resultados de volta. O comando `scp` (*Secure CoPy*) faz isso usando a mesma conexão segura do SSH.

A sintaxe é a mesma do `cp`, mas com endereços de servidor:

```bash
scp -P 53846 ORIGEM DESTINO
```

> **Importante:** os comandos `scp` devem ser digitados no **terminal do seu computador local**, não dentro do servidor. Se você estiver conectado via SSH, saia primeiro com `exit`.

## 4.1) Enviando do seu computador para o servidor

```bash
# Enviar um arquivo para o seu home no servidor:
scp -P 53846 arquivo.fasta seuusuario@lg.bio.br:~/

# Enviar um arquivo para um subdiretório específico:
scp -P 53846 arquivo.fasta seuusuario@lg.bio.br:~/dados/

# Enviar uma pasta inteira (com -r de "recursivo"):
scp -P 53846 -r minha_pasta/ seuusuario@lg.bio.br:~/
```

## 4.2) Trazendo do servidor para o seu computador

Note que basta **inverter** os argumentos:

```bash
# Trazer um arquivo do servidor para a pasta atual no seu computador:
scp -P 53846 seuusuario@lg.bio.br:~/resultado.txt .

# Trazer uma pasta inteira:
scp -P 53846 -r seuusuario@lg.bio.br:~/resultados/ .
```

> **Sintaxe do endereço:** `usuario@servidor:caminho`. Os dois pontos `:` separam o servidor do caminho dentro dele. O `~` representa seu home no servidor.

> **Alternativa gráfica:** se preferir interface visual, programas como [FileZilla](https://filezilla-project.org/), [Cyberduck](https://cyberduck.io/) ou o [WinSCP](https://winscp.net/) (Windows) permitem arrastar e soltar arquivos entre seu computador e o servidor via SSH/SFTP. Para uso ocasional, é uma alternativa simples ao `scp`.

---

# Parte 5 — Como interagir melhor com o terminal

## 5.1) Atalhos essenciais do teclado

Conhecer alguns atalhos transforma a experiência de digitar comandos:

| Atalho | O que faz |
|---|---|
| **Ctrl + C** | Interrompe o comando que está rodando agora. **Salva-vidas** quando algo trava ou demora demais. |
| **Ctrl + L** | Limpa a tela (equivalente a digitar `clear`). |
| **Ctrl + D** | Encerra a sessão atual (sai do shell). Se estiver via SSH, desconecta do servidor. |
| **Ctrl + A** | Move o cursor para o **início** da linha. |
| **Ctrl + E** | Move o cursor para o **final** da linha. |
| **Ctrl + U** | Apaga tudo da linha (do cursor até o início). |
| **Tab** | Autocompleta nomes de arquivos e comandos. |
| **Tab Tab** | Mostra todas as opções, quando há ambiguidade. |
| **↑ / ↓** | Navega pelos comandos anteriores. |

## 5.2) Histórico de comandos (`history`)

O Bash guarda os comandos que você já digitou. Para vê-los:

```bash
# Lista os últimos comandos digitados:
history

# Apenas os 20 últimos:
history 20

# Buscar nos comandos anteriores que contenham "grep":
history | grep grep
```

Para **executar de novo** um comando do histórico:

```bash
!!         # repete o último comando
!42        # executa o comando de número 42 do history
!ssh       # executa o último comando que começou com "ssh"
```

> **Busca reversa interativa:** aperte **Ctrl + R** e comece a digitar parte de um comando antigo. O Bash mostra a correspondência mais recente. Aperte **Ctrl + R** de novo para ir para a anterior, **Enter** para executar ou **Esc** para sair.

## 5.3) Pedindo ajuda (`--help` e `man`)

Você **não precisa decorar** todos os comandos. Os próprios programas explicam como funcionam.

```bash
# Ajuda rápida:
ls --help

# Manual completo:
man ls

# Para sair do manual (ou de qualquer paginador) e voltar ao prompt:
q
```

> Alguns programas usam `-h` ou `-help` em vez de `--help`. Se um não funcionar, tente o outro.
>
> A letra **q** vem de *quit*. É o atalho universal para sair de várias telas no UNIX (`man`, `less`, etc.).

---

# Parte 6 — Manipulando arquivos de texto no servidor

Em Bioinformática, os dados são frequentemente armazenados em **arquivos de texto** (`.tsv`, `.csv`, `.txt`, `.fasta`, `.fastq`, `.vcf`, etc.). Em Bash, há vários comandos que processam **arquivos enormes** de forma muito rápida — muito mais rápido do que abrir no Excel, por exemplo.

## 6.1) Concatenando arquivos (`cat`)

O `cat` (*ConCATenate*) une vários arquivos de texto em um só:

```bash
# Como todos os discentes têm seu home dentro de /media/hd15-funbios/users/,
# podemos juntar todos os "velhoarquivo.txt" produzidos pela turma com:
cat /media/hd15-funbios/users/**/**/velhoarquivo.txt > todos-velhoarquivo.txt
```

> **Detalhes importantes — entrada, saída e redirecionamento**
>
> 1. O terminal trabalha com **três fluxos** de informação:
>    - **`stdin`** — fluxo padrão de **entrada**
>    - **`stdout`** — fluxo padrão de **saída** (por padrão, vai para a tela; pode ser redirecionado com `>`)
>    - **`stderr`** — fluxo de **erros** e diagnósticos (pode ser redirecionado com `2>`)
>
> 2. **Redirecionando o `stdout` para um arquivo:**
>    - `>` → **sobrescreve** o arquivo de destino
>    - `>>` → **acrescenta** ao final do arquivo de destino
>
> 3. **Encadeando comandos com pipe (`|`):**
>    - `comando1 | comando2` → o `stdout` do `comando1` vira o `stdin` do `comando2`
>
> 4. No exemplo acima, usamos `**` (*globbing recursivo*) para casar **qualquer** caractere em qualquer subdiretório, de forma que o sistema entrou no diretório de **todos** os discentes, sem precisar listar um a um.

## 6.2) Padrões de correspondência (*globs*)

Em Bash, **globs** são padrões usados para casar nomes de arquivos:

| Padrão | Descrição | Exemplo | Casa com... |
|---|---|---|---|
| `*` | Qualquer sequência de caracteres (exceto `/`). | `ls *.txt` | Todos os arquivos `.txt`. |
| `?` | Qualquer **um** caractere. | `ls arquivo?.txt` | `arquivo1.txt`, `arquivox.txt` (mas não `arquivo10.txt`). |
| `[abc]` | Qualquer um dos caracteres entre colchetes. | `ls arq[123].txt` | `arq1.txt`, `arq2.txt`, `arq3.txt`. |
| `[a-z]` | Qualquer caractere dentro do intervalo. | `ls arq[a-c].txt` | `arqa.txt`, `arqb.txt`, `arqc.txt`. |
| `{a,b,c}` | Lista explícita de padrões. | `ls {arq1,arq2}.txt` | `arq1.txt`, `arq2.txt`. |
| `**` | Expansão recursiva (se ativada no shell). | `ls **/*.txt` | `.txt` em qualquer subdiretório. |

## 6.3) Olhando o começo de um arquivo (`head`)

```bash
# Primeiras 10 linhas (padrão):
head todos-velhoarquivo.txt

# Apenas a primeira linha (formas equivalentes):
head -n 1 todos-velhoarquivo.txt
head -1 todos-velhoarquivo.txt

# Tudo, EXCETO as últimas 10 linhas:
head -n -10 todos-velhoarquivo.txt
```

## 6.4) Olhando o final de um arquivo (`tail`)

```bash
# Últimas 10 linhas:
tail -n 10 todos-velhoarquivo.txt

# Tudo a partir da 10ª linha em diante:
tail -n +10 todos-velhoarquivo.txt
```

## 6.5) Contando linhas, palavras e bytes (`wc`)

```bash
wc -l todos-velhoarquivo.txt   # linhas
wc -c todos-velhoarquivo.txt   # caracteres (bytes)
wc -w todos-velhoarquivo.txt   # palavras
```

## 6.6) Encadeando comandos com pipe (`|`)

Em vez de salvar arquivos intermediários, podemos passar a saída de um comando como entrada do próximo:

```bash
# Listar o conteúdo do diretório E contar quantas linhas tem essa lista:
ls | wc -l
# A saída do "ls" foi para o "wc", e não para a tela.
```

Esse encadeamento (chamado de **pipeline**) é uma das ideias mais poderosas do UNIX e está no coração da Bioinformática moderna.

## 6.7) Juntando tabelas (`paste` e `join`)

```bash
# Copie as tabelas dos docentes para o seu diretório:
cp /media/hd15-funbios/users/renata.funbios/tabela* .

# paste: cola as colunas lado a lado
paste tabela1.txt tabela2.txt

# join: combina pelas linhas que compartilham valor em uma coluna chave
join -1 1 -2 1 tabela1.txt tabela2.txt
# -1 1 → usar a coluna 1 da tabela1 como chave
# -2 1 → usar a coluna 1 da tabela2 como chave
```

## 6.8) Visualizando arquivos longos (`less`, `more`)

```bash
# Mostra o arquivo todo, mas só permite rolar para frente:
more todos-velhoarquivo.txt

# Mostra o arquivo com navegação para frente E para trás (recomendado):
less todos-velhoarquivo.txt
```

> **Dentro do `less`:**
>
> - `q` → sair
> - `/palavra` → buscar uma palavra
> - `n` → ir para a próxima ocorrência
> - **Setas** → rolar linha a linha
> - **Espaço** → rolar uma página

## 6.9) Buscando padrões (`grep`)

`grep` (*Global Regular Expression Print*) é provavelmente o comando que você mais vai usar.

```bash
# Buscar todas as linhas que contêm "Organismo":
grep Organismo todos-velhoarquivo.txt

# Padrões com caracteres especiais ou espaços precisam de aspas:
grep "Organismo de interesse: " todos-velhoarquivo.txt

# Quantas linhas contêm "Organismo"? (duas formas equivalentes):
grep Organismo todos-velhoarquivo.txt | wc -l
grep -c Organismo todos-velhoarquivo.txt

# Linhas que NÃO contêm "Organismo":
grep -v Organismo todos-velhoarquivo.txt
```

> **Aspas simples vs. duplas em Bash**
>
> Aspas duplas (`"..."`) permitem que o shell **expanda variáveis** dentro do texto. Aspas simples (`'...'`) tratam tudo como literal:
>
> ```bash
> echo "Olá $USER"   # Imprime: Olá Fulano
> echo 'Olá $USER'   # Imprime: Olá $USER
> ```
>
> Use **aspas simples** quando o padrão tem caracteres especiais ($, *, !) que você quer manter literais. Use **aspas duplas** quando precisa expandir variáveis.

<details>
<summary><b>Outras opções úteis do <code>grep</code></b></summary>

| Opção | Descrição | Exemplo |
|---|---|---|
| `-i` | Ignora maiúsculas/minúsculas. | `grep -i "erro" log.txt` |
| `-v` | Linhas que **não** correspondem. | `grep -v "sucesso" log.txt` |
| `-c` | Conta as ocorrências. | `grep -c "falha" log.txt` |
| `-n` | Mostra os números de linha. | `grep -n "warning" log.txt` |
| `-o` | Mostra só o trecho que casou. | `grep -o "[0-9]\+" arquivo.txt` |
| `-w` | Casa apenas palavras inteiras. | `grep -w "erro" log.txt` |
| `-r` | Busca recursiva em diretórios. | `grep -r "sequencia" /meus/dados/` |
| `-E` | Expressões regulares estendidas. | `grep -E "erro\|falha" log.txt` |
| `-F` | Padrões literais (sem regex). | `grep -F "(teste)" arquivo.txt` |
| `-P` | Regex estilo Perl. | `grep -P "\d+" arquivo.txt` |
| `-A N` | `N` linhas **depois** da correspondência. | `grep -A 3 "erro" log.txt` |
| `-B N` | `N` linhas **antes**. | `grep -B 2 "erro" log.txt` |
| `-C N` | `N` linhas **antes e depois**. | `grep -C 2 "erro" log.txt` |

</details>

## 6.10) Extraindo colunas (`cut`)

```bash
# Cortar a 1ª coluna de um arquivo separado por TAB (padrão do cut):
cut -f1 tabela1.txt

# Cortar a 2ª coluna de um arquivo com outro delimitador:
cut -d ":" -f2 todos-velhoarquivo.txt
# -d ":" : usa ":" como delimitador
# -f2    : pega a 2ª coluna
```

No `todos-velhoarquivo.txt`, os `":"` separam o **descritor** (ex.: "Organismo de interesse") da **resposta** de cada colega.

## 6.11) Processando colunas com `awk`

`awk` é um "primo turbinado" do `cut`: além de extrair colunas, ele permite **filtrar linhas, fazer cálculos e formatar a saída** em um único comando. É uma pequena linguagem de programação criada justamente para processar texto tabular.

Sintaxe básica:

```bash
awk '{ação}' arquivo
```

Dentro da `{ação}`: `$0` é a linha inteira, `$1` é a 1ª coluna, `$2` é a 2ª, e assim por diante. O delimitador padrão é qualquer espaço/tab.

### Extração de colunas

```bash
# Imprimir a 1ª coluna (equivalente a "cut -f1"):
awk '{print $1}' tabela1.txt

# Usar outro delimitador (-F define o "Field separator"):
awk -F ":" '{print $2}' todos-velhoarquivo.txt

# Múltiplas colunas com texto literal entre elas:
awk -F ":" '{print "Campo:", $1, "->", $2}' todos-velhoarquivo.txt
```

### Filtrando linhas

```bash
# Imprimir só linhas onde a 3ª coluna é maior que 100:
awk '$3 > 100' tabela.txt

# Linhas que casam com um padrão (como o grep):
awk '/Organismo/' todos-velhoarquivo.txt

# Combinando filtro e extração:
awk -F ":" '$1 == "Área de pesquisa" {print $2}' todos-velhoarquivo.txt
```

### Variáveis especiais e blocos `BEGIN`/`END`

`BEGIN` roda **antes** de processar qualquer linha. `END` roda **depois** de tudo. Variáveis úteis: `NR` (número da linha atual / total no `END`) e `NF` (número de colunas da linha).

```bash
# Contar linhas (alternativa ao "wc -l"):
awk 'END {print NR}' arquivo.txt

# Somar valores de uma coluna:
awk '{soma += $1} END {print "Total:", soma}' numeros.txt

# Calcular a média da 2ª coluna:
awk '{soma += $2} END {print "Média:", soma/NR}' tabela.txt
```

> Para o uso diário em Bioinformática, esses padrões cobrem a maioria dos casos. Ferramentas como `samtools view` e `bedtools` são frequentemente combinadas com `awk` em pipelines.

## 6.12) Removendo redundâncias (`sort` + `uniq`)

Vamos descobrir, por exemplo, **quantos colegas querem aprender cada linguagem de programação**:

```bash
# 1. Selecionar só as linhas com "Linguagem":
grep Linguagem todos-velhoarquivo.txt

# 2. Cortar só o nome da linguagem (depois do ":"):
grep Linguagem todos-velhoarquivo.txt | cut -d ":" -f2

# 3. Ordenar e deduplicar:
grep Linguagem todos-velhoarquivo.txt | cut -d ":" -f2 | sort | uniq

# 4. Contar quantos colegas escolheram cada linguagem:
grep Linguagem todos-velhoarquivo.txt | cut -d ":" -f2 | sort | uniq -c
```

> **Por que `sort` antes de `uniq`?** O `uniq` só compara **linhas adjacentes**. Se as duplicatas estiverem espalhadas, ele não as detecta. Por isso o `sort` vem antes — ele agrupa as iguais.

> **QUESTÃO 2:** Como você salvaria o resultado desse último comando em um arquivo de texto?
>
> **QUESTÃO 3:** Quais dos seus colegas escolheram a **mesma linguagem** que você?

## 6.13) Substituindo padrões (`sed`)

`sed` (*Stream EDitor*) substitui textos linha a linha:

```bash
# Trocar todos os "Olá" por "Tchau":
sed "s/Olá/Tchau/g" todos-velhoarquivo.txt
```

Decompondo o comando:

| Trecho | O que faz |
|---|---|
| `sed` | Chama o editor de fluxo. |
| `s/` | Início da operação de **substituição**. |
| `Olá` | Padrão a procurar. |
| `Tchau` | Texto que substitui. |
| `/g` | **Global**: troca todas as ocorrências de cada linha (sem `g`, só a primeira). |
| `todos-velhoarquivo.txt` | Arquivo onde a substituição é aplicada. |

> Por padrão, o `sed` **não modifica** o arquivo original — ele só imprime o resultado na tela. Para gravar de volta, use `sed -i` (cuidado!) ou redirecione com `>` para um novo arquivo.

> **QUESTÃO 4:** Todos os "Olá" foram trocados por "Tchau"? Se algum não foi, o que pode ter acontecido?

<details>
<summary><b>Outras opções úteis do <code>sed</code></b></summary>

**Opções básicas**

| Opção | Descrição | Exemplo |
|---|---|---|
| `-i` | Edita o arquivo diretamente (sobrescreve!). | `sed -i "s/foo/bar/g" arquivo.txt` |
| `-n` | Suprime a saída padrão (combina com `p`). | `sed -n "s/foo/bar/p" arquivo.txt` |
| `-e` | Executa múltiplos comandos em uma linha. | `sed -e "s/foo/bar/g" -e "s/teste/exemplo/g" arquivo.txt` |
| `-f` | Lê comandos de um arquivo `.sed`. | `sed -f script.sed arquivo.txt` |

**Comandos mais usados**

| Comando | Descrição | Exemplo |
|---|---|---|
| `s/` | Substitui um padrão. | `sed "s/carro/bicicleta/g" arquivo.txt` |
| `p` | Imprime linhas correspondentes (com `-n`). | `sed -n "/erro/p" log.txt` |
| `d` | Deleta linhas correspondentes. | `sed "/erro/d" arquivo.txt` |
| `q` | Sai após processar a 1ª correspondência. | `sed "/sucesso/q" arquivo.txt` |
| `y/` | Substitui caracteres (como `tr`). | `sed "y/abc/xyz/" arquivo.txt` |

**Seleção de linhas específicas**

| Padrão | Descrição | Exemplo |
|---|---|---|
| `3d` | Remove a 3ª linha. | `sed "3d" arquivo.txt` |
| `1,5d` | Remove da 1ª à 5ª linha. | `sed "1,5d" arquivo.txt` |
| `/padrão/d` | Remove linhas que casam com o padrão. | `sed "/erro/d" arquivo.txt` |
| `5q` | Para após a 5ª linha. | `sed "5q" arquivo.txt` |

</details>

## 6.14) Trabalhando com arquivos compactados (`gzip`, `gunzip`, `tar`)

Em Bioinformática, é raro receber dados sem compactação. Arquivos de sequenciamento (`.fastq`), genomas e tabelas grandes quase sempre vêm compactados para economizar espaço e largura de banda. As extensões mais comuns são:

- `.gz` — arquivo único compactado com **gzip**
- `.tar` — vários arquivos empacotados em um (sem compactação)
- `.tar.gz` ou `.tgz` — vários arquivos empacotados **e** compactados

### `gzip` e `gunzip`: compactar um arquivo único

```bash
# Compactar (substitui o original por arquivo.fasta.gz):
gzip arquivo.fasta

# Manter também o original:
gzip -k arquivo.fasta

# Descompactar:
gunzip arquivo.fasta.gz
# Equivalente: gzip -d arquivo.fasta.gz
```

### Lendo arquivos `.gz` SEM descompactar

Em vez de descompactar (e ocupar dobro de espaço temporariamente), você pode ler direto com versões "z" dos comandos:

```bash
# Ver o conteúdo:
zcat amostra.fastq.gz

# Ver as primeiras linhas:
zcat amostra.fastq.gz | head -20

# Buscar nele:
zgrep ">" genoma.fasta.gz | wc -l        # conta cabeçalhos do FASTA
zless arquivo.txt.gz                     # navega como o "less"
```

> Essa abordagem é **fundamental** em Bioinformática: arquivos FASTQ podem ter dezenas de GB compactados (e centenas de GB descompactados). Quase todas as ferramentas da área (`bwa`, `samtools`, `bcftools`...) leem `.gz` direto.

### `tar`: empacotar vários arquivos em um

`tar` empacota uma pasta inteira (com vários arquivos e subdiretórios) em um único arquivo. É comum combiná-lo com `gzip` (ficando `.tar.gz`).

```bash
# Empacotar e compactar uma pasta inteira:
tar -czvf resultados.tar.gz resultados/
# -c : create (criar)
# -z : usar gzip
# -v : verbose (mostra o que está fazendo)
# -f : nome do arquivo de saída (deve vir POR ÚLTIMO)

# Descompactar e desempacotar:
tar -xzvf resultados.tar.gz
# -x : extract (extrair)

# Listar o conteúdo SEM extrair (útil para conferir antes):
tar -tzvf resultados.tar.gz
# -t : list
```

> **Mnemônico para o `tar`:** **c**riar, e**x**trair, lis**t**ar. O `-z` é "usar gzip", `-v` é "mostrar progresso", e `-f` indica o nome do arquivo (sempre por último, antes do nome).

---

# Parte 7 — Espaço em disco e processos

Como o servidor é **compartilhado** entre vários usuários, é parte do bom uso saber quanto espaço você está ocupando e o que está rodando.

## 7.1) Espaço em disco (`du` e `df`)

```bash
# "Disk Usage": quanto este diretório está ocupando? (-s = somatório, -h = legível)
du -sh meudiretorio/

# Tamanho de cada subdiretório (até 1 nível):
du -h --max-depth=1 .

# "Disk Free": quanto espaço livre tem no servidor?
df -h
```

Em Bioinformática, arquivos podem ter centenas de GB. Verificar o espaço **antes** de copiar dados grandes evita encher o disco e atrapalhar a turma toda.

## 7.2) Vendo o que está rodando (`ps`, `top`)

```bash
# Lista os SEUS processos em execução:
ps -u $USER

# Lista todos os processos do sistema, atualizando em tempo real:
top
# Para sair do top: aperte "q"

# Versão mais amigável (se estiver instalada):
htop
```

## 7.3) Comandos longos: rodar em background

Em Bioinformática, é comum rodar análises que duram horas. Algumas técnicas úteis:

```bash
# Rodar em background (libera o terminal):
meu_comando_longo &

# Rodar em background E continuar mesmo se o SSH cair (essencial para jobs longos):
nohup meu_comando_longo &
```

> **Sobre comandos muito longos:** se o seu SSH cair durante uma análise iniciada normalmente, o processo é interrompido. Para análises que duram horas ou dias, o ideal é usar o `tmux`, apresentado a seguir.

> **Etiqueta em servidor compartilhado**
>
> Outras pessoas usam o mesmo servidor que você. Antes de iniciar comandos pesados:
>
> - Rode `top` ou `htop` para ver se o servidor está saturado.
> - Combine com a equipe se for usar muita CPU/memória por muito tempo.
> - Não leia, copie ou modifique arquivos no `home` de outros usuários sem autorização.
> - Limpe arquivos temporários quando terminar (`rm` com cuidado, conforme já visto).

## 7.4) Mantendo sessões persistentes com `tmux`

`tmux` (*Terminal MUltipleXer*) resolve o problema descrito acima: ele cria uma **sessão no servidor** que continua rodando mesmo se o seu SSH cair ou se você desligar o computador. Você inicia uma análise, sai do servidor, e volta horas (ou dias) depois para ver o resultado — ou continuar de onde parou.

No LGBIO, o `tmux` é a ferramenta padrão para qualquer trabalho que dure mais do que alguns minutos.

### Fluxo básico

```bash
# 1. Criar uma sessão nova com um nome (ex.: "analise"):
tmux new -s analise

# 2. Você está dentro do tmux agora. Rode o que quiser:
meu_comando_longo

# 3. Para "soltar" a sessão (sem matar o que está rodando):
#    aperte Ctrl + B, solte as teclas, e depois aperte D (de "detach").

# 4. Já fora do tmux: pode até desconectar do servidor com "exit".
#    A análise continua rodando lá dentro.

# 5. Quando voltar ao servidor, liste suas sessões:
tmux ls

# 6. Reatache à sessão:
tmux a -t analise
# ("a" é abreviação de "attach"; "-t" indica o nome da sessão alvo)
```

### Atalhos dentro do tmux

Todos os atalhos do `tmux` começam pela **tecla de prefixo**, que por padrão é `Ctrl + B`. Você aperta o prefixo, **solta**, e depois aperta a tecla do comando.

| Atalho (após `Ctrl + B`) | O que faz |
|---|---|
| `D` | **Detach**: solta a sessão e volta ao terminal normal. |
| `C` | Cria uma nova **janela** dentro da sessão. |
| `N` / `P` | Vai para a próxima / anterior janela. |
| `0`–`9` | Vai direto para a janela de número 0 a 9. |
| `,` | Renomeia a janela atual. |
| `%` | Divide a janela em dois **painéis verticais** (lado a lado). |
| `"` | Divide a janela em dois **painéis horizontais** (em cima/embaixo). |
| `←` `↑` `→` `↓` | Move o foco entre painéis. |
| `X` | Fecha o painel atual (pede confirmação). |
| `[` | Entra em "modo de rolagem" (use as setas; aperte `q` para sair). |
| `?` | Mostra todos os atalhos disponíveis. |

### Outros comandos úteis

```bash
# Listar sessões existentes:
tmux ls

# Reatachar à última sessão criada (sem precisar do nome):
tmux a

# Encerrar uma sessão sem entrar nela:
tmux kill-session -t analise

# Encerrar TODAS as suas sessões (cuidado!):
tmux kill-server
```

> **Dica:** sempre dê **nomes descritivos** às sessões (`analise_blast`, `alinhamento_amostra3`) para conseguir reconhecê-las depois. Você pode ter quantas sessões quiser ao mesmo tempo.

---

# Parte 8 — Erros comuns que você vai encontrar

A linha de comando é exigente: um espaço a mais ou uma letra trocada já dá erro. Os erros mais frequentes:

| Mensagem de erro | Causa típica | Como resolver |
|---|---|---|
| `command not found` | Comando digitado errado, ou o programa não está instalado. | Verifique a digitação. Se for um programa, confirme que ele está disponível no servidor. |
| `No such file or directory` | O arquivo/pasta no caminho não existe. | Use `ls` para verificar o que existe e `pwd` para confirmar onde você está. |
| `Permission denied` | Você não tem permissão para ler/escrever/executar. | Veja o dono e as permissões com `ls -l`. Pode ser um arquivo de outro usuário. |
| `Is a directory` | Você passou um diretório onde se esperava arquivo (ex.: `cat pasta/`). | Especifique um arquivo dentro do diretório. |
| `cannot remove ... : Directory not empty` | Tentou apagar diretório não vazio com `rm` simples. | Para apagar diretório com conteúdo, use `rm -r diretorio/` (com cuidado!). |
| `argument list too long` | Glob casou com arquivos demais (ex.: `cat *.txt` com milhares). | Use `find ... -exec` ou `xargs` (avançado). |

Quando travar ou demorar demais, lembre-se sempre: **Ctrl + C** interrompe o que está rodando.

---

# Exercício consolidador

Use o arquivo `todos-velhoarquivo.txt` (gerado na Parte 6.1) para responder, encadeando comandos com pipes:

1. **Quantos colegas escolheram cada banco de dados?** Salve a contagem em um arquivo `bancos_freq.txt`.
2. **Quais são as 3 áreas de pesquisa mais citadas pela turma?** (Dica: ordene por frequência decrescente e pegue as 3 primeiras.)
3. **Quantos colegas escolheram um organismo cujo nome começa com "E"?** (Dica: o `grep` aceita o início exato no padrão.)
4. **Crie uma versão "amigável" do arquivo** com todos os "Olá mundo!" substituídos por "Bem-vindo(a) à Bioinformática!" e salve como `boas_vindas.txt`.

Tente usar os comandos `grep`, `cut`, `sort`, `uniq`, `head`, `wc`, `sed`, *pipes* `|` e redirecionamento `>`.

> **Não conseguiu responder algo?** Sem problema. Anote a dúvida e traga para a aula síncrona.

---

# Cheat sheet — comandos essenciais desta aula

| Categoria | Comando | O que faz |
|---|---|---|
| **Conexão** | `ssh user@host` | Conecta a um servidor remoto |
| | `exit` ou `Ctrl + D` | Encerra a conexão |
| **Transferência** | `scp arq user@host:~/` | Envia arquivo para o servidor |
| | `scp user@host:~/arq .` | Traz arquivo do servidor |
| | `scp -r pasta/ ...` | Mesma coisa, para pastas |
| **Navegação** | `pwd` | Mostra o diretório atual |
| | `ls`, `ls -lah` | Lista arquivos (simples / detalhada) |
| | `cd diretorio` | Entra em um diretório |
| | `cd ..` | Sobe um nível |
| | `cd` ou `cd ~` | Volta para o home |
| **Diretórios e arquivos** | `mkdir nome` | Cria diretório |
| | `nano arquivo` | Edita/cria arquivo de texto |
| | `touch arquivo` | Cria arquivo vazio |
| | `cp origem destino` | Copia |
| | `mv origem destino` | Move ou renomeia |
| | `rm arquivo` | Apaga (sem volta!) |
| **Sanidade** | `whoami`, `date` | Quem sou eu / data atual |
| | `echo "texto"` | Imprime texto/variável |
| | `clear` ou `Ctrl + L` | Limpa a tela |
| **Atalhos** | `Ctrl + C` | Interrompe comando atual |
| | `Tab` | Autocompleta |
| | `↑ / ↓` | Comandos anteriores |
| | `Ctrl + R` | Busca reversa no histórico |
| | `history` | Lista comandos anteriores |
| **Ajuda** | `comando --help` | Ajuda rápida |
| | `man comando` | Manual completo (sai com `q`) |
| **Visualizar texto** | `cat arquivo` | Mostra o conteúdo todo |
| | `head`, `tail` | Início / final do arquivo |
| | `less arquivo` | Visualizador navegável (sai com `q`) |
| **Processar texto** | `wc -l/-w/-c` | Conta linhas / palavras / caracteres |
| | `grep padrão arq` | Busca padrão |
| | `cut -d X -fN` | Extrai colunas |
| | `awk '{print $N}'` | Extrai/processa colunas com lógica |
| | `sort` / `uniq` | Ordena / deduplica |
| | `sed "s/a/b/g"` | Substitui texto |
| | `paste` / `join` | Junta tabelas |
| **Compactação** | `gzip arq` / `gunzip arq.gz` | Compacta / descompacta |
| | `zcat arq.gz` / `zgrep` / `zless` | Lê `.gz` sem descompactar |
| | `tar -czvf saida.tar.gz pasta/` | Empacota e compacta pasta |
| | `tar -xzvf arq.tar.gz` | Extrai `.tar.gz` |
| **Encadeamento** | `\|` | Pipe (saída de um → entrada do próximo) |
| | `>` / `>>` | Redireciona saída (sobrescreve / acrescenta) |
| **Disco e processos** | `du -sh dir/` | Tamanho do diretório |
| | `df -h` | Espaço livre no disco |
| | `ps -u $USER` | Meus processos |
| | `top` ou `htop` | Monitor em tempo real |
| | `comando &` | Roda em background |
| **Sessões `tmux`** | `tmux new -s nome` | Cria sessão com nome |
| | `tmux ls` | Lista sessões existentes |
| | `tmux a -t nome` | Reatacha à sessão |
| | `Ctrl + B`, `D` | Solta a sessão (detach) |
| | `Ctrl + B`, `C` | Nova janela dentro do tmux |
| | `Ctrl + B`, `%` / `"` | Divide painel vertical / horizontal |

---

# Glossário rápido

- **Bash** — o shell mais comum em Linux. Interpreta os comandos que você digita.
- **Diretório** — o mesmo que "pasta".
- **`awk`** — pequena linguagem de programação para processar texto tabular (extrair colunas, filtrar linhas, calcular).
- **Glob** — padrão para casar nomes de arquivos (ex.: `*.txt`).
- **Home** — seu diretório pessoal no servidor (`/home/seuusuario` ou similar). Atalho: `~`.
- **Pipe (`|`)** — encadeia comandos: a saída de um vira a entrada do próximo.
- **Processo** — uma instância de um programa em execução. Cada comando que você roda vira um processo.
- **Prompt** — a parte do terminal que fica esperando você digitar (ex.: `usuario@servidor:~$`).
- **Shell** — o programa que interpreta seus comandos. Ex.: Bash, Zsh.
- **SSH** — protocolo para abrir um terminal remoto de forma criptografada.
- **`scp`** — *Secure CoPy*: transferência de arquivos via SSH.
- **stdin / stdout / stderr** — fluxos padrão de entrada / saída / erros.
- **Terminal** — a janela onde você digita os comandos.
- **`tmux`** — *Terminal MUltipleXer*: cria sessões persistentes no servidor, que continuam rodando mesmo após você desconectar.
- **Variável de ambiente** — um "atalho" do sistema, identificado por `$NOME` (ex.: `$HOME`, `$USER`).
- **`gzip` / `tar`** — utilitários de compactação. `gzip` compacta um arquivo (gera `.gz`); `tar` empacota uma pasta inteira (gera `.tar`, geralmente combinado com gzip em `.tar.gz`).

---

# Autoavaliação

Antes da primeira aula presencial, confira se você consegue:

- [ ] Conectar ao servidor via SSH a partir do seu computador.
- [ ] Trocar a senha provisória por uma nova.
- [ ] Identificar em qual diretório está usando `pwd`.
- [ ] Criar um diretório com `mkdir` e entrar nele com `cd`.
- [ ] Listar arquivos com `ls` e `ls -lah`.
- [ ] Criar um arquivo de texto com `nano`, salvar e sair.
- [ ] Copiar, mover, renomear e remover arquivos com `cp`, `mv`, `rm`.
- [ ] Enviar um arquivo do seu computador para o servidor com `scp`.
- [ ] Interromper um comando travado com `Ctrl + C`.
- [ ] Recuperar um comando antigo com a seta para cima ou `Ctrl + R`.
- [ ] Pedir ajuda com `--help` ou `man`.
- [ ] Usar pelo menos um pipe `|` encadeando dois comandos (ex.: `ls | wc -l`).
- [ ] Verificar quanto espaço seu diretório ocupa com `du -sh`.
- [ ] Criar uma sessão `tmux`, soltar com `Ctrl + B` `D` e reatachar com `tmux a`.
- [ ] Extrair uma coluna específica de um arquivo com `awk`.
- [ ] Ler um arquivo `.gz` sem descompactar (usando `zcat` ou `zless`).
- [ ] Compactar uma pasta inteira em `.tar.gz` e extrair de volta.

---

> **Encontrou algum erro ou tem sugestões?** Anote e me avise. Esse material está em construção contínua e o feedback de vocês é o que mais ajuda a melhorá-lo.