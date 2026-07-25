import bcrypt from "bcrypt";


const plainPassword = "Rohit@456";

const salt = await bcrypt.genSalt(12);

console.log(salt);

const hashPassword = await bcrypt.hash(plainPassword,salt);

console.log(hashPassword);


// hash+salt

// const hashPassword = await bcrypt.hash(plainPassword,10);

// const isMatch =await bcrypt.compare(plainPassword ,"$2b$10$C0rgyh.yUoR/BV69GBVuo.XPgZYdQfbaT/7Ki9fUVbaXBx4JEHCLu");

// // plainPassword+salt --> hash
// console.log(isMatch);

//"Rohit@456":  $2b$10$vyvT/WA/L48jDn2BPHYH4uuVTV4WCTwq58dQAM2Vo.K8GhC0QnMPG
//"Rohit@456": $2b$10$4Lr.XzR56VS281sgyDfkOuoxUR.U.fWlcpCmw/y6T15NCgMwdzu8y
//"Rohit@456": $2b$10$C0rgyh.yUoR/BV69GBVuo.XPgZYdQfbaT/7Ki9fUVbaXBx4JEHCLu