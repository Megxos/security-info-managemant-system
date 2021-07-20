const UserModel = require("../../models/user");
const { hash } = require("bcryptjs");

const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

exports.createSuperAdmin = () => {
  UserModel.findOne({ email: SUPER_ADMIN_EMAIL })
    .then(async (user) => {
      if (!user) {
        UserModel.create({
          email: SUPER_ADMIN_EMAIL,
          password: await hash(SUPER_ADMIN_PASSWORD, 10),
          is_super_admin: true,
        })
          .then(() => console.log("Super Admin Created"))
          .catch((error) => {
            console.log(error);
            process.exit(1);
          });
      } else {
        console.log("Super Admin Exists");
      }
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};
