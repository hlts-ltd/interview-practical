// import { NextApiRequest, NextApiResponse } from "next";
// import { dbClient } from "./drizzle";
// import { initializeSchema } from "./init";
// import { musicTable, usersTable } from "./schema";

// initializeSchema();

// const createRecord = async (table: string, data: any) => {
//   switch (table) {
//     case "users":
//       return await dbClient.insert(usersTable).values(data);
//     case "music":
//       return await dbClient.insert(musicTable).values(data);
//     default:
//       throw new Error("Table not supported for create operation.");
//   }
// };

// const fetchRecords = async (table: string, id?: number) => {
//   switch (table) {
//     case "users":
//       return id
//         ? await dbClient
//             .select()
//             .from(usersTable)
//             .where(usersTable.id.eq(id))
//             .limit(1)
//         : await dbClient.select().from(usersTable);
//     case "music":
//       return id
//         ? await dbClient
//             .select()
//             .from(musicTable)
//             .where(musicTable.id.eq(id))
//             .limit(1)
//         : await dbClient.select().from(musicTable);
//     default:
//       throw new Error("Table not supported for fetch operation.");
//   }
// };

// const updateRecord = async (table: string, id: number, data: any) => {
//   switch (table) {
//     case "users":
//       return await dbClient
//         .update(usersTable)
//         .set(data)
//         .where(usersTable.id.eq(id));
//     case "music":
//       return await dbClient
//         .update(musicTable)
//         .set(data)
//         .where(musicTable.id.eq(id));
//     default:
//       throw new Error("Table not supported for update operation.");
//   }
// };

// const deleteRecord = async (table: string, id: number) => {
//   switch (table) {
//     case "music":
//       return await dbClient.deleteFrom(musicTable).where(musicTable.id.eq(id));
//     default:
//       throw new Error("Table not supported for delete operation.");
//   }
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method, query, body } = req;
//   const { table, id } = query;
//   console.log(method, query, body, table);
//   try {
//     if (method === "POST") {
//       if (!body) return res.status(400).json({ error: "No data provided." });

//       const createdRecord = await createRecord(table as string, body);
//       return res
//         .status(201)
//         .json({ message: "Record created successfully", data: createdRecord });
//     }

//     if (method === "GET") {
//       const records = await fetchRecords(
//         table as string,
//         id ? Number(id) : undefined
//       );
//       if (!records.length)
//         return res.status(404).json({ error: "Record not found" });
//       return res.status(200).json(records);
//     }

//     if (method === "PUT") {
//       if (!id || !body)
//         return res.status(400).json({ error: "Missing ID or data to update" });

//       await updateRecord(table as string, Number(id), body);
//       return res.status(200).json({ message: "Record updated successfully" });
//     }

//     if (method === "DELETE") {
//       if (!id) return res.status(400).json({ error: "ID is required" });

//       await deleteRecord(table as string, Number(id));
//       return res.status(200).json({ message: "Record deleted successfully" });
//     }

//     res.status(405).json({ error: `Method ${method} Not Allowed` });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// }
