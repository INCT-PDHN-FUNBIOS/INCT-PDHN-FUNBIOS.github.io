# Introdução a ambientes computacionais

Conda, docker, singularity e ambientes virtuais.

## Introdução

Este workbook tem como objetivo preparar os usuários para utilizar os principais serviços e ferramentas computacionais disponíveis no servidor do Laboratório de Genética e Biodiversidade (LGBio) da Universidade Federal de Goiás, com foco nas atividades práticas desenvolvidas no Curso de Bioinformática INCT-PDHN/FUNBIOS.

Ao longo deste material, serão abordados conceitos e aplicações fundamentais para o gerenciamento de ambientes computacionais e execução de análises reprodutíveis, incluindo o uso de containers e gerenciadores de dependências.

O conteúdo está organizado em três capítulos principais:

[Docker](#aula6-docker)

[Conda](#aula6-conda)

[Singularity/Apptainer](#aula6-apptainer)

---

## Objetivos de aprendizagem

Ao final deste material, você será capaz de:

**Docker**
- Compreender o que são containers e imagens Docker, e como se diferenciam de máquinas virtuais.
- Baixar, listar, inspecionar e remover imagens e containers.
- Executar ferramentas bioinformáticas dentro de containers de forma reprodutível.
- Mapear diretórios locais para dentro de containers com bind mounts.
- Construir uma imagem Docker personalizada a partir de um `Dockerfile`.
- Abrir sessões interativas dentro de containers para exploração e depuração.

**Conda**
- Entender o papel do Conda como gerenciador de pacotes e ambientes isolados.
- Criar, ativar, listar e remover ambientes Conda.
- Instalar pacotes a partir de canais como `bioconda` e `conda-forge`.
- Exportar e recriar ambientes para garantir reprodutibilidade.

**Singularity/Apptainer**
- Compreender as diferenças de segurança entre Docker e Singularity em ambientes HPC.
- Baixar e executar imagens `.sif` a partir de repositórios como DockerHub e Singularity Hub.
- Mapear diretórios com `--bind` e gerenciar o cache de imagens.

---

##  Tempo estimado

**2h00 a 2h30** de leitura + prática.

---

## Pré-requisitos

Este material assume que você já sabe:

- Conectar ao servidor via SSH a partir do seu computador.
- Navegar pelo sistema de arquivos com `pwd`, `cd` e `ls`.
- Criar e editar arquivos de texto com `nano` ou similar.
- Executar comandos básicos no terminal Linux (copiar, mover, criar diretórios).
- Entender o conceito de caminhos absolutos e relativos (`/home/usuario/` vs `./pasta`).

---

## Glossário rápido

| Termo | Definição |
|---|---|
| **Container** | Ambiente isolado e leve que executa uma aplicação com todas as suas dependências, compartilhando o kernel do sistema hospedeiro. |
| **Imagem** | Arquivo imutável (modelo) a partir do qual containers são criados. Equivalente a um "molde". |
| **Dockerfile** | Arquivo de instruções que define como construir uma imagem Docker passo a passo. |
| **Docker Hub** | Repositório público de imagens Docker, análogo ao GitHub para código. |
| **Bind mount** | Mapeamento de um diretório do sistema hospedeiro para dentro do container, permitindo troca de arquivos. |
| **Kernel** | Núcleo do sistema operacional, responsável por gerenciar recursos de hardware. |
| **HPC** | *High Performance Computing* — computação de alto desempenho, típica de clusters e servidores institucionais. |
| **`.sif`** | *Singularity Image Format* — formato de arquivo único usado pelo Singularity/Apptainer para armazenar imagens. |
| **Ambiente Conda** | Espaço isolado de instalação de pacotes gerenciado pelo Conda, evitando conflitos de dependências. |
| **Canal (Conda)** | Repositório de onde o Conda obtém pacotes (ex: `bioconda`, `conda-forge`). |
| **Tag** | Identificador de versão de uma imagem Docker (ex: `:latest`, `:7.520`). |
| **Daemon** | Processo em segundo plano que gerencia o ciclo de vida dos containers (Docker Engine). |
| **Registry** | Serviço para armazenar e distribuir imagens Docker (ex: Docker Hub, GitHub Container Registry). |
| **Reprodutibilidade** | Capacidade de re-executar uma análise e obter os mesmos resultados, independentemente do ambiente ou momento. |

---

# Checkpoints para Autoavaliação

Antes da primeira aula presencial, confira se você consegue realizar as tarefas abaixo sem consultar o material. Se tiver dificuldade em algum ponto, revise a seção correspondente.

### Docker

- [ ] Baixar uma imagem do DockerHub com `docker pull`.
- [ ] Listar as imagens disponíveis localmente com `docker images`.
- [ ] Executar um container com `docker run --rm` e passar um comando como argumento.
- [ ] Mapear um diretório local para dentro do container com `-v`.
- [ ] Abrir uma sessão interativa em um container com `-it`.
- [ ] Criar um `Dockerfile` simples com `FROM` e `CMD` e construir a imagem com `docker build`.
- [ ] Remover containers parados com `docker rm` e imagens com `docker rmi`.

### Conda

- [ ] Listar todos os ambientes disponíveis com `conda env list`.
- [ ] Criar um ambiente novo com `conda create -n nome_ambiente`.
- [ ] Ativar e desativar um ambiente com `conda activate` / `conda deactivate`.
- [ ] Instalar um pacote a partir do canal `bioconda` com `conda install`.
- [ ] Executar um comando em um ambiente sem ativá-lo com `conda run`.
- [ ] Exportar um ambiente para um arquivo `.yml` com `conda env export`.

### Singularity/Apptainer

- [ ] Baixar uma imagem do DockerHub e convertê-la para `.sif` com `singularity pull`.
- [ ] Executar um comando dentro de uma imagem `.sif` com `singularity exec`.
- [ ] Mapear um diretório local para dentro do container com `--bind` / `-B`.
- [ ] Verificar e limpar o cache de imagens com `singularity cache list` e `singularity cache clean`.

---

## Aviso final

Encontrou algum erro ou tem sugestões? Anote e nos avise. Esse material está em construção contínua e o feedback de vocês é o que mais ajuda a melhorá-lo.a