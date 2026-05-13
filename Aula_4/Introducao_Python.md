# Aula básica de python para desenvolvedores em bioinformática

Esta aula tem como objetivo introduzir os conceitos básicos de programação em python para bioinformática. O aprendizado da linguagem python permitirá compreender fundamentos importantes da lógica de programação, possibilitando a criação de soluções para problemas comumente encontrados no dia a dia, como, por exemplo, a manipulação de arquivos, execução de análises repetitivas e processamento de grandes volumes de informação.

## Origem e importância da linguagem no mercado tecnológico

A linguagem python foi criada em 1989 pelo programador holandês Guido van Rossum, mas sua primeira versão oficial foi publicada em 1991. O nome da linguagem foi inspirado no famoso programa de comédia da BBC, *Monty Python's Flying Circus*. 

Python é considerada uma linguagem de alto nível e menos complexa quando comparada a linguagens de baixo nível (Assembly e C). Um fator importante para a popularização da linguagem é sua licença compatível com Software Livre. Isso significa que python pode ser utilizada, modificada e distribuída livremente, incentivando a colaboração da comunidade e o crescimento constante da linguagem. Seu site oficial, [python](https://python.org), disponibiliza informações, *downloads* e acesso à documentação oficial da linguagem.

Ao longo dos anos, python apresentou um crescimento significativo no mercado de tecnologia. Atualmente, é uma das linguagens mais utilizadas no mundo, principalmente nas áreas de ciência de dados, mineração de dados, inteligência artificial e aprendizado de máquina (*machine learning*). Esse destaque ocorre devido à grande quantidade de bibliotecas e ferramentas disponíveis, que simplificam processamento de dados e o desenvolvimento de modelos computacionais avançados.

## Ambientes de desenvolvimento

Para programar em python, existem diferentes ambientes de desenvolvimento que podem ser utilizados de acordo com o objetivo do usuário, nível de experiência e complexidade do projeto. Esses ambientes variam desde editores de texto simples até plataformas completas de desenvolvimento integradas, oferecendo recursos que auxiliam na escrita, organização, execução e depuração de códigos.

Entre os editores mais simples e tradicionais estão o *vi* e o *nano* (editores nativos do Linux), muito utilizados em servidores remotos. Ambos permitem edição rápida de arquivos diretamente pelo terminal. Outros editores com interface gráfica conhecidos são o [Sublime Text](https://www.sublimetext.com/download) e o [Notepad++](https://notepad-plus-plus.org/). Para ambientes de desenvolvimento mais completo destacam-se o [Visual Studio Code](https://code.visualstudio.com/) e o [PyCharm](https://www.jetbrains.com/pt-br/pycharm/download/?section=windows). O Visual Studio Code tornou-se uma das ferramentas mais populares atualmente por unir simplicidade e grande quantidade de recursos. Ele pode ser utilizado tanto em projetos simples quanto em aplicações complexas, oferecendo suporte para extensões, controle de versão, terminal integrado, execução de *scripts* e ferramentas de depuração. Já o PyCharm é um ambiente de desenvolvimento voltado especificamente para Python, possuindo diversos recursos avançados para desenvolvimento profissional. Além dos ambientes instalados localmente, também existem plataformas *online* como o [Colab](https://colab.research.google.com/) e o [Jupyter](https://jupyter.org/). Essas ferramentas são muito utilizadas em ciência de dados por permitirem a execução interativa de códigos, visualização de gráficos e documentação integrada em um mesmo ambiente.

## Instalação do python

A instalação do Python pode variar de acordo com o sistema operacional utilizado. Entretanto, o processo geralmente é simples e permite preparar rapidamente o ambiente para desenvolvimento e execução de programas.

### Windows

No sistema Windows, o processo de instalação pode ser realizado diretamente pelo site oficial do python:

[python.org downloads](https://www.python.org/downloads/)

### Linux e macOS

Em muitas distribuições Linux e macOS, o python já vem instalado por padrão. Para verificar, execute no terminal:

```bash
python3 --version
```

## Instalando pacotes em python

Durante a programação em python, é comum utilizar pacotes criados por outros desenvolvedores para ampliar as funcionalidades da linguagem. Esses pacotes permitem realizar tarefas específicas, como manipulação de dados, construção de gráficos, análises estatísticas, aprendizado de máquina e processamento de sequências biológicas. Para facilitar a instalação e o gerenciamento dessas ferramentas, python possui sistemas conhecidos como gerenciadores de pacotes.

O principal gerenciador utilizado é o *pip*, responsável por instalar, atualizar e remover bibliotecas diretamente dos repositórios oficiais da linguagem. Com poucos comandos, é possível adicionar novas funcionalidades ao ambiente de desenvolvimento, tornando o processo rápido e prático. O *pip* também permite instalar versões específicas de bibliotecas, garantindo maior compatibilidade entre diferentes projetos. Nessa aula vamos utilizar os pacotes **biopython** para manipulação de dados biológicos e o pacote **matplotlib** para criação de gráficos interativos e simples. Para instalar os pacotes biopython e matplotlib execute os seguintes comandos no seu terminal:

```bash
# Instalando biopython em sua versão mais recente
pip3 install biopython
# Instalando matplotlib em sua versão mais recente
pip3 install matplotlib
```

## Paradigmas de programação em python

A linguagem python é considerada multiparadigma, ou seja, permite ao desenvolvedor utilizar diferentes estilos de programação dentro de um mesmo projeto. Entre os principais paradigmas suportados estão a programação procedural, funcional e orientada a objetos.

Nessa aula, o foco principal será o paradigma procedural, pois ele oferece uma abordagem mais didática e intuitiva para o aprendizado inicial da linguagem. Dessa forma, será possível compreender os fundamentos da programação, lógica computacional, estruturas de controle e organização de códigos antes de você avançar para conceitos mais complexos, como programação funcional e orientação a objetos.

A programação procedural organiza o código em procedimentos, funções e etapas sequenciais de execução, sendo frequentemente utilizada para introdução à lógica de programação devido à sua simplicidade e clareza estrutural.

Exemplo de um código em python que segue o paradigma de programação procedural:

```python
def conteudo_GC(sequencia):
    """Procedimento para calcular o conteudo GC de uma sequência."""
    ocorrencia_g = sequencia.count("G")
    ocorrencia_c = sequencia.count("C")
    total = len(sequencia)
    return 100*((ocorrencia_g + ocorrencia_c)/total)

counteudo_GC("CATGCATGTGTCAGCACACACACGTCTAGCATGTCAGCATGCTAGCATGCAGCA")
```

## Primeiro código python: Olá mundo!

Abra seu editor de texto ou ambiente de desenvolvimento favorito, digite o seguinte comando e salve o arquivo como *hello_world.py*.

```python
print("Olá mundo!")
```

## Execução do python

Os códigos em python são armazenados em arquivos com a extensão .py. Esses arquivos contêm os comandos que serão interpretados e executados pela linguagem. Uma das maneiras mais simples de executar um *script* é utilizando o próprio ambiente de desenvolvimento, como o Visual Studio Code. Nesse ambiente, basta abrir o arquivo .py e utilizar o botão “*Run*”, que automaticamente inicia a execução do código. Essa abordagem é bastante prática para iniciantes, pois permite escrever, editar e testar programas em um único local, além de oferecer recursos de depuração e destaque de sintaxe.

Outra forma muito utilizada consiste em executar os *scripts* diretamente pelo terminal do sistema operacional. Para isso, é necessário acessar a pasta onde o arquivo está armazenado o *script* e executar o comando:

```bash
python hello_world.py
```

Nesse exemplo, hello_world.py representa o nome do arquivo que contém o seu primeiro programa em python. Ao executar esse comando, o interpretador da linguagem lê o arquivo e executa todas as instruções presentes no código. 

A execução via terminal é bastante importante, pois muitos programas são executados em servidores, *clusters* e ambientes remotos sem interface gráfica. Por isso, aprender a utilizar tanto o ambiente visual quanto o terminal oferece maior flexibilidade para desenvolvimento e execução de análises computacionais em diferentes contextos.

## Boas praticas de programação em python

Seguir boas práticas de programação é fundamental para produzir códigos mais organizados, legíveis e fáceis de manter. Em projetos complexos, onde análises frequentemente precisam ser reproduzidas e compartilhadas com colaboradores, escrever códigos bem estruturados torna-se ainda mais importante.

Uma das primeiras recomendações está relacionada aos nomes de variáveis. É importante utilizar nomes claros e descritivos, que indiquem corretamente a finalidade da informação armazenada. Variáveis com nomes genéricos ou pouco intuitivos dificultam a compreensão do código e aumentam a chance de erros durante o desenvolvimento.

```python
# Evite nomes de variáveis genéricas
arquivo_teste = "arquivo.fasta"
# Prefira nomes descritivos
genoma_referencia = "Neurospora_crassa.fasta"
```

Os comentários são igualmente importantes para documentar trechos específicos do código, explicando objetivos, etapas ou decisões tomadas durante a implementação. Em python, comentários podem ser de linha única - usando o cerquilha (#) no começo da linha; ou de múltiplas linhas - usando três aspas (''') no começo e no fim do bloco.

```python
# Isso aqui é um comentário de uma linha.
 
'''
Isso aqui é um comentário 
em bloco.
'''
```

Outra boa prática recomendada é a padronização da identação do seu código. A identação faz parte da própria sintaxe da linguagem python e define blocos de execução, como estruturas condicionais, laços de repetição e funções. Evite misturar padrões de identação para que não haja erros de sintaxe. Ou seja, comece e termine a identação do seu código com o mesmo padrão (uso de tabulação ou de espaço).

## Tipos de variaveis

Variáveis são utilizadas para armazenar informações que podem ser manipuladas durante a execução do programa. Cada variável possui um tipo de dado associado, que determina o formato da informação armazenada e quais operações podem ser realizadas com ela. Como python possui tipagem dinâmica, não é necessário declarar explicitamente o tipo da variável no momento de sua criação, pois o próprio interpretador identifica automaticamente o tipo com base no valor atribuído.

Um dos tipos mais utilizados é o *string* (str), empregado para armazenar textos e sequências de caracteres. *Strings* podem representar nomes, sequências biológicas, caminhos de arquivos, mensagens e diversas outras informações textuais. Em python, textos geralmente são definidos entre aspas simples ou duplas.

```python
sequencia = "AACGTCAGTGCATGTACGCAGTCAGTCGAT"
```

O tipo inteiro (int) é utilizado para armazenar números inteiros, ou seja, valores numéricos sem casas decimais. Esse tipo é frequentemente empregado em contagens, índices, posições em listas e diversas operações matemáticas.

```python
n_genomas = 45
```


Já o tipo ponto flutuante (float) representa números reais com casas decimais. Esse formato é muito importante em análises científicas, pois permite trabalhar com valores estatísticos, probabilidades, médias, frequências e diferentes cálculos numéricos que exigem maior precisão.

```python
conteudo_gc = 55.7
```

Outro tipo fundamental é o booleano (bool), utilizado para representar valores lógicos. Variáveis booleanas podem assumir apenas dois valores: *True* (verdadeiro) ou *False* (falso). Esse tipo é amplamente utilizado em estruturas condicionais e tomadas de decisão dentro dos programas.

```python
eucarioto = False
procarioto = True
```

## Operadores

Operadores aritméticos são utilizados para realizar cálculos matemáticos e manipular valores numéricos dentro dos programas. Esses operadores são fundamentais no desenvolvimento de algoritmos, análises estatísticas e processamento de dados científicos, especialmente na bioinformática, onde frequentemente são realizados cálculos envolvendo sequências biológicas, porcentagens, frequências e métricas estatísticas.

O operador **'+'** é utilizado para realizar operações de soma entre valores numéricos. Além disso, também pode ser empregado para concatenar textos armazenados em variáveis do tipo *string*.


```python
# Exemplo numérico
'''
Nesse exemplo, o operador soma a quantidade de *reads* obtidas em duas amostras de sequenciamento.
'''
leituras = 1500 + 2300

#Exemplo com strings
'''
Nesse caso, duas sequências de DNA são unidas em uma única string.
'''
sequencia = "ATCG" + "GCTA"
```

O operador **'-'** realiza operações de subtração entre números.

```python
'''
Nesse exemplo, o código calcula quantos genes permaneceram após uma etapa de filtragem.
'''
genes_restantes = 5000 - 1200
```

O operador **'*'** é utilizado para multiplicação.

```python
# Estimativa de cobertura de sequenciamento.
cobertura_total = 30 * 100
```

O operador **'/'** realiza divisões e retorna um valor do tipo float, mesmo quando o resultado é um número inteiro.

```python
# Proporção de conteúdo GC em uma sequência biológica.
gc_content = 40 / 100
```

Já o operador **'%'**, conhecido como operador módulo, retorna o resto de uma divisão inteira. Esse operador pode ser utilizado, por exemplo, para identificar leituras pares e ímpares durante processamento de arquivos

```python
# Se o resultado for 0, o número é par; caso contrário, é ímpar.
indice = 25 % 2
```

## Estruturas de dados

Estruturas de dados são utilizadas para armazenar e organizar múltiplas informações dentro de uma única variável. Essas estruturas são extremamente importantes para manipular listas de genes, sequências biológicas, coordenadas genômicas e informações de amostras experimentais.

As listas são estruturas mutáveis, ou seja, seus elementos podem ser alterados, adicionados ou removidos após a criação da variável. Elas são muito utilizadas quando os dados precisam ser modificados durante a execução do programa.

Exemplo utilizando nomes de genes identificados em uma análise:

```python
# Definir uma lista de genes
genes = ["BRCA1", "TP53", "EGFR"]

# Imprimir a lista completa
print(genes)

# Em Python, a indexação começa em 0
# Vamos imprimir o primeiro gene da lista
print(genes[0])

# Alterar um elemento da lista
genes[0] = "BRCA2"

# Imprimir novamente o primeiro elemento
print(genes[0])

# Imprimir o segundo elemento
print(genes[1])

# Imprimir todos os elementos a partir da posição 1
print(genes[1:])

# Adicionar um novo gene à lista
genes.append("MYC")

# Imprimir lista atualizada
print(genes)
```

As tuplas possuem funcionamento semelhante às listas, porém são imutáveis. Isso significa que seus valores não podem ser alterados após a criação da estrutura. Tuplas podem ser utilizadas para armazenar informações fixas, como coordenadas genômicas. Nesse caso, os valores representam posições fixas dentro de um cromossomo e não devem ser modificados durante a execução do programa.

```python
# Coordenadas de uma região genômica
coordenadas = (10400, 20000)
print(coordenadas)
```

Já os dicionários armazenam informações no formato chave e valor, permitindo organizar dados associados de maneira estruturada. Essa estrutura é muito útil para representar informações de amostras biológicas, resultados clínicos ou metadados experimentais. No exemplo abaixo, cada informação está associada a uma chave específica, permitindo acesso rápido e organizado aos dados da amostra.


```python
# Informações de uma amostra biológica
amostra_cancer_mama = {
    "nome": "Paciente_01",
    "idade": 35,
    "diagnostico": "positivo"
}

print(amostra_cancer_mama)
print(amostra_cancer_mama["nome"])
print(amostra_cancer_mama["diagnostico"])
```


## Funções e parametros

Funções são blocos de código criados para executar tarefas específicas de maneira organizada e reutilizável. O uso de funções permite evitar repetição de código, tornando os programas mais limpos, modulares e fáceis de manter. Essa abordagem é extremamente importante, pois muitas análises computacionais são executadas repetidamente em diferentes sequências, amostras ou conjuntos de dados.

Os parâmetros são valores fornecidos para a função no momento de sua execução. Eles tornam as funções mais flexíveis, permitindo reutilizar a mesma lógica computacional em diferentes situações sem necessidade de reescrever o código.

No exemplo abaixo, a função recebe uma sequência de DNA como parâmetro e retorna a quantidade de bases presentes na sequência:

```python
def contar_bases(sequencia):
    return len(sequencia)

resultado = contar_bases("ATCGGCTA")
print(resultado)
```

A função contar_bases() pode ser reutilizada para qualquer sequência biológica:

```python
print(contar_bases("ATCG"))
print(contar_bases("GGGCTAAC"))
print(contar_bases("TTAAAGCGCG"))
```

Funções também podem ser utilizadas para automatizar tarefas comuns como cálculo de conteúdo GC, filtragem de sequências ou processamento de arquivos FASTA.

## Fatiamento de dados (*Slicing*)

*Slicing* é uma técnica utilizada para acessar partes específicas de estruturas de dados, como *strings*, listas e tuplas. Esse recurso é amplamente utilizado para extração de regiões específicas de interesse, como regiões codificadoras de genes, éxons, *primers*, motivos conservados e segmentos regulatórios do DNA. 

A sintaxe básica do slicing utiliza colchetes contendo índices no formato:

```python
estrutura[inicio:fim]
```

O índice inicial indica onde o corte começa, enquanto o índice final representa a posição onde o corte termina. O elemento da posição final não é incluído no resultado.

Exemplo utilizando uma sequência de DNA:

```python
sequencia = "ATGCGTACGTTAGC"
print(sequencia[0:3])
```

## Entrada de dados pelo usuário

O uso de entrada de usuário torna os programas mais flexíveis e reutilizáveis, permitindo desenvolver ferramentas interativas para diferentes tipos de análises. A função mais utilizada para entrada de dados é **input()**, que captura o valor informado pelo usuário no terminal e o armazena em uma variável.

```python
nome_amostra = input("Digite o nome da amostra: ")
print(nome_amostra)
```

Nesse exemplo, o programa solicita ao usuário o nome de uma amostra biológica e posteriormente imprime o valor informado.

Os dados recebidos pela função input() são armazenados inicialmente como texto (*string*). Por isso, quando for necessário trabalhar com valores numéricos, é importante realizar conversão de tipos utilizando funções como int() ou float().

```python
quantidade_sequencias = int(input("Digite a quantidade de sequências: "))
print(quantidade_sequencias)

```

## Estruturas condicionais e tomada de decisão

As estruturas condicionais são utilizadas para controlar o fluxo de execução dos programas com base em condições lógicas. Essas estruturas permitem que diferentes ações sejam executadas dependendo dos valores analisados, tornando os programas mais dinâmicos e capazes de tomar decisões automaticamente.

As principais estruturas condicionais em python são if, elif e else.

A estrutura **if** é utilizada para verificar se uma condição é verdadeira. Caso a condição seja satisfeita, o bloco de código associado será executado.

```python
#Exemplo utilizando tamanho de sequência

sequencia = "ATGCGTAGCTAGCTAGCTA"
if len(sequencia) >= 20:
    print("Sequência adequada para análise")
```

A estrutura **elif** permite adicionar novas condições intermediárias ao fluxo de decisão.

```python
#Exemplo utilizando qualidade média de read de sequenciamento

qualidade_media = 28

if qualidade_media >= 30:
    print("Read de alta qualidade")
elif qualidade_media >= 20:
    print("Read de qualidade intermediária")
```
A estrutura **else** é utilizada quando nenhuma das condições anteriores é satisfeita.

```python
#Exemplo utilizando qualidade média de read de sequenciamento

qualidade_media = 15

if qualidade_media >= 30:
    print("Read de alta qualidade")

elif qualidade_media >= 20:
    print("Read de qualidade intermediária")

else:
    print("Read com baixa qualidade")
```

Estruturas condicionais são amplamente utilizadas para filtragem de sequências, classificação de amostras, validação de dados experimentais e automação de *pipelines*. 

## Estruturas de repetição e automação de tarefas

As estruturas de repetição permitem executar um mesmo bloco de código várias vezes de forma automática. Esse recurso é extremamente importante, pois análises computacionais frequentemente envolvem processamento de milhares de sequências, genes, amostras ou arquivos simultaneamente. As principais estruturas de repetição em python são for e while.

A estrutura **for** é utilizada quando se deseja percorrer elementos de uma estrutura de dados, como listas, strings ou arquivos.

```python
# Exemplo percorrendo uma lista de genes:

genes = ["BRCA1", "TP53", "EGFR", "MYC"]

for gene in genes:
    print(gene)
```

Já a estrutura **while** executa um bloco de código enquanto determinada condição permanecer verdadeira.

```python
indice = 0

while indice < 5:
    print(indice)
    indice += 1
```
Estruturas de repetição são essenciais para automatizar tarefas repetitivas, reduzir tempo de processamento e desenvolver *pipelines* computacionais capazes de lidar com grandes volumes de dados biológicos de maneira eficiente.

## Leitura e processamento de arquivos biológicos

Grande parte das análises envolve leitura de arquivos contendo sequências de DNA, RNA ou proteínas, como arquivos FASTA, FASTQ, tabelas e resultados experimentais. A função **open()** é utilizada para abrir arquivos no python. Um dos parâmetros mais importantes dessa função é o modo de abertura do arquivo, que define como o arquivo será manipulado.

Os modos mais utilizados são:

- r **->** leitura (*read*)
- w **->** escrita (*write*)
- a **->** adicionar conteúdo ao final (*append*)

O modo **"r"** é utilizado para abrir arquivos para leitura.

```python
# O método strip() remove espaços e quebras de linha desnecessárias.
with open("genoma.fasta", "r") as arquivo:
    for linha in arquivo:
        print(linha.strip())
```

O modo **"w"** permite criar ou sobrescrever arquivos.

```python
with open("output_analise_01.fasta", "w") as arquivo:
    arquivo.write(">sequencia_1\n")
    arquivo.write("ATGCGTAGCTA\n")
```

Nesse caso, o programa cria um novo arquivo FASTA contendo uma sequência biológica.

Já o modo **"a"** adiciona conteúdo ao final do arquivo sem apagar os dados existentes.

```python
with open("output_analise_01.fasta", "a") as arquivo:
    arquivo.write(">sequencia_2\n")
    arquivo.write("GGCTAACGTA\n")
```

Arquivos compactados são muito comuns devido ao grande volume de dados gerados por sequenciamento. Python permite trabalhar diretamente com arquivos .gz utilizando a biblioteca *gzip*. Essa abordagem é muito utilizada para reduzir espaço em disco e facilitar armazenamento de grandes conjuntos de dados biológicos.

```python
'''
Nesse exemplo:
- "rt" significa read text (leitura em formato texto)
- O arquivo é processado sem necessidade de descompactação manual
'''
# O método strip() remove espaços e quebras de linha desnecessárias.

import gzip

with gzip.open("sequencias.fasta.gz", "rt") as arquivo:
    
    for linha in arquivo:
        print(linha.strip())
```

## Leitura e visualização de dados biológicos

Entre as principais bibliotecas em python utilizadas em bioinformática destaca-se o Biopython, desenvolvida especificamente para manipulação e análise de dados biológicos. O Biopython oferece suporte para leitura de arquivos FASTA e FASTQ, acesso a bancos de dados biológicos, alinhamento de sequências, tradução de DNA para proteínas e diversas outras funcionalidades amplamente utilizadas em *pipelines*.

É possivel consultar a documentação oficial do Biopython, que contém diversos exemplos práticos, tutoriais e explicações detalhadas sobre os módulos mais utilizados, leitura de arquivos FASTA/FASTQ, acesso ao NCBI, alinhamento de sequências e muito mais:

[Biopython Tutorial & Cookbook](https://biopython.org/docs/latest/Tutorial/)


```python
# Exemplo de leitura de um arquivo FASTA utilizando Biopython

from Bio import SeqIO

for registro in SeqIO.parse("genoma_referencia.fasta", "fasta"):
    print(registro.id)
    print(registro.seq)
```

Outra biblioteca extremamente importante é o Matplotlib utilizada para criação de gráficos e visualizações científicas. O Matplotlib pode ser utilizado para representar resultados biológicos, como distribuição de tamanhos de sequências, conteúdo GC e cobertura de sequenciamento. A visualização de dados é fundamental para interpretação de resultados, análises estatísticas e identificação de padrões biológicos.


```python
# Exemplo simulando cobertura de sequenciamento em 3 amostras

import matplotlib.pyplot as plt

amostras = ["Amostra01", "Amostra02", "Amostra03"]
expressao = [120, 80, 150]

plt.bar(amostras, cobertura)

plt.xlabel("Amostras")
plt.ylabel("Cobertura")

plt.show()
```

## Atividades

As atividades abaixo têm como objetivo reforçar conceitos de programação em python aplicados à bioinformática, utilizando manipulação de sequências e visualização de dados.

**1. Contagem de nucleotídeos em uma sequência de DNA**

Objetivo:

Criar um programa que receba uma sequência de DNA, 
digitada pelo usuário, e utilize uma função para contar quantas vezes cada base (A, T, C e G) aparece.

Requisitos:
- O usuário deve inserir a sequência;
- Criar uma função para realizar a contagem das bases;
- Exibir o resultado organizado por nucleotídeo.

**2. Filtragem e cálculo de conteúdo GC**

Objetivo:

Ler 10 sequências de DNA e calcular o conteúdo GC apenas das sequências com mais de 15 pares de base.

Requisitos:

- Receber 10 sequências como entrada;
- Ignorar sequências menores ou iguais a 15 bases;
- Calcular a porcentagem de GC para as sequências válidas.

**3. Visualização do conteúdo GC com gráfico**

Objetivo:

Criar um gráfico para representar o conteúdo GC de diferentes sequências biológicas.

Requisitos:

- Utilizar listas para armazenar os valores de GC;
- Utilizar Matplotlib para gerar um gráfico (barras ou linhas);
- Incluir rótulos nos eixos e título do gráfico.

**4. Distribuição do tamanho de sequências em arquivo FASTA**

Objetivo:

Utilizar Biopython e Matplotlib para analisar um arquivo FASTA (retirado do NCBI) e visualizar a distribuição do tamanho das sequências.

Requisitos:

- Ler um arquivo FASTA utilizando Biopython;
- Calcular o tamanho de cada sequência;
- Gerar um histograma com Matplotlib mostrando a distribuição dos tamanhos.


