const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const client = require("./client");

const findUserFromToken = async (token) => {
  const id = jwt.decode(token, process.env.JWT).id;
  const user = (await client.query("SELECT * FROM users WHERE id = $1", [id]))
    .rows[0];
  delete user.password;
  return user;
};

const hash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        return reject(err);
      }
      console.log("hashed: ", hashed)
      return resolve(hashed);
    });
  });
};

const compare = ({ plain, hashed }) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hashed, (err, verified) => {
      if (err) {
        return reject(err);
      }
      if (verified) {
        console.log("credentials are verified!!")
        return resolve();
      }
      reject(Error("bad credentials"));
    });
  });
};

const authenticate = async ({ username, password }) => {
  const user = (
    await client.query("SELECT * FROM users WHERE username=$1", [username])
  ).rows[0];

  await compare({ plain: password, hashed: user.password });
  console.log("I made it past the compare function:")
  console.log("process.env.JWT: ", process.env.JWT)
  return jwt.encode({ id: user.id }, process.env.JWT);
};
//replace "foobar" with process.env.JWT

module.exports = {
  findUserFromToken,
  authenticate,
  compare,
  hash,
};
