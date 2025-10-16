import bcrypt from "bcrypt";
import { UserModel } from "../modules/users/userSchema";
import dotenv from "dotenv";

dotenv.config();

export async function seedAdminAccount() {
  const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || "admin";
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin1234";

  const exisitingAdmin = await UserModel.findOne({ username: adminUsername });

  if (!exisitingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await UserModel.create({
      username: adminUsername,
      password: hashedPassword,
      role: "admin",
    });
    console.log(`✅ Admin account created: ${adminUsername}/${adminPassword}`);
  } else {
    console.log(`⚠️ Admin account already exists.`);
  }
}
