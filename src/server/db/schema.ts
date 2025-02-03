import {
  bigint,
  index,
  int,
  singlestoreTableCreator,
  text,
  timestamp,
} from "drizzle-orm/singlestore-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const file_table = createTable(
  "files",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("ownerId").notNull(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parentId: bigint("parentId", { mode: "number", unsigned: true }).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parentId),
      index("owner_index").on(t.ownerId),
    ];
  },
);
export type FileEntity = typeof file_table.$inferSelect;

export const folder_table = createTable(
  "folders",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("ownerId").notNull(),
    name: text("name").notNull(),
    parentId: bigint("parentId", { mode: "number", unsigned: true }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parentId),
      index("owner_index").on(t.ownerId),
    ];
  },
);
export type FolderEntity = typeof folder_table.$inferSelect;
