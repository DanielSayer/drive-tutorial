import {
  bigint,
  index,
  singlestoreTableCreator,
  text,
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

export const files = createTable(
  "files",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    size: text("size").notNull(),
    url: text("url").notNull(),
    parentId: bigint("parentId", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => {
    return [index("parent_index").on(t.parentId)];
  },
);

export const folders = createTable(
  "folders",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parentId: bigint("parentId", { mode: "number", unsigned: true }),
  },
  (t) => {
    return [index("parent_index").on(t.parentId)];
  },
);
