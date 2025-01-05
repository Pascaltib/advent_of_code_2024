import fs from "fs";

const fileContents = fs.readFileSync("./adventData.txt", "utf-8").trim();

const arr = fileContents.split("").map(Number);

// console.log(arr);

// alternate between each digit to build new arr (file -> free space)

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

console.log(freePositions);

const loopingArr = newArr;

let freePositionsTakenIndex = 0;
for (let i = loopingArr.length - 1; i >= 0; i--) {
  if (
    loopingArr[i] !== "." &&
    freePositionsTakenIndex < freePositions.length &&
    freePositions[freePositionsTakenIndex] < i
  ) {
    newArr[freePositions[freePositionsTakenIndex]] = loopingArr[i];
    newArr[i] = ".";
    freePositionsTakenIndex += 1;
  }
}
// console.log(newArr);

let checksum = 0;
for (let i = 0; i < newArr.length; i++) {
  if (newArr[i] !== ".") {
    checksum += i * newArr[i];
  }
}

console.log(checksum);
