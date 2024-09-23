// string

let userName: string = 'Su Min';

function greeting(userName: string) {
  return console.log(`Hello, ${userName}!`);
}

greeting(userName);

// number
let userAge: Number = 32;

// boolean
let birthYear: boolean | null = null;

if (userAge === 32) {
  birthYear = true;
  console.log(`당신은 ${userAge}살, 1992년생 원숭이띠 입니다.`);
} else {
  birthYear = false;
  console.log(`당신은 ${userAge}살, 1992년생 원숭이띠가 아니군요!`);
}

// null
let userData: string | null = null;

function fetchUserData() {
  userData = 'Su Min Kim';
  console.log(`User data fetched: ${userData}`);
}

if (userData === null) {
  console.log('User data is not available yet.');
} else {
  console.log(`Welcome, ${userName}!`);
}

fetchUserData();

// any
let obj: any = { x: 0 };
// obj.foo();
// obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;
