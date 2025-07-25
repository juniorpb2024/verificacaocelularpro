# CyberShield Pro - Funil de Segurança

Um funil de vendas profissional para produtos de segurança cibernética, otimizado para conversões no TikTok.

## 🚀 Como Configurar no GitHub Pages

### Método 1: Usando GitHub Pages com index.html

1. **Faça o upload dos arquivos**:
   - Certifique-se que o arquivo `index.html` está na raiz do repositório
   - Todos os outros arquivos devem estar na estrutura correta

2. **Configure o GitHub Pages**:
   - Vá até as configurações do seu repositório no GitHub
   - Navegue até a seção "Pages" no menu lateral
   - Em "Source", selecione "Deploy from a branch"
   - Escolha a branch "main" (ou "master")
   - Selecione "/ (root)" como pasta
   - Clique em "Save"

3. **Aguarde o deploy**:
   - O GitHub Pages levará alguns minutos para fazer o deploy
   - Você receberá a URL do seu site (algo como: `https://seuusuario.github.io/nome-do-repositorio`)

### Método 2: Usando arquivo de configuração personalizado

Se ainda tiver problemas, crie um arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 🔧 Solução de Problemas

### Erro 404 - Página não encontrada

1. **Verifique se o arquivo index.html existe na raiz**
2. **Confirme se o GitHub Pages está ativado**:
   - Configurações → Pages → Source deve estar configurado
3. **Aguarde o processo de build**:
   - Pode levar até 10 minutos para o site ficar disponível
4. **Verifique a URL**:
   - A URL deve ser: `https://seuusuario.github.io/nome-do-repositorio`
   - Se o repositório se chama exatamente como seu usuário, será: `https://seuusuario.github.io`

### Recursos não carregam

1. **Verifique os caminhos dos arquivos**
2. **Certifique-se que todas as CDNs estão funcionando**
3. **Teste localmente primeiro**:
   - Abra o arquivo `index.html` diretamente no navegador
   - Se funcionar localmente, o problema pode ser específico do GitHub Pages

## 📱 Características do Funil

- **9 etapas otimizadas** para máxima conversão
- **Design profissional** que transmite confiança
- **Gráficos interativos** com Recharts
- **Totalmente responsivo** para mobile/desktop
- **Sistema de urgência** com cronômetros
- **Prevenção de saída** do funil
- **Análise simulada** em tempo real

## 🎯 Páginas do Funil

1. **Landing** - Apresentação inicial com alerta de segurança
2. **Notícia** - Reportagem sobre ameaças cibernéticas
3. **Seleção** - Escolha do tipo de dispositivo
4. **Qualificação** - Perguntas sobre comportamento
5. **Configuração** - Avaliação de proteção atual
6. **Privacidade** - Preocupações sobre dados pessoais
7. **Análise** - Loading simulado de verificação
8. **Resultados** - Dashboard com métricas de risco
9. **Oferta** - Página de conversão final

## 📊 Otimizações Implementadas

- Loading states realistas
- Gráficos de pizza profissionais
- Sistema de estatísticas em tempo real
- Prevenção de volta/F5
- Timer de urgência
- Progressão visual entre etapas
- Calls-to-action estratégicos
- Design corporativo confiável

---

**Nota**: Este funil foi desenvolvido para fins educacionais e de demonstração. Certifique-se de seguir todas as regulamentações aplicáveis ao usar em produção.