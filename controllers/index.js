const indexController = (req, res)=>{
    console.log("header:",req.headers['x-forwarded-proto'])
    console.log("NODE_ENV",process.env.NODE_ENV)
    console.log(req.url)
    if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
    console.log("redirect to https:",['https://',req.get('Host'),req.url].join(''))
    return res.redirect([
      'https://',
      req.get('Host'),
      req.url
    ].join(''));
  }
    
    res.sendFile('index.html');
}

export default indexController;