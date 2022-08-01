const router = require('express').Router();

router.get('/userget', (req, res) => {
  res.send('user get');
});

router.post('/userpost', (req, res) => {
  const username = req.body.username;
  res.send('Your username is: ' + username);
});

module.exports = router;
