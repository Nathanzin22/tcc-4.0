const localStrategy = require("passport-local").Strategy
 
const bcrypt = require("bcryptjs")
const passport = require("passport")

const UserDao = require('../entidades/user/userdao'); // Altere o caminho conforme necessário
const userDao = new UserDao();

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done)=>{
        userDao.buscar(email).then((usuario)=>{
            if(!usuario){
                console.log("Não existe uma conta com este número de Bilhete")
                return done(null, false, {message: "Não existe uma conta com este número de Bilhete"})
            }
         
            bcrypt.compare(senha, usuario.senha, (erro, batem)=>{
            

                if(batem){
           

                    return done(null, usuario)
                }else{ 
                    return done(null, false, {message: "Senha Incorreta"})
                }
            })
        })
       

    }))
}

passport.serializeUser(async (usuario, done)=>{
     

     await usuario.id
    
     
    await done(null, usuario.id)
   


})

passport.deserializeUser( async (id, done)=>{
    
    await  userDao.findById(id).then(user => done(null, user))
})

 