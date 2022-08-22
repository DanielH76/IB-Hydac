import { SqlClient } from "msnodesqlv8";
import { Employee } from "./user.interface";

export function FindAll() {
  const sql: SqlClient = require("msnodesqlv8");
  /* const connectionString =
    "Server=localhost;Database=master;Trusted_Connection=True;"; */

  /* const connectionString =
    "Data Source=(localdb)MSSQLLocalDB;Initial Catalog=master;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"; */

  // const connectionString = "mongodb+srv://DanielH76:<password>@cluster0.sjzlsbj.mongodb.net/?retryWrites=true&w=majority"

  const connectionString =
    "Server=10.56.8.35;Initial Catalog=master;User id=B_EKS01;Password=B_OPENDB01";

  const query = "SELECT * FROM Employees";

  sql.query(connectionString, query, (err, rows) => {
    console.log(err?.message);
    console.log(rows);
  });
  /* sql.query(connectionString, query, (err, rows) => {<
    console.log(rows);
  }); */
}
