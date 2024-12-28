import fs from "fs";

function parseFile() {
  // Read the whole file as a string
  const fileContents = fs.readFileSync("./adventData.txt", "utf-8");

  // Split into lines
  const lines = fileContents.trim().split("\n");

  // Prepare arrays for columns
  const col1 = [];
  const col2 = [];

  // For each line, split by whitespace and store the pieces
  for (const line of lines) {
    // Use a regular expression to split on any amount of whitespace
    const [value1, value2] = line.trim().split(/\s+/);

    // Convert to numbers (optional) and store
    col1.push(Number(value1));
    col2.push(Number(value2));
  }

  return { col1, col2 };
}

export default parseFile;
