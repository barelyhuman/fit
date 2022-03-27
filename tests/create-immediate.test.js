import { test } from "uvu";
import * as assert from "uvu/assert";
import fetch from "node-fetch";

import { createImmediate } from "../src/index.js";

test("Basic GET", async () => {
  const id = 1;
  const response = await createImmediate(
    `http://jsonplaceholder.typicode.com/posts/${id}`,
    fetch
  ).get();
  assert.is(response.id, 1);
});

test("Basic POST", async () => {
  const response = await createImmediate(
    `http://jsonplaceholder.typicode.com/posts`,
    fetch
  ).post({
    userId: 1,
    title: "Hello",
    body: "New content",
  });

  assert.ok(response.id);
});

test("Basic PUT", async () => {
  const response = await createImmediate(
    "http://jsonplaceholder.typicode.com/posts/1",
    fetch
  ).put({
    title: "Hello",
  });
  assert.ok(response.id);
});

test("Basic PATCH", async () => {
  const response = await createImmediate(
    "http://jsonplaceholder.typicode.com/posts/1",
    fetch
  ).patch({
    title: "Hello",
  });
  assert.ok(response.id);
});

test("Basic DELETE", async () => {
  const response = await createImmediate(
    "http://jsonplaceholder.typicode.com/posts/1",
    fetch
  ).delete();
  assert.ok(response);
});

test.run();
