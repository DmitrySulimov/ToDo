const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const router = jsonServer.router('./db.json')
const server = jsonServer.create()
const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
server.use(jsonServer.defaults());
const SECRET_KEY = 'cAtwa1kkEy';
const expiresIn = '1h';


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
function isAuthenticated(username, password){
  return db.users.findIndex(user => user.username === username && user.password === password) !== -1
}

server.post('/users', (req, res) => {
 const username = req.body.username
 const password = req.body.password
  if (isAuthenticated({username, password}) === false) {
    const lastId = db.users.length + 1;
    const status = 200
    const message = 'user was added'
    console.log(typeof db.users)
    db.users.push({"id": lastId,
                   "username": username,
                   "password": password
                    });

    fs.writeFile('./db.json', JSON.stringify(db));
    res.status(status).json({status, message})
    return
  }
    const status = 200
    const message = 'user is already exist'
    res.status(status).json({status, message})
    return
})


server.post('/users/id',  (req, res, next) => {
 const username = req.body.username
 const password = req.body.password
 for (user of db.users){ 
    if(user.username === username && user.password === password){
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
 const username = req.body.username
 const password = req.body.password
  if (isAuthenticated(username, password) === false) {
    const status = 200
    const message = 'Incorrect username or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({username, password})
  res.status(200).json({access_token})
})

server.use(/^\/auth.*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined){
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

server.post('/auth/addTask', (req, res) => {
  console.log(req.header('Authorization'));
    const status = 200
    const message = 'task was added'
    db.toDo.push({ id: req.body.id,
                   checked: req.body.checked,
                   whatAreYouDoing: req.body.whatAreYouDoing,
                   priority: req.body.priority,
                   userId: req.body.userId });
     fs.writeFile('./db.json', JSON.stringify(db));
     res.status(status).json({status, message})
     return
})

server.delete('/auth/delTask/:id', (req, res) => {
  const delId = db.toDo.findIndex((todo) => todo.id == req.params.id);
    if (delId != -1){
      db.toDo.splice(delId, 1);      
      const status = 200
      const message = 'task was deleted'
      fs.writeFile('./db.json', JSON.stringify(db));
      res.status(status).json({status, message})
      return
    }
    else{
      const status = 200
      const message = 'task not found'
      res.status(status).json({status, message})
      return
    }
})

server.put('/auth/changeTask', (req, res) => {
  const changeId = db.toDo.findIndex((todo) => todo.id == req.body.id);
    if (changeId != -1){
      db.toDo.splice(changeId, 1, req.body);      
      const status = 200
      const message = 'task was updated'
      fs.writeFile('./db.json', JSON.stringify(db));
      res.status(status).json({status, message})
      return
    }
    else{
      const status = 200
      const message = 'task not found'
      res.status(status).json({status, message})
      return
    }
})

server.post('/auth/tasks', (req, res) => {
  const id = req.body.id;
  if ((db.toDo.filter(item => item.userId == id)) == []) {
      const status = 200
      const message = 'task list is empty'
      res.status(status).json({status, message})
      return
  }
    res.status(200).json(db.toDo.filter(item => item.userId == id));
    return
})

server.use(router)

server.listen(3000, 'localhost', () => {
  console.log('Run Auth API Server')});
