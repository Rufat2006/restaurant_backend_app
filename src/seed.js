import bcrypt from "bcryptjs";import db,{migrate} from "./db.js";migrate();
const users=[["Owner","admin","admin123","admin"],["Cashier","cashier","cashier123","cashier"],["Kitchen","kitchen","kitchen123","kitchen"]];
for(const u of users)db.prepare("INSERT OR IGNORE INTO users(name,username,password_hash,role) VALUES(?,?,?,?)").run(u[0],u[1],bcrypt.hashSync(u[2],10),u[3]);
// Old DB column az_name is reused for Russian names in EN/RU version.
const items=[["Chicken Kebab","Куриный кебаб","Grilled chicken skewer","Grill",6.5,"",1,1],["Lamb Kebab","Кебаб из баранины","Juicy lamb skewer","Grill",9,"",1,2],["Dolma","Долма","Stuffed grape leaves","Traditional",7,"",1,3],["Pilaf","Плов","Rice with saffron","Traditional",5.5,"",1,4],["Ayran","Айран","Yogurt drink","Drinks",1.8,"",1,5],["Tea","Чай","Black tea","Drinks",1.2,"",1,6]];
const stmt=db.prepare("INSERT INTO menu_items(en_name,az_name,description,category,price,image_url,available,sort_order) SELECT ?,?,?,?,?,?,?,? WHERE NOT EXISTS(SELECT 1 FROM menu_items WHERE en_name=?)");for(const i of items)stmt.run(...i,i[0]);
console.log("Seed complete. Logins: admin/admin123, cashier/cashier123, kitchen/kitchen123");
