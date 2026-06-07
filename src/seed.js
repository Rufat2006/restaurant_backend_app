import bcrypt from "bcryptjs";
import db, { migrate } from "./db.js";
migrate();
const users = [
  ["Owner", "admin", "admin123", "admin"],
  ["Cashier", "cashier", "cashier123", "cashier"],
  ["Kitchen", "kitchen", "kitchen123", "kitchen"]
];
for (const u of users) {
  db.prepare("INSERT OR IGNORE INTO users(name,username,password_hash,role) VALUES(?,?,?,?)").run(u[0], u[1], bcrypt.hashSync(u[2],10), u[3]);
}
const items = [
 ["Lahmacun","Лахмаджун","Состав: помидоры, зелёный и красный перец, чеснок, баранина или говядина (бедро или рёберная часть), курдюк, петрушка и специи.","Turkish",270,"assets/lahmacun.png",1,1],
 ["Pide","Пиде","Состав: тесто для пиде, моцарелла, фарш, куриное мясо, перец, маслины, грибы, колбаса, сосиски.","Turkish",320,"assets/pide.png",1,2],
 ["Donar in a bun with chicken","Донар в булочке с курицей","Состав: турецкая булочка, белая капуста, салат айсберг, майонез, томатный соус, курица, картошка, огурец, помидор, лук.","Azerbaijani", 320,"assets/donar_bun_chicken.png",1,3],
 ["Donar in a bun with meat","Донар в булочке с говядиной","Состав: турецкая булочка, белая капуста, салат айсберг,  майонез, зелень, томатный соус, говядина, огурец, помидор, лук, картошка.","Azerbaijani",400,"assets/donar_bun_meat.png",1,4],
 ["Donar in lavash with chicken","Донар в лаваше с курицей","Состав: лаваш, белая капуста, салат айсберг,  майонез, томатный соус, курица, картошка, огурец, помидор, лук.","Fast Food",320,"assets/donar_lavash_chicken.png",1,5],
 ["Donar in lavash with meat","Донар в лаваше с говядиной","Состав: лаваш, салат айсберг,  майонез, зелень, томатный соус, говядина, огурец, помидор, лук, картошка.","Fast Food",400,"assets/donar_lavash_meat.png",1,6]
];
const stmt = db.prepare("INSERT INTO menu_items(en_name,az_name,description,category,price,image_url,available,sort_order) SELECT ?,?,?,?,?,?,?,? WHERE NOT EXISTS(SELECT 1 FROM menu_items WHERE en_name=?)");
for (const i of items) stmt.run(...i, i[0]);
console.log("Seed complete. Logins: admin/admin123, cashier/cashier123, kitchen/kitchen123");
