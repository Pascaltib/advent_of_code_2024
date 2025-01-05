import fs from "fs";

const fileContents = fs.readFileSync("./adventData.txt", "utf-8").trim();

const arr = fileContents.split("").map(Number);

let type = "file";

let newArr = [];
for (let i = 0; i < arr.length; i++) {
  let digit = arr[i];
  if (type === "file") {
    let currentFileIndex = i / 2;
    for (let j = 0; j < digit; j++) {
      newArr.push(currentFileIndex);
    }
    type = "space";
  } else {
    for (let j = 0; j < digit; j++) {
      newArr.push(".");
    }
    type = "file";
  }
}
console.log(newArr);
//positions of free space
let freePositions = [];
for (let i = 0; i < newArr.length; i++) {
  if (newArr[i] === ".") {
    freePositions.push(i);
  }
}

const loopingArr = [...newArr];

let fileGroup = ["."];
for (let i = loopingArr.length - 1; i >= 0; i--) {
  if (loopingArr[i] !== fileGroup[0]) {
    // Here group is done so we need to try to insert it
    if (fileGroup[0] !== ".") {
      let groupLength = fileGroup.length;
      console.log(fileGroup);
      console.log(freePositions);

      for (let j = 0; j <= freePositions.length - groupLength; j++) {
        let isConsecutive = true;
        for (let z = j + 1; z < j + groupLength; z++) {
          if (freePositions[z] - freePositions[z - 1] !== 1) {
            isConsecutive = false;
            break;
          }
        }
        if (isConsecutive && freePositions[j] + groupLength - 1 < i + 1) {
          // console.log("found free space", j);
          newArr.fill(
            fileGroup[0],
            freePositions[j],
            freePositions[j] + groupLength
          );
          freePositions.splice(j, groupLength);
          newArr.fill(".", i + 1, i + groupLength + 1);

          break;
        }
      }
    }

    fileGroup = [loopingArr[i]];
  } else {
    fileGroup.push(loopingArr[i]);
  }
}

let checksum = 0;
for (let i = 0; i < newArr.length; i++) {
  if (newArr[i] !== ".") {
    checksum += i * newArr[i];
  }
}

console.log(checksum);

// 8504654861152 is too high
