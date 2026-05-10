# Conda

## O que é o Conda?

O Conda é um gerenciador de pacotes e ambientes que permite a instalação isolada de programas, prevenindo conflitos de dependências entre ferramentas. Diferencia-se do Docker e do Singularity pois não cria um sistema completamente isolado: ele utiliza o sistema de arquivos e as permissões do usuário do sistema hospedeiro, operando dentro do espaço do usuário.

### Distribuições: Anaconda e Miniconda

É comum encontrar os dois termos, o que pode gerar confusão. Anaconda e Miniconda são distribuições do Conda com escopo diferente:

> **Anaconda:** distribuição completa que inclui o Conda, Python, centenas de pacotes científicos pré-instalados, o Jupyter e uma interface gráfica de navegação.

> **Miniconda:** distribuição mínima que inclui apenas o Conda e Python. É a opção recomendada para ambientes de servidor, onde instala-se somente o que é necessário.

### Canais: de onde vêm os pacotes?

Os pacotes no Conda são distribuídos por meio de **canais** (*channels*). Os principais são:

- **`defaults`:** canal padrão, mantido pela Anaconda Inc.
- **`conda-forge`:** canal comunitário amplo, com pacotes atualizados frequentemente. É o mais recomendado para uso geral.
- **`bioconda`:** canal especializado em ferramentas bioinformáticas. Essencial para o nosso contexto.

## Configurando o seu sistema Conda

Antes de usar o Conda, é necessário inicializá-lo para que ele se integre ao shell do usuário:

```bash
conda init
source ~/.bashrc
```

O comando `conda init` atualiza o arquivo de inicialização do shell (`.bashrc`) com as configurações necessárias. O `source ~/.bashrc` aplica essas mudanças imediatamente na sessão atual, sem precisar reiniciar o terminal.

---

Em seguida, configure os diretórios de instalação para que ambientes e pacotes sejam armazenados em um caminho local do usuário e adicone os principais canais de instalação:

```bash
conda config --add envs_dirs ~/.conda/envs
conda config --add pkgs_dirs ~/.conda/pkgs
conda config --add channels conda-forge
conda config --add channels bioconda
```

Essa configuração é importante em servidores compartilhados, onde o usuário geralmente não tem permissão de escrita nos diretórios globais do sistema.

## Comandos básicos do Conda

### Utilização do `--help`

```bash
conda --help
```

### Comando `search`: buscando pacotes disponíveis

Antes de instalar um pacote, é possível verificar sua disponibilidade e as versões existentes nos canais configurados:

```bash
conda search --help
conda search iqtree
conda search -c bioconda trimal   # busca em um canal específico
```

### Comando `env`: gerenciando ambientes

```bash
conda env --help
conda env list      # lista todos os ambientes disponíveis
```

### Comando `create`: criando um novo ambiente

```bash
conda create --help
conda create -n meu_ambiente        # cria um ambiente vazio
conda create -n meu_ambiente python=3.10   # com versão específica de Python
```

### Comando `activate` / `deactivate`: ativando e desativando ambientes

```bash
conda activate meu_ambiente
conda deactivate
```

### Comando `install`: instalando pacotes em um ambiente

```bash
conda install --help
conda install -c bioconda fastp -n meu_ambiente    # instala especificando o canal
```

### Comando `list`: listando os pacotes de um ambiente

```bash
conda list --help
conda list -n meu_ambiente         # pacotes de um ambiente específico
```

### Comando `run`: executando comandos sem ativar o ambiente

```bash
conda run --help
```

### Comando `remove`: removendo pacotes ou ambientes

```bash
conda remove --help
```

### Exportando e recriando ambientes

Uma das principais vantagens do Conda para a ciência é a possibilidade de exportar um ambiente completo e recriá-lo em outra máquina — garantindo reprodutibilidade:

```bash
# Exporta o ambiente ativo para um arquivo YAML
conda activate meu_ambiente
conda env export > meu_ambiente2.yml

# Recria um ambiente a partir do arquivo exportado
conda env create -f meu_ambiente2.yml
```

O arquivo `meu_ambiente.yml` pode ser versionado junto ao projeto, documentando exatamente quais ferramentas e versões foram utilizadas.

## Demonstração 1: Utilizando ambientes existentes

Neste exemplo, usaremos o alinhamento gerado pelo MAFFT no capítulo anterior sobre Docker, para gerar um alinhamento para realizar a limpeza das colunas com baixa qualidade pelo Trimal instalado em um ambiente Conda.


# Ativando o ambiente e executando o Trimal
```bash
conda env list
conda activate trimal
trimal -in alinhamento.fasta -automated1 -out alinhamento.fasta.trim
conda deactivate
```

Também é possível executar o comando diretamente sem ativar o ambiente:

```bash
conda run -n trimal trimal -in alinhamento.fasta -automated1 > alinhamento.fasta.v2.trim
```

## Demonstração 2: Criando um ambiente e instalando pacotes

A criação de ambientes isolados é uma boa prática essencial no uso do Conda. Instalar cada ferramenta em seu próprio ambiente evita conflitos de dependências e facilita a manutenção.

```bash
conda create -n iqtree
conda activate iqtree
conda install bioconda::iqtree
```

Com o ambiente ativo e o IQ-TREE instalado, podemos inferir uma filogenia:

```bash
conda run -n iqtree iqtree -s alinhamento.fasta.trim -m MFP
```

Após o uso, remova o ambiente para liberar espaço:

```bash
conda remove -n iqtree --all
```

## Referências

- [https://docs.conda.io/en/latest/](https://docs.conda.io/en/latest/)
- [https://bioconda.github.io/](https://bioconda.github.io/)

---