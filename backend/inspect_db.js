const db = require('./database');

console.log("--- Users ---");
db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
        console.error("Error fetching users:", err);
        return;
    }
    console.table(rows);

    console.log("\n--- Invoices ---");
    db.all("SELECT * FROM invoices", [], (err, rows) => {
        if (err) {
            console.error("Error fetching invoices:", err);
            return;
        }
        if (rows.length === 0) {
            console.log("No invoices found.");
        } else {
            console.table(rows);
        }
    });
});
