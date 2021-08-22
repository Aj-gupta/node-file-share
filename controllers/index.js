const indexController = (req, res)=>{
    
    if ((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
    return res.redirect([
      'https://',
      req.get('Host'),
      req.url
    ].join(''));
  }
    
    res.sendFile('index.html');
}

export default indexController;