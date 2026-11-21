import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import { createAppServer } from "../src/server.js";

describe("server", () => {
  let server;
  let base;

  before(async () => {
    server = createAppServer();
    await new Promise((resolve) => server.listen(0, resolve));
    base = `http://localhost:${server.address().port}`;
  });

  after(() => new Promise((resolve) => server.close(resolve)));

  const send = (method, path, body) =>
    fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

  test("grade request for a deleted student returns 404", async () => {
    const created = await (await send("POST", "/transcripts", { name: "Ada" })).json();
    const id = created.studentID;
    await send("POST", `/transcripts/${id}/CS360`, { grade: 90 });

    assert.equal((await send("DELETE", `/transcripts/${id}`)).status, 204);
    assert.equal((await send("GET", `/transcripts/${id}/CS360`)).status, 404);
  });
});
