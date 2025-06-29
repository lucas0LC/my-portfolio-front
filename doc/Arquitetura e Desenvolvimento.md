### **Documentação de Arquitetura e Desenvolvimento**

## **Portfólio Pessoal com Arquitetura Headless**

**Missão do Projeto:** Construir um site de portfólio pessoal, bilíngue (PT/EN), com design moderno e responsivo. O projeto demonstra proficiência em arquiteturas desacopladas, utilizando um CMS robusto no backend para gerenciamento de conteúdo e um framework de frontend de alta performance para a experiência do usuário.

### **1\. Visão Geral da Arquitetura**

Este projeto foi construído sobre uma filosofia **headless**, separando claramente as responsabilidades do backend e do frontend.

* **Backend:**  
  * **Tecnologia:** **Drupal 10**.  
  * **Responsabilidade:** Modelagem de dados, gerenciamento de conteúdo (projetos), gerenciamento de traduções e exposição de todos os dados através de uma API RESTful (JSON:API). Ele não renderiza nenhuma página para o usuário final.  
  * **Hospedagem de Produção:** **Amazon AWS ec2**.  
* **Frontend:**  
  * **Tecnologia:** **Next.js 15+** (com App Router e TypeScript).  
  * **Responsabilidade:** Buscar os dados da API do Drupal, renderizar todas as páginas e componentes, gerenciar a interatividade do usuário (como o seletor de tema e idioma) e fornecer uma experiência de navegação ultrarrápida.  
  * **Hospedagem de Produção:** **Vercel**.  
* **Banco de Dados:**  
  * **Tecnologia:** **AWS RDS** (MySQL).  
  * **Responsabilidade:** Servir como o banco de dados para a instalação do Drupal, oferecendo escalabilidade e gerenciamento simplificado.  
* **Ambiente de Desenvolvimento Local:**  
  * **Drupal:** Gerenciado via **Lando**, que cria um ambiente containerizado com Docker, espelhando de perto o ambiente de produção.  
  * **Next.js:** Executado nativamente via Node.js, comunicando-se com o backend Lando pela rede local.

### **2\. Implementação do Backend (Drupal)**

A configuração do Drupal foi focada em criar uma API de conteúdo estruturada e flexível.

#### **2.1. Modelagem de Conteúdo**

Criamos tipos de conteúdo customizados para atender às necessidades do portfólio:

* **Taxonomia "Tecnologias":** Um vocabulário para categorizar os projetos (ex: "React", "TypeScript", "Drupal").  
* **Tipo de Conteúdo "Projeto":**  
  * Campos de texto: Título, Subtítulo, Descrição (com resumo).  
  * Campos de link: URL do Projeto, URL do Repositório.  
  * Campo de imagem: Imagem de Destaque.  
  * Campo booleano: Destaque na Homepage? para controlar o carrossel.  
  * Campo de referência: Tecnologias, ligando ao vocabulário.  
* **Tipo de Conteúdo "Página Básica":** Usado para páginas únicas como a "Sobre", customizado com um campo de Foto de Perfil.

#### **2.2. Configuração da API**

A API foi configurada para ser robusta e eficiente:

* **Módulo Principal:** Utilizamos o módulo do núcleo **JSON:API**, que expõe automaticamente todo o conteúdo estruturado.  
* **Roteamento Desacoplado:** O módulo **Decoupled Router** foi instalado para traduzir caminhos de URL amigáveis (ex: /projetos/meu-slug) para o UUID interno do Drupal, uma abordagem muito mais confiável do que filtrar por alias.  
* **URLs Limpas:** O módulo **Pathauto** foi configurado para gerar automaticamente apelidos de URL padronizados (ex: /projetos/\[node:title\]), melhorando o SEO e a legibilidade.

#### **2.3. Internacionalização**

O sistema foi construído para ser totalmente bilíngue (pt-BR e en):

* **Módulos Ativados:** Language, Content Translation, Configuration Translation e Interface Translation.  
* **Fluxo de Tradução:** O conteúdo pode ser traduzido manualmente pelo usuário  
* **API Multilíngue:** As consultas de API foram adaptadas para buscar o conteúdo no idioma correto, utilizando o prefixo de idioma (/en/...) para o Decoupled Router  e para as chamadas da JSON:API.

#### **2.4. Pré-processamento de HTML no Servidor**

Para funcionalidades avançadas, criamos uma função de pré-processamento (processHtml.ts) marcada com a diretiva "use server":

* **Correção de URLs de Imagem:** A função usa a biblioteca cheerio para analisar o HTML vindo do Drupal e converter todos os caminhos de imagem relativos (ex: /sites/...) em URLs absolutas, apontando para o backend Drupal.

### **3\. Implementação do Frontend (Next.js)**

O frontend foi construído com foco em performance, experiência do usuário e boas práticas de desenvolvimento.

#### **3.1. Arquitetura e Estrutura**

* **App Router e Rotas Dinâmicas:** A estrutura de pastas app/\[lang\]/... foi utilizada para gerenciar a internacionalização de forma nativa. A função **generateStaticParams** foi implementada no layout raiz para informar ao Next.js quais idiomas pré-renderizar estaticamente.  
* **Next.js 15+:** O código foi adaptado para a sintaxe mais recente, usando **async/await** para acessar params em Server Components.  
* **Componentização:** A interface foi dividida em componentes reutilizáveis e bem definidos, como Navbar, ProjectCard, ModalImage, ImageGrid, ThemeSwitcher, entre outros.

#### **3.2. Design System e Estilização**

* **Tailwind CSS v4:** Utilizamos a versão mais recente do Tailwind.  
* **Modo Claro/Escuro:** Implementado com a biblioteca **next-themes**, que gerencia a troca da classe .dark no \<html\>. O estilo é aplicado no Tailwind com os prefixos dark:, garantindo uma transição suave e respeitando a preferência do usuário.  
* **Animações:** A biblioteca **Framer Motion** foi usada para adicionar micro-interações e animações sofisticadas, como o "Shared Layout" no modal de imagens e a transição do seletor de tema.

#### **3.3. Funcionalidades Avançadas**

* **Gerenciamento de Estado para idioma:** Foi implementado o **React Context** (LanguageContext) para resolver o desafio de navegação entre traduções de páginas dinâmicas. A página de detalhe do projeto busca um mapa completo de traduções e o "publica" no contexto. O LanguageSwitcher, um componente global na Navbar, "lê" este contexto e gera os links corretos para o slug traduzido, garantindo uma experiência de usuário contínua e lógica.

### **4\. Principais Desafios Superados (Troubleshooting)**

O desenvolvimento deste projeto envolveu a resolução de vários problemas técnicos complexos, demonstrando uma capacidade robusta de depuração:

* **CORS (Cross-Origin Resource Sharing):** Resolvido configurando a lista de origens permitidas no arquivo services.yml do Drupal.  
* **Erros de Hidratação do Next.js:** Causados por HTML inválido (aninhamento de \<html\>) vindo do Drupal. Foram resolvidos ajustando os filtros de formato de texto no Drupal e implementando uma lógica de limpeza de HTML no frontend.  
* **Conflitos com a Classe prose:** O problema das imagens não ficarem em grid foi resolvido usando a classe not-prose do Tailwind para criar uma "exceção" de estilo para o contêiner da galeria.  
* **Loops e Erros de Tipo:** Problemas de recursão infinita e erros de tipo com bibliotecas como html-react-parser e cheerio foram depurados e corrigidos, refinando a lógica de manipulação do DOM.  
* **Internacionalização de Rotas:** O desafio de manter o contexto do idioma ao navegar e de traduzir slugs dinâmicos foi a motivação para a implementação da arquitetura final com React Context.

Este projeto representa uma implementação completa e bem-sucedida de uma arquitetura headless moderna, demonstrando proficiência em todo o ciclo de vida do desenvolvimento, desde o planejamento do backend até o design interativo do frontend e a resolução de problemas complexos.