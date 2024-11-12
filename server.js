const express = require('express');
const app = express();
const port = 10000;
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bcrypt = require("bcryptjs")
const passport = require("passport")
const flash = require("connect-flash")
const User = require("./router/user")
require("./config/auth")(passport)

const UserDao = require('./entidades/user/userdao.js'); // Altere o caminho conforme necessário
const userDao = new UserDao();
const AgendaDao = require('./entidades/agenda/agendadao.js');
const ReservaDao = require('./entidades/registro/registaTao.js');
const fotoAo = require("./entidades/foto/fotoAo.js");

const FotoDao = new fotoAo()
const reservaDao = new ReservaDao()

// Criando uma instância do AgendaDao
const agendaDao = new AgendaDao();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret: "agenda",
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 86400000},
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null
  
  next()
})

// Rota para editar um usuário
app.post('/editaruser/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const editedUser = req.body;
    await userDao.editar(editedUser, cpf);
    res.redirect('/cadastrouser');
  } catch (error) {
    res.status(500).json({error: 'Erro ao editar usuário'});
  }
});

// Rota para deletar um usuário
app.post('/deletaruser/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    await userDao.deletar(cpf);
    res.redirect('/cadastrouser'); // Redireciona de volta à lista de usuários
  } catch (error) {
    res.status(500).json({error: 'Erro ao deletar usuário'});
  }
});

app.use("/users", User)

//Rota para reserva
app.get("/reservar/:id/:user_id", async (req, res) => {
  const agenda = req.params.id;
  const usuario = req.params.user_id;
  const id = await agendaDao.findById(agenda)
  const user_id = await userDao.findById(usuario)
  
  const user = await userDao.findById(req.session.passport?.user);
  
  // Verificando se o usuário foi encontrado
  if (!user) {
    req.flash("error_msg", "Usuário não encontrado");
    return res.redirect("/users/login");
  }
  
  res.render("reserva", {id, user_id, user})
})

//salvar a reserva do cliente
app.post("/reservar", async (req, res) => {
  var user = req.body
  
  const editarDisponibilidade = {
    disponibilidade: 0,
    id: req.body.id
  }
  await agendaDao.editarDisponibilidade(editarDisponibilidade)
  req.body.id = null
  await reservaDao.salvar(user)
  
  req.flash("success_msg", "Reserva Marcada com exito")
  res.redirect("/")
})

//Rota de formulario
app.get("/", async (req, res) => {
  const resc = null;
  const tag = await userDao.buscarTodosProfissao()
  const buscarfoto = await FotoDao.buscarTodos()
  
  let array = [];
  let reservar = []
  
  for (let index = 0; index < buscarfoto.length; index++) {
    const element = buscarfoto[index];
    
    const x = await userDao.findById(element.user_id)
    const y = await agendaDao.buscarUserId(element.user_id)
    array.push(x)
    reservar.push(y)
  }
  
  try {
    const novoArray = [];
    
    reservar.forEach(array => {
      array.forEach(obj => {
        novoArray.push(obj);
      });
    });
    
    res.render("home", {
      profissao: resc,
      tag: tag,
      buscarfoto,
      array,
      novoArray
    })
  } catch (error) {
  
  }
})

app.get('/users/telainicial', (req, res) => {
  res.render('telainicial.ejs');
});

//new router to home
app.post("/busca", async (req, res) => {
  const profissao = req.body.profissao
  const buscarfoto = await FotoDao.buscarTodos()
  
  const data = await agendaDao.buscar(profissao)
  
  const tag = await userDao.buscarTodosProfissao()
  let array = [];
  let reservar = []
  
  for (let index = 0; index < buscarfoto.length; index++) {
    const element = buscarfoto[index];
    
    const x = await userDao.findById(element.user_id)
    const y = await agendaDao.buscarUserId(element.user_id)
    array.push(x)
    reservar.push(y)
  }
  const novoArray = [];
  
  reservar.forEach(array => {
    array.forEach(obj => {
      novoArray.push(obj);
    });
  });
  
  res.render("home", {
    profissao: data,
    tag: tag,
    buscarfoto,
    array,
    novoArray
  })
})

//ligin com aute
app.post("/login", async (req, res, next) => {
    var usuario = await userDao.buscar(req.body.email)
    
    if (usuario === undefined || usuario === null) {
      req.flash("error_msg", "senha ou email errado")
      res.redirect("/users/login")
    } else {
      passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
        
      })(req, res, next)
    }
  }
)

app.get("/logout", (req, res) => {
  req.logOut(() => {
    console.log("success_msg", "Deslogado com sucesso")
    res.redirect("/")
  })
})

app.post("/teste", async (req, res) => {
  const email = req.body.email
  const result = await userDao.findByEmail(email)
  if (result) {
    res.json({status: "email existe", result})
  } else {
    res.json(" erro em encotrar o email")
  }
})

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});