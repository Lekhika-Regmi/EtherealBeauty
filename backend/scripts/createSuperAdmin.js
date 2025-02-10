
const db = require("../src/users/index"); 
const User=db.User;

const bcrypt = require('bcryptjs'); // For password hashing
// Array of superadmin user data
const superadmins = [

  { email: 'prakritykhanal60@gmail.com', password: 'superadminpass' },
  { email: 'rlekhika.regmi@gmail.com', password: 'superadminpass' },
  { email: 'sahsbaral1@gmail.com', password: 'superadminpass' },
  { email: 'ritishasinke12@gmail.com', password: 'superadminpass' },
  // { email: 'prakrity.khanal021@apexcollege.edu.np', password: 'superadminpass' },nod
  // { email: 'lekhika.regmi021@apexcollege.edu.np', password: 'superadminpass' },
  // { email: 'samikshya.baral021@apexcollege.edu.np', password: 'superadminpass' },
  // { email: 'ritisha.sinkemana021@apexcollege.edu.np', password: 'superadminpass' },
];

async function createSuperadmins() {
  try {
    const sequelizeInstance= require("../src/database/db.config");

    console.log("sequelizeInstance"+sequelizeInstance);
    await sequelizeInstance.sync(); 
    console.log("USER"+ User);

    for (const data of superadmins) {
      const existingSuperadmin = await User.findOne({ where: { email: data.email } });
      if (!existingSuperadmin) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await User.create({
          email: data.email,
          password: hashedPassword,
          role: 'superadmin',
        });
        console.log(`Superadmin ${data.email} created!`);
      } else {
        console.log(`Superadmin ${data.email} already exists.`);
      }
    }
  } catch (error) {
    console.error('Error creating superadmins:', error);
  }
}



createSuperadmins();
