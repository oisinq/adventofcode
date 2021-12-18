var bignum = require("bignum");

// ** stolen from https://github.com/pnicorelli/nodejs-chinese-remainder/blob/master/chinese_remainder_bignum.js **
function mul_inv(a, b) {
  var b0 = b;
  var x0 = bignum(0);
  var x1 = bignum(1);
  var q, tmp;
  if (b.eq(1)) {
    return b;
  }
  while (a.gt(1)) {
    q = a.div(b);
    tmp = a;
    a = b;
    b = tmp.mod(b);
    tmp = x0;
    //x0 = x1 - (q * x0);
    x0 = x1.sub(q.mul(x0));
    x1 = tmp;
  }
  if (x1.lt(0)) {
    x1 = x1.add(b0);
  }
  return x1;
}

// a, n are array of bignum instances
function chineseRemainder_bignum(a, n) {
  var p = bignum(1);
  var p1 = bignum(1);
  var prod = bignum(1);
  var i = 1;
  var sm = bignum(0);
  for (i = 0; i < n.length; i++) {
    prod = prod.mul(n[i]);
    //prod = prod * n[i];
  }
  for (i = 0; i < n.length; i++) {
    p = prod.div(n[i]);

    //sm = sm + ( a[i] * mul_inv(p, n[i]) * p);
    p1 = mul_inv(p, n[i]);
    p1 = p1.mul(a[i]);
    p1 = p1.mul(p);
    sm = sm.add(p1);
  }
  return sm.mod(prod);
}

const part1 = (startingTimestamp: number, busIds: number[]): number => {
  let currentTime = startingTimestamp;
  while (true) {
    for (const busId of busIds) {
      if (currentTime % busId === 0)
        return busId * (currentTime - startingTimestamp);
    }

    currentTime += 1;
  }
};

const part2Array = (busIds: string[]): [number[], number[]] => {
  const remainders = [];
  const modulos = [];
  for (let i = 0; i < busIds.length; i++) {
    const currentId = busIds[i];
    modulos.push(bignum(currentId));
    remainders.push(bignum(currentId).sub(i).mod(currentId));
  }

  return [remainders, modulos];
};

var fs = require("fs");

const read = fs.readFileSync(`./q13/input.txt`);
const input: string[] = read.toString().split("\n");

const busIds = input[1].split(",").map((id) => (id === "x" ? "1" : id));

const [remainders, modulos] = part2Array(busIds);

console.log("Part 2: " + chineseRemainder_bignum(remainders, modulos));

export {};
