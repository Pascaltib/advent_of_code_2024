import fs from "fs";

async function getAdventData(url) {
  const response = await fetch(url, {
    headers: {
      Cookie:
        "session=53616c7465645f5fe88a895e19da94f9b3468909030a98f972fbdf9a22da01f942b34e325dc2f8587e36224b1b5de67db4604160fe6d7604393200863db44650",
      "User-Agent": "myAdventScript (github.com/your-username/advent-script)",
    },
  });
  const data = await response.text();
  fs.writeFile("adventData.txt", data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}

await getAdventData("https://adventofcode.com/2024/day/1/input");
