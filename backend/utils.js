import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isADM: user.isADM,
    },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};


const isAuth=(req,res,next)=>{
  // pego o meu token do header
  const token=req.headers.authorization
  // console.log("TOKEN= ",token);
  if(token){
    // Tirar o que vem antes do token, no caso o Bearer com um espaço a direita,para manter somente o valor do TOKEN.
    const onlyToken=token.slice(7,token.length)
    jwt.verify(onlyToken,config.JWT_SECRET,(err,decode)=>{
      if(err){
        res.status(401).send({msg:"Token inválido"})
      }
      req.user=decode
      // console.log("REQ.USER.DECODE= ",req.user)
      next()
      return
    })
  }else{
    return res.status(401).send({msg:"Token não passado"})

  }
}

const isAdm=(req,res,next)=>{
  // console.log("ISADM TOKEN= ",req.user.isADM)
  // Se tiver o token e  valor for ADM, irá deixar passar
  if(req.user && req.user.isADM){
    return next()
  }
  // Caso não tiver o token e não for ADM, irá barrar
  return res.status(401).send({msg:"ADM Token não é válido"})
}
export { getToken,isAuth,isAdm };

/*
TOKEN=  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ3ZDEzNmVmOTI3NDIzNDgzOWQ0Y2YiLCJuYW1lIjoiRGF2aSBTaWx2YSBkYSBQZW5oYSIsImVtYWlsIjoiZGF2aXNwZW5oYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsImlzQURNIjp0cnVlLCJpYXQiOjE1OTg5NjY0MzgsImV4cCI6MTU5OTA1MjgzOH0.yMNzCi0GP6-FysKinVT1W2NfRBQhnGS2Be8cFwRlkcY
REQ.USER.DECODE=  {
  _id: '5f47d136ef9274234839d4cf',
  name: 'Davi Silva da Penha',
  email: 'davispenha@gmail.com',
  password: '123',
  isADM: true,
  iat: 1598966438,
  exp: 1599052838
}
ISADM TOKEN=  true

*/