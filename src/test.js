const bcryptjs = require('bcryptjs');

const numSaltRounds = 1;

const password = 'password'

bcryptjs.hash(password, numSaltRounds)
.then(hash => {
  const myHash = hash
  console.log(hash)

  bcryptjs.compare(password, hash).then(res => console.log(res))
})
.catch(err => console.log(err))


//console.log(bcryptjs.compare(password, hash)); // true