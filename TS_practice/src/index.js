// string
var userName = 'Su Min';
function greeting(userName) {
    return console.log("Hello, ".concat(userName, "!"));
}
greeting(userName);
// number
var userAge = 32;
// boolean
var birthYear = null;
if (userAge === 32) {
    birthYear = true;
    console.log("\uB2F9\uC2E0\uC740 ".concat(userAge, "\uC0B4, 1992\uB144\uC0DD \uC6D0\uC22D\uC774\uB760 \uC785\uB2C8\uB2E4."));
}
else {
    birthYear = false;
    console.log("\uB2F9\uC2E0\uC740 ".concat(userAge, "\uC0B4, 1992\uB144\uC0DD \uC6D0\uC22D\uC774\uB760\uAC00 \uC544\uB2C8\uAD70\uC694!"));
}
// null
var userData = null;
function fetchUserData() {
    userData = 'Su Min Kim';
    console.log("User data fetched: ".concat(userData));
}
if (userData === null) {
    console.log('User data is not available yet.');
}
else {
    console.log("Welcome, ".concat(userName, "!"));
}
fetchUserData();
// any
var obj = { x: 0 };
// obj.foo();
// obj();
obj.bar = 100;
obj = 'hello';
var n = obj;
