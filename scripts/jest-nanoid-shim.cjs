const { randomUUID } = require("node:crypto");

exports.nanoid = (size) => randomUUID().replace(/-/g, "").slice(0, size ?? 21);
