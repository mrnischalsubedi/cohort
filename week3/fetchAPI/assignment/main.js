const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json())

const ALL_USERS = [
    {
        username: "nischal@gmail.com",
        password: "123",
        name: "nischal subedi",
    },
    {
        username: "yaman@gmail.com",
        password: "123321",
        name: "yaman singh",
    },
    {
        username: "giri@gmail.com",
        password: "123321",
        name: "Priya giri",
    },
];

function userExists(username, password) {
    let userExists = false;
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
            userExists = true;
        }
        return userExists;
    }
}

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword)
    const username = decoded.username;
    res.json({
        users: ALL_USERS
    })
});

app.listen(3000)