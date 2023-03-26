/*
const fs = require('fs');
const Instagram = require('instagram-private-api').V;
//const device = new Instagram.Device('my-device');
//const storage = new Instagram.CookieFileStorage(__dirname + '/cookies/my-device.json');

const accounts = fs.readFileSync('accounts.txt', 'utf8').split('\n');

const delay = 5000;

accounts.forEach((index) => {
  setTimeout(() => {
    const [username, password] = index.split(':');
    const session = new Instagram.Session();
    Instagram.Account.login(session, username, password)
      .then(() => {
        return Instagram.User.searchForUser(session, 'yosoybyproxx')
      })
      .then(user => {
        return Instagram.Relationship.create(session, user.id);
      })
      .catch(err => {
        console.log(`Error following user with account ${username}: ${err}`);
      });
  }, accounts.indexOf(index) * delay);
});
*/

const fs = require('fs');
const Instagram = require('instagram-private-api');

const ig = new Instagram.IgApiClient();

// Lee las cuentas desde el archivo de texto
const accountsToFollow = fs.readFileSync('accounts.txt', 'utf-8').split('\n');


let user = accountsToFollow[0].split(':')[0];
let password = accountsToFollow[1].split(':')[1];


async function followUsers() {

  // Inicia sesión en Instagram
  ig.state.generateDevice('yosoybyproxx');

  // Usuario y Contraseña de la cuenta
 ig.account.login(user, password); // => Es para tu iniciar sesion en tu cuenta 

  

  // Sigue a cada cuenta
  for (const account of accountsToFollow) {
    const userId = await ig.user.getIdByUsername(account);
    await ig.friendship.create(userId);
    console.log(`Siguiendo a ${account}`);
  }
}

followUsers();


/*
const fs = require('fs');
const delay = require('delay');

async function followAccountsFromFile(filename, userToFollow) {
  const accounts = fs.readFileSync(filename, 'utf8').split('\n');
  for (const account of accounts) {
    // Sigue al usuario con la cuenta actual
    console.log(`Siguiendo a ${userToFollow} con la cuenta ${account}`);
    // Espera un tiempo antes de seguir con la siguiente cuenta
    await delay(1000);
  }
}

followAccountsFromFile('cuentas.txt', 'yosoybyproxx');
*/

/*
const fs = require('fs');
const delay = require('delay');
const Instagram = require('instagram-private-api').V1;

const device = new Instagram.Device('my-device');
const storage = new Instagram.CookieFileStorage(__dirname + '/cookies/my-device.json');

const accounts = fs.readFileSync('accounts.txt', 'utf8').split('\n');

const [username, password] = accounts.split(':');

async function followUser(username, password, targetUsername, accountsFile, followDelay) {
    const session = await Instagram.Session.create(device, storage, username, password);
    const targetAccount = await Instagram.Account.searchForUser(session, targetUsername);
    const accountsData = fs.readFileSync(accountsFile, 'utf-8');
    const accounts = accountsData.split('\n');

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i].trim();
        if (account) {
            console.log(`Following ${targetUsername} from ${account}`);
            await Instagram.Relationship.create(session, targetAccount.id);
            await delay(followDelay);
        }
    }
}

followUser(username, password, 'yosoybyproxx', 'accounts.txt', 5000);
*/
