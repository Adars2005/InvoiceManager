# Project Thinking & Architecture

## 1. Design Decision: Integrating Prisma ORM

I chose to migrate the database layer to **Prisma ORM** (with SQLite).

**Why?**
*   **Type Safety**: Prisma provides auto-generated types for the database models, reducing runtime errors.
*   **Schema Management**: The `schema.prisma` file enables clear, declarative definition of the database structure and relationships.
*   **Maintainability**: Migrations are handled automatically, making schema evolution safer and more organized.
*   **Security**: Prisma Client automatically sanitizes inputs, preventing SQL injection attacks without manual parameter binding.

## 2. Alternative Approach Considered: Raw SQLite (sqlite3)

The initial implementation used the raw `sqlite3` driver.

**Why not choosing it?**
*   **Boilerplate**: Writing raw SQL queries manually for every operation is error-prone and tedious.
*   **Lack of Types**: No compile-time validation of query results or parameters.
*   **Schema Hardcoding**: Creating tables via raw SQL strings in `database.js` makes schema tracking difficult.

## 3. Impact of Adding `tax_amount` Field

If a new field `tax_amount` is added to the invoice structure, and the total amount is calculated as `invoice_amount + tax_amount`, the following changes would be required:

### Database (Prisma Schema & Migration)

*   **Schema Change**: Update `backend/prisma/schema.prisma`:
    ```prisma
    model Invoice {
      // ... existing fields
      taxAmount Float @default(0)
    }
    ```
*   **Migration Command**: Run `npx prisma migrate dev --name add_tax_amount` to automatically generate and apply the SQL migration.

### Backend APIs

*   **POST /invoices**:
    *   Update the `prisma.invoice.create` call to include `taxAmount` from `req.body`.
*   **GET /invoices**:
    *   Prisma automatically selects all fields, so `taxAmount` will be included in the response.
    *   If a computed `totalAmount` is needed in the API response, we can map over the results:
        ```javascript
        const results = invoices.map(inv => ({
            ...inv,
            totalAmount: inv.amount + inv.taxAmount
        }));
        ```
*   **PUT /invoices/:id** (if implemented):
    *   Allow updating `taxAmount`.

### Frontend UI & Logic

*   **InvoiceForm Component**:
    *   Add a new input field for "Tax Amount".
    *   Send the `taxAmount` in the payload.
*   **InvoiceList Component**:
    *   Update the UI to display Tax Amount and the calculated Total Amount.
    *   Logic: `const total = invoice.amount + (invoice.taxAmount || 0);`
