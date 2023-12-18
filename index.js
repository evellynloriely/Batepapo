import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

const a = express();
const b = 3000;
const c = '0.0.0.0';

a.use(bodyParser.urlencoded({ extended: true }));
a.use(cookieParser());
a.use(session({ secret: 'sua-chave-secreta', resave: true, saveUninitialized: true }))

const d = [];
const e = [];
const A = [];
const desires = [];
let f;

const g = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

a.get('/', (req, res) => {
  const h = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Pet Shop</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: 'Comic Sans MS', cursive, sans-serif;
              background-image: url('images.jpg'); 
              background-size: cover;
              background-position: center;
              height: 100vh;
              display: flex;
              flex-direction: column; 
              align-items: center;
              justify-content: center;
              color: #333; 
          }
  
          h1 {
              text-align: center;
              color: #ff6347; 
          }
  
          p {
              max-width: 600px;
              margin: 20px;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.8); 
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
              color: #333; /* Cor do texto */
          }
  
          a {
              color: #3498db; 
              text-decoration: none;
              font-weight: bold;
              display: block;
              text-align: center;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <p>"Adotar um animal é um gesto louvável, mas não deve ser uma decisão tomada por impulso, já que exige muita responsabilidade e inclui consultas veterinárias e check-ups periódicos, 
      vacinas iniciais e anuais, prevenção de ectoparasitas e alimentação de boa qualidade” Vininha F. Carvalho.
      </p>
      <h1>ADOTE, faça o login para continuar </h1> 
      <a href="/entrar">login</a>
  </body>
  </html>
  
    `;
  res.send(h);
});

a.get('/entrar', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'entrar.html'));
});

a.post('/entrar.html', (req, res) => {
  const i = req.body.username;
  const j = req.body.password;
  if (i === 'usuario' && j === 'senha') {
    req.session.user = i;
    const k = new Date();
    const l = new Date().toLocaleString();
    f = k;
    res.redirect('/menudeacesso');
  } else {
    res.send('Informações incorretas!! <a href="/entrar.html"></a>.');
  }
});

a.get('/menudeacesso', g, (req, res) => {
    const lastAccess = req.cookies.lastAccess || 'N/A';

    res.cookie('lastAccess', new Date().toLocaleString(), { maxAge: 900000, httpOnly: true });
  
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Menu do Sistema</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Comic Sans MS', cursive, sans-serif;
                background-color: #fdeca6; 
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
            }
    
            h1 {
                color: #2c3e50; 
                text-align: center;
            }
    
            ul {
                list-style: none;
                padding: 0;
                margin: 20px 0;
                text-align: center;
            }
    
            li {
                margin: 10px 0; 
            }
    
            a {
                text-decoration: none;
                color: #3498db; 
                font-weight: bold;
                font-size: 18px;
                transition: color 0.3s;
            }
    
            a:hover {
                color: #e74c3c; 
            }
    
            footer {
                margin-top: auto;
                padding: 10px;
                background-color: #34495e; 
                color: #ecf0f1; 
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Menu do Sistema</h1>
        <ul>
            <li><a href="/cadastrointeressados.html">Cadastro de Interessados</a></li>
            <li><a href="/cadastroanimal.html">Cadastro de Pets</a></li>
            <li><a href="/adote.html">Adotar um Pet</a></li>
            <li><a href="/logout">Sair</a></li>
        </ul>
        <footer>
            Último Acesso: <span id="lastAccess">${lastAccess}</span>
        </footer>
        
    </body>
    </html>
    
    `);
});

a.get('/cadastrointeressados.html', g, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'cadastrointeressados.html'));
});

a.post('/cadastrointeressados.html', (req, res) => {
  const { nome, email, telefone } = req.body;
  if (!nome || !email || !telefone) {
    return res.send('Prencha os campos corretamente <a href="/cadastrointeressados.html"></a>.');
  }
  const p = d.find(q => q.nome === nome);
  if (p) {
    return res.send('Este nome já foi cadastrado. <a href="/cadastrointeressados.html">Tente outro</a>.');
  }
  const q = d.find(q => q.email === email);
  if (q) {
    return res.send('Este email já pertence a outro usuario. <a href="/cadastrointeressados.html">Tente outro</a>.');
  }
  const w = d.find(q => q.telefone === telefone);
  if (w) {
    return res.send('Este telefone já está em uso. <a href="/cadastrointeressados.html">Tente outro</a>.');
  }
  const r = {
    nome: nome,
    email: email,
    telefone: telefone
  };
  d.push(r);
  let s = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro</title>
            <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                text-align: center;
            }
    
            h2 {
                color: #3498db;
            }
    
            table {
                width: 80%;
                margin: 20px auto;
                border-collapse: collapse;
            }
    
            th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }
    
            th {
                background-color: #3498db;
                color: #fff;
            }
    
            tr:hover {
                background-color: #f5f5f5;
            }
    
            a {
                display: inline-block;
                margin: 10px;
                padding: 10px 20px;
                text-decoration: none;
                color: black;
                border-radius: 4px;
                transition: background-color 0.3s;
            }
    
            a:hover {
                background-color: #3498db;
            }
        </style> 
        </head>
        <body>
            <h2>Cadastrado realizado!</h2>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>`;
  for (const t of d) {
    s += `
            <tr>
                <td>${t.nome}</td>
                <td>${t.email}</td>
                <td>${t.telefone}</td>
            </tr>`;
  }
  s += `
            </table>
            <br>
            <a href="/cadastrointeressados.html">Cadastrar outro</a>
            <a href="/menudeacesso">Voltar para o Menu</a>
        </body>
        </html>
     `;
  res.header('Content-Type', 'text/html');
  res.send(s);
});


a.get('/cadastroanimal.html', g, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'cadastroanimal.html'));
  });
  
  a.post('/cadastroanimal.html', (req, res) => {
    const { nome, raca, idade } = req.body;
    if (!nome || !raca || !idade) {
      return res.send('Prencha os campos corretamente <a href="/cadastroanimal.html"></a>.');
    }
    const p = A.find(q => q.nome === nome);
    if (p) {
      return res.send('Este pet já foi cadastrado. <a href="/cadastroanimal.html"></a>.');
    }

    const pet = {
      nome: nome,
      raca: raca,
      idade: idade   
    };
    A.push(pet);
    let s = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>Cadastro</title>
              <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f5f5f5;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  text-align: center;
              }
      
              h2 {
                  color: #3498db;
              }
      
              table {
                  width: 80%;
                  margin: 20px auto;
                  border-collapse: collapse;
              }
      
              th, td {
                  border: 1px solid #ddd;
                  padding: 12px;
                  text-align: left;
              }
      
              th {
                  background-color: #3498db;
                  color: #fff;
              }
      
              tr:hover {
                  background-color: #f5f5f5;
              }
      
              a {
                  display: inline-block;
                  margin: 10px;
                  padding: 10px 20px;
                  text-decoration: none;
                  color: #fff;
                  border-radius: 4px;
                  transition: background-color 0.3s;
              }
      
              a:hover {
                  background-color: #3498db;
              }
          </style> 
          </head>
          <body>
              <h2>Cadastrado realizado!</h2>
              <table>
                  <tr>
                      <th>Nome</th>
                      <th>Raça</th>
                      <th>Idade</th>
                  </tr>`;
    for (const P of A) {
      s += `
              <tr>
                  <td>${P.nome}</td>
                  <td>${P.raca}</td>
                  <td>${P.idade}</td>
              </tr>`;
    }
    s += `
              </table>
              <br>
              <a href="/cadastroanimal.html">Cadastrar outro</a>
              <a href="/menudeacesso">Voltar para o Menu</a>
          </body>
          </html>
       `;
    res.header('Content-Type', 'text/html');
    res.send(s);
  });

a.get('/get-interessados-e-pets', (req, res) => {
    res.json({
        interessados: d,
        pets: A
    });
});


a.get('/adote.html', g, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'adote.html'));
});

a.post('/adotar', g, (req, res) => {
    const { usuario, animais } = req.body;

    if (!usuario || !animais) {
        return res.redirect('/adote.html');
    }

    const interessado = d.find(u => u.nome === usuario);
    const petSelecionado = A.find(p => p.nome === pet);

    if (!interessado || !petSelecionado) {
        return res.send('Usuário ou pet não encontrado. <a href="/adote.html">Tente novamente</a>');
    }

    const dataHoraAtual = new Date().toLocaleString();

    const registroDesejo = {
        interessado: interessado.nome,
        animais: petSelecionado.nome,
        dataHora: dataHoraAtual
    };

    desires.push(registroDesejo);

    res.redirect('/adote.html');
});

a.get('/logout', (req, res) => {
    const h = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Pet Shop</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Comic Sans MS', cursive, sans-serif;
                background-image: url('images.jpg'); 
                background-size: cover;
                background-position: center;
                height: 100vh;
                display: flex;
                flex-direction: column; 
                align-items: center;
                justify-content: center;
                color: #333; 
            }
    
            h1 {
                text-align: center;
                color: #ff6347;
            }
    
            p {
                max-width: 600px;
                margin: 20px;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.8); 
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                color: #333; 
            }
    
            a {
                color: #3498db; 
                text-decoration: none;
                font-weight: bold;
                display: block;
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <p>"Adotar um animal é um gesto louvável, mas não deve ser uma decisão tomada por impulso, já que exige muita responsabilidade e inclui consultas veterinárias e check-ups periódicos, 
        vacinas iniciais e anuais, prevenção de ectoparasitas e alimentação de boa qualidade” Vininha F. Carvalho.
        </p>
        <h1>ADOTE, faça o login para continuar </h1> 
        <a href="/entrar">login</a>
    </body>
    </html>
    
      `;
    res.send(h);
  });

a.listen(b, c, () => {
  console.log(`Servidor executando na url http://${c}:${b}`);
});
