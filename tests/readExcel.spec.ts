import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(
  fs.readFileSync(path.join(__dirname, "sample-data", "input.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

for (const record of records) {
  test(`Create user: ${record.test_case}`, async ({ request }) => {
    // API POST request
    const response = await request.post("https://reqres.in/api/users", {
      data: {
        name: record.some_value,
        job: record.some_other_value,
        id: record.test_case,
      },
    });

    expect(response.status()).toBe(201);
    
  });
}
