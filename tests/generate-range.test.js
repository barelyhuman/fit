import { test } from "uvu";
import * as assert from "uvu/assert";
import { generateRange } from "../src/generate-range";

test("inclusion check", () => {
  const range = generateRange(1, 2);
  assert.equal(range, [1, 2]);
});

test("inclusion check, larger range", () => {
  const range = generateRange(1, 10);
  assert.equal(range, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test.run();
