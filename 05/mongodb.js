const users = [
  { name: 'Ivan' },
  { name: 'Dmitry' },
  { name: 'Anna' },
];

const userByName = {
  Ivan: users[0],
  Dmitry: users[1],
  Anna: users[2],
}

function findUserByName(name) {
  // return users.find(user => user.name === name);
  return userByName[name];
}

// findUserByName('Anna') -> { name: 'Anna' }