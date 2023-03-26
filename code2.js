/*
const fs = require('fs');
const Instagram = require('instagram-private-api').V1;

const ig = new Instagram.IgApiClient();

// Lee las cuentas desde el archivo de texto
const accountsToFollow = fs.readFileSync('accounts.txt', 'utf-8').split('\n');


let user = accountsToFollow[0].split(':')[0];
let password = accountsToFollow[1].split(':')[1];


async function followUsers() {

  // Inicia sesión en Instagram https://www.instagram.com/YoSoyByProxx/
  await ig.state.generateDevice(user);

  // Usuario y Contraseña de la cuenta
  await ig.account.login(user, password); // => Es para tu iniciar sesion en tu cuenta 

  // Sigue a cada cuenta
  for (const account of accountsToFollow) {
    const userId = await ig.user.getIdByUsername(account);
    await ig.friendship.create(userId);
    console.log(`${user} ${password} Siguiendo`);
  }
}

followUsers();

*/


const fs = require('fs');
const Instagram = require('instagram-private-api').V1;
const device = new Instagram.Device('my-device');
const storage = new Instagram.CookieFileStorage(__dirname + '/cookies/my-device.json');

// Replace with your username and password
const username = 'YOUR_USERNAME';
const password = 'YOUR_PASSWORD';

async function followUsers() {
  const session = await Instagram.Session.create(device, storage, username, password);
  const accountsToFollow = fs.readFileSync('accounts.txt', 'utf-8').split('\n');

  for (let account of accountsToFollow) {
    try {
      const accountId = await Instagram.Account.searchForUser(session, account);
      await Instagram.Relationship.create(session, accountId.id);
      console.log(`Followed ${account}`);
    } catch (err) {
      console.log(`Error following ${account}: ${err}`);
    }
  }
}

followUsers();
