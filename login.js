const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');

app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const {username, password } = req.body;
    if(username === 'test' && password === '1234'){
        req.session.loggedIn = true;
        res.redirect('/sudoku-game/index.html');
    } else {
        res.send('ログイン失敗');
    }
});

function authMiddleware(req, res, next){
    if(req.session.loggedIn){
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/sudoku-game/index.html', authMiddleware, (req,res) => {
    res.sendFile(path.join(__dirname, 'sudoku-game', 'index.html'));
});

app.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err){
            return res.send("ログアウト時にエラーが発生しました。");
        }
        return res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`サーバー起動しています：http://localhost:${port}`)
});

app.use('/sudoku-game', express.static(path.join(__dirname, 'sudoku-game')));
