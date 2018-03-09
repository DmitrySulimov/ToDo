const fs = require('fs')
const bodyParser = require('body-parser')

const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
server.use(jsonServer.defaults());
const SECRET_KEY = 'cAtwa1kkEy';
const expiresIn = '10h';


server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));


// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({username, password}){
  return db.users.findIndex(user => user.username === username && user.password === password) !== -1
}

server.post('/users', (req, res) => {
 const username = req.body.username
 const password = req.body.password
  if (isAuthenticated({username, password}) === false) {
    const lastId = db.users.length + 1;
    const status = 200
    const message = 'user is added'
    db.users.push({"id": lastId,
                   "username": username,
                   "password": password
                    });
    res.status(status).json({status, message})
    return
  }
    const status = 401
    const message = 'user is already exist'
    res.status(status).json({status, message})
    return
})


server.post('/users/id',  (req, res, next) => {
 const username = req.body.username
 const password = req.body.password
    if(username == user.username && password == user.password){
    const status = 200
    const message = 'take founded user'
    res.status(status).json(user)
    return
  }
}
    const status = 401
    const message = 'user does not exist'
    res.status(status).json({status, message})
    return
})

server.use('/users', (req,res,next) => {
   res.status(200).json(db.users);
  })


server.post('/auth/login', (req, res) => {
  const {username, password} = req.body
  if (isAuthenticated({username, password}) === false) {
    const status = 401
    const message = 'Incorrect username or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({username, password})
  res.status(200).json({access_token})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(3000, 'localhost', () => {
  console.log('Run Auth API Server')});
