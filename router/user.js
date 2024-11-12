const express = require("express")

const router = express.Router()
const UserDao = require('../entidades/user/userdao.js'); // Altere o caminho conforme necessário
const userDao = new UserDao();
const AgendaDao = require('../entidades/agenda/agendadao.js');
const RegistroDao = require('../entidades/registro/registaTao.js');
const Finalizado = require('../entidades/Finalizado/FinalizadoTao.js');
const Foto = require('../entidades/foto/fotoAo.js');

const finalizado = new Finalizado()
const registroDao = new RegistroDao()

const fotoDao = new Foto()

const bcrypt = require("bcryptjs")
const passport = require("passport");
const upload = require("../config/configmulter");


//======ROTAS GET========= 

// Criando uma instância do AgendaDao
const agendaDao = new AgendaDao();


//rota de find de agendas
router.get("/cunsultas", async (req, res) => {
  const {id} = req.user
  const agenda = await agendaDao.buscarUserId(id)
  
  res.render('minhaagenda', {agenda: agenda})
})

//rotas de elminar agenda

router.get("/cunsultas/deletar/:id", async (req, res) => {
  var id = req.params.id
  await agendaDao.deletarAgendaOne(id).then(() => {
    req.flash("success_msg", "deletado com sucesso")
    res.redirect("/users/cunsultas")
  }).catch((error) => {
    req.flash("error_msg", "erro ao deletar")
    
    res.redirect("/")
  })
})

//rotas de editar agenda

router.get("/cunsultas/editar/:id", async (req, res) => {
  
  const id = req.params.id
  await agendaDao.findById(id).then((agenda) => {
    
    res.render("editaragenda", {agenda, id})
    
  })
})

//rotas de editar a agenda

router.post("/agenda/editar", async (req, res) => {
  const id = Number(req.body.id)
  
  const agenda = {
    disponibilidade: req.body.disponibilidade,
    data: req.body.data,
    horario: req.body.horario,
    obs: req.body.obs,
    id: id
  }
  
  await agendaDao.editar(agenda).then(() => {
    req.flash("success_msg", "editado com sucesso");
    
    res.redirect("/users/cunsultas")
  })
})
//rotas de perfil
router.get("/perfil/:id", async (req, res) => {
  const {id} = req.user
  var idi = req.params.id
  const foto = await fotoDao.buscar(id)
  
  const user = await userDao.findById(idi)
  res.render("perfil", {usuario: user, foto: foto})
})


//rotas editar perfil
router.get('/editaruser/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const usuario = await userDao.buscar(cpf); // Você precisará implementar o método 'buscar' na classe UserDao
    res.render('editaruser.ejs', {usuario});
  } catch (error) {
    res.status(500).json({error: 'Erro ao carregar página de edição de usuário'});
  }
});

// Defina a rota de login
router.get('/login', (req, res) => {
  res.render('login.ejs');
});
//routa de formulario agenda
// Rota para retornar a lista de usuários
router.get('/cadastrouser', (req, res) => {
  res.render("cadastrouser", {erros: 0})
});

router.get("/agenda", async (req, res) => {
  try {
    res.render("formularioAgenda")
  } catch (error) {
  
  }
})


router.get("/editar/:id", async (req, res) => {
  const id = req.params.id
  
  userDao.findById(id).then(user => {
    res.render("editaruser", {usuario: user})
  })
})

router.post("/reservas/atender", async (req, res) => {
  
  const {id} = req.user
  let datanow = Date()
  let hoje = `${datanow[8]}${datanow[9]}/${datanow[4]}${datanow[5]}${datanow[6]}`
  
  const data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    data: req.body.data,
    horario: req.body.horario,
    user_id: id,
    datanow: hoje
  }
  
  const eliminar = req.body.id
  await finalizado.salvar(data)
  
  await registroDao.deleteOne(eliminar);
  
  res.redirect("/users/reservas")
})

router.get("/reservas/deletar2/:id", async (req, res) => {
  const id = req.params.id;
  await finalizado.deleteOne(id);
  
  req.flash("error_msg", ` ${id} deletado`)
  res.redirect("/users/reservas")
})

router.get("/reservas/deletar/:id", async (req, res) => {
  const id = req.params.id;
  await registroDao.deleteOne(id);
  
  req.flash("error_msg", `Compromisso ${id} deletado`)
  res.redirect("/users/reservas")
})

//rotas dos compromisso da agenda

router.get("/reservas", async (req, res) => {
  const {id} = req.user;
  const finalizados = await finalizado.findById(id);
  const data = await registroDao.findById(id)
  let datanow = Date()
  let hoje = `${datanow[8]}${datanow[9]}/${datanow[4]}${datanow[5]}${datanow[6]}`
  const dataDays = await finalizado.findByDate(hoje)
  
  res.render("clientereserva",
    {
      data,
      finalizados: finalizados,
      dataDay: dataDays,
      dataDayslength: dataDays.length,
      hoje: hoje,
      datanow
    })
})


/*=======ROTAS POST========== 
NESTA  AREA ESTARÁ OS ROTAS DO TIPO POST 
*/
// Rota para criar um novo usuário

//rotas de /perfil/foto

router.post("/perfil/foto", upload.single('foto'), async (req, res) => {
  const {id} = req.user
  const nome = req.body.nome
  
  const foto = {
    nome: req.file.filename,
    user_id: id
  }
  
  await fotoDao.deletar(id)
  await fotoDao.salvar(foto)
  
  res.redirect(`/users/perfil/${id}`)
})

router.post('/users', async (req, res) => {
  try {
    var erros = []
    
    // Remover caracteres especiais do CPF
    const cpf = req.body.cpf.replace(/\D/g, ''); // Remove pontos e traços
    
    if (!req.body.nome || req.body.nome == null || req.body.nome == undefined) {
      erros.push({text: "Digite nome completo"})
    }
    
    if (!cpf || cpf == null || cpf == undefined) {
      erros.push({text: "Digite número do CPF"})
    }
    
    if (!req.body.email || req.body.email == null || req.body.email == undefined) {
      erros.push({text: "Digite o E-mail"})
    }
    
    if (req.body.senha.length < 6) {
      erros.push({text: "A Senha tem no mínimo 6 dígitos"})
    }
    
    if (cpf.length !== 11) {
      erros.push({text: "O CPF deve ter exatamente 11 dígitos"})
    }
    
    if (req.body.senha2 != req.body.senha) {
      erros.push({text: "Senhas diferentes"})
    }
    
    if (erros.length > 0) {
      res.render("cadastrouser", {erros: erros})
    } else {
      const email = req.body.email;
      const result = await userDao.findByEmail(email);
      
      if (result) {
        req.flash("error_msg", "Email já existe");
        res.redirect("/users/cadastrouser");
      } else {
        const newUser = req.body;
        
        // Atribui o CPF formatado (apenas números) ao newUser
        newUser.cpf = cpf;
        
        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(newUser.senha, salt, async (erro, hash) => {
            if (erro) {
              console.error("Houve um erro ao gerar o hash da senha");
              res.redirect("/");
            }
            newUser.senha = hash;
            await userDao.salvar(newUser).then(() => {
              req.flash("success_msg", "Conta criada com sucesso");
              res.redirect('/users/login');
            }).catch((err) => {
              req.flash("error_msg", "Erro ao salvar o usuário");
              console.error("Erro ao salvar no banco: " + err);
            });
          });
        });
      }
    }
    
  } catch (error) {
    console.error("Erro na criação de conta: ", error);
    
    res.redirect("/users/cadastrouser");
  }
});

router.get('/confirmardeletaruser/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const usuario = await userDao.buscar(cpf);
    
    res.render('confirmardeletaruser.ejs', {usuario});
  } catch (error) {
    res.status(500).json({error: 'Erro ao carregar página de confirmação de exclusão de usuário'});
  }
});

router.post("/editar", (req, res) => {
  const id = req.body.id
  
  const user = {
    nome: req.body.nome,
    cpf: req.body.cpf.replace(/\D/g, ''),
    email: req.body.email,
    profissao: req.body.profissao,
    telefone: req.body.telefone
  }
  
  userDao.editar(user, id).then(() => {
    req.flash("success_msg", "configurações salva")
    res.redirect("/")
  })
})

router.post("/redefinir/senha", async (req, res) => {
  const {id} = req.user
  const senha = req.body.senha
  let senhaNova = req.body.senhaNova
  
  await userDao.findById(id).then((usuario) => {
    if (!usuario) { //return done(null, false, {message: "Não existe uma conta com este número de Bilhete"})
      req.flash("error_msg", "Não é possivel editar a senha")
      res.redirect("/")
    }
    bcrypt.compare(senha, usuario.senha, (erro, batem) => {
      if (batem) {
        bcrypt.genSalt(8, (erro, salt) => {
          bcrypt.hash(senhaNova, salt, async (erro, hash) => {
            
            if (erro) {
              req.flash("error_msg", "houve um erro interno ")
              res.redirect("/")
            }
            senhaNova = hash;
            await userDao.editarSenha(senhaNova, id).then(() => {
              req.flash("success_msg", "Conta criada editada sucesso")
              
              res.redirect(`/users/editar/${id}`);
            }).catch((err) => {
              
              req.flash("error_msg", "Erro ao salvar no ", err);
              
            })
          })
        })
      } else {
        req.flash("error_msg", "Senha Incorreta digite a senha antiga")
        res.redirect("/")
      }
    })
  })
})


router.post("/deletar/:id", async (req, res) => {
  const id = req.params.id
  const senha = req.body.senha

  await userDao.findById(id).then((usuario) => {
    if (!usuario) { //return done(null, false, {message: "Não existe uma conta com este número de Bilhete"})
      req.flash("error_msg", "Não é possivel eliminar")
      res.redirect("/")
    }

    bcrypt.compare(senha, usuario.senha, async (erro, batem) => {
      if (batem) {
        await fotoDao.deletar(id)
        await registroDao.deletarOne(id)
        await finalizado.deletarOne(id)
        await agendaDao.deletarOne(id)
        
        req.logOut(() => {
          userDao.deletar(id).then(() => {
            req.flash("success_msg", "usuario eliminado")
            res.redirect("/")
          })
        })
      } else {
        req.flash("error_msg", "Senha Incorreta digite a senha antiga")
        res.redirect("/")
      }
    })
  }).catch((err) => {
    req.flash("error_msg", "Não conseguiu encontrar o user")
    res.redirect("/")
  })
})

//rotas de autenticação do users
router.post('/autenticacao', async (req, res) => {
  try {
    // const { username, password } = req.body;
    const username = req.body.nome;
    const password = req.body.senha;
    const user = await userDao.authenticate(username, password);
    if (user) {
      req.session.user = user;

      res.redirect('/users/telainicial');
    } else {
      res.status(401).send('Nome de usuário ou senha incorretos.');
    }
  } catch (error) {
    res.status(500).json({error: 'Erro ao autenticar usuário!!!'});
  }
});

//rota para salvar agenda na BD

router.post("/agenda", async (req, res) => {
  try {
    const disponibilidade = Number(req.body.disponibilidade)
    const {id, profissao} = req.user || 0
    
    const newAgenda = {
      disponibilidade: disponibilidade,
      data: req.body.data,
      horario: req.body.horario,
      profissao: profissao,
      obs: req.body.obs,
      user_id: id
    }
    
    await agendaDao.salvar(newAgenda)
    res.redirect("/users/cunsultas")
  } catch (error) {
    console.error("error ", error)
  }
})

module.exports = router