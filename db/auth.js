const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const client = require("./client");

const findUserFromToken = async (token) => {
  //Dry out later
  const id = jwt.decode(token, process.env.JWT).id;
  const role = jwt.decode(token, process.env.JWT).role;

  if(role === 'USER' || role === 'ADMIN'){
    const user = (await client.query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
    delete user.password;
    return user;
  } else if(role === 'COMPANY'){
    const company = (await client.query('SELECT * FROM companies WHERE id=$1', [id])).rows[0];
    delete company.password;
    return company;
  }

};

const hash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        return reject(err);
      }
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

  const company = (
    await client.query('SELECT * FROM companies WHERE username=$1', [username])
  ).rows[0];

  if(user){
    await compare({ plain: password, hashed: user.password });
    return jwt.encode({ id: user.id, role: user.role }, process.env.JWT);
  } else if(company) {
    await compare({ plain: password, hashed: company.password });
    return jwt.encode({ id: company.id, role: company.role }, process.env.JWT);
  };

};

module.exports = {
  findUserFromToken,
  authenticate,
  compare,
  hash,
};
