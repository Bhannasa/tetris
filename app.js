let canvas = document.querySelector('canvas');
let u = innerHeight / 100;
canvas.height = 90 * u;
canvas.width = 48 * u;
let c = canvas.getContext('2d');


let drawBox = (j, i, color) => {
    c.fillStyle = color;
    c.fillRect(j * 6 * u, i * 6 * u, 6 * u, 6 * u);
    c.strokeRect(j * 6 * u, i * 6 * u, 6 * u, 6 * u);
}

let drawBoard = () => {
    c.fillRect(0, 0, 48 * u, 90 * u);
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 8; j++) {
            let blcColor = board[i][j] !== "" ? board[i][j] : "grey";
            drawBox(j, i, blcColor);
        }
    }
}

let drawShape = (shape, x, y, rot) => {
    let arr = shape.pattern[rot](x, y);
    arr.forEach(e => drawBox(e.x, e.y, shape.color));
}

let randomInt = (a, b) => {
    return Math.floor(Math.random() * 0.999 * (b - a)) + a;
}

let makeNext = () => {
    let x = randomInt(0, 8);
    let shape = randomInt(0, 7);
    let rot = randomInt(0, 4);
    next = {
        shape: shapes[shape],
        rot: rot,
        x: x,
        y: -1,
    };
    let posnArr = next.shape.pattern[next.rot](next.x, next.y);

    for (let i = 0; i < posnArr.length; i++) {
        if (posnArr[i].x < 0) next.x++;
        else if (posnArr[i].x >= 8) next.x--;
        posnArr = next.shape.pattern[next.rot](next.x, next.y);

    }
}


let update = () => {
    if (current === null) {
        current = next;
        makeNext();
    }
    let posnArr = current.shape.pattern[current.rot](current.x, current.y);
    let canMove = true;
    posnArr.forEach(bx => {
        let xx = bx.x;
        let yy = bx.y + 1;
        if (yy <= 0) return;
        if (yy >= 15 || board[yy][xx] !== "") canMove = false;
    });
    if (canMove)
        current.y++;
    else {
        posnArr.forEach(bx => {
            if (bx.y < 0) {
                gameOver();
                return;
            }
            board[bx.y][bx.x] = current.shape.color
        });
        clearBoard();
        current = null;
    }
}
let move = dxn => {
    let posnArr = current.shape.pattern[current.rot](current.x, current.y);
    let canMove = true;
    posnArr.forEach(bx => {
        let xx = bx.x + dxn;
        let yy = bx.y;
        if (xx < 0 || xx >= 8) canMove = false;
        else if (board[yy][xx] !== "") canMove = false;
    });
    if (canMove) current.x += dxn;
}

let rotate = () => {
    let posnArr = current.shape.pattern[(current.rot + 1) % 4](current.x, current.y);
    let canMove = true;
    posnArr.forEach(bx => {
        let xx = bx.x;
        let yy = bx.y;
        if (xx < 0 || xx >= 8) canMove = false;
        else if (yy >= 15) canMove = false;
        else if (board[yy][xx] !== "") canMove = false;
    });
    if (canMove) current.rot = (current.rot + 1) % 4;
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            move(-1);
            break;
        case 'ArrowRight':
            move(1);
            break;
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowDown':
            console.log("down");
            update();
            break;
    }
});

let clearBoard = () => {
    for (let y = 14; y >= 0; y--) {
        let x = 0
        for (; x < 8; x++)
            if (board[y][x] !== "") break;
        if (x === 8) {
            for (x = 0; x < 8; x++) {
                if (y == 0) board[y][x] = "";
                else [board[y][x], board[y - 1][x]] = [board[y - 1][x], board[y][x]];
            }
        }
    }
    for (let y = 0; y < 15; y++) {
        let x = 0;
        for (; x < 8; x++)
            if (board[y][x] === "") break;
        if (x === 8) {
            for (x = 0; x < 8; x++) board[y][x] = "";
            score += 10;
        }
    }
}

let gameOver = () => {
    play = false;
    c.font = "50px Verdana";
    c.fillStyle = "black";
    c.fillText("Game over", u * 6, u * 6 * 7, );

}

// drawBoard();
// let ob = shapes[0].pattern(1, 1);
// console.log(ob);


function init() {
    board = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ];
    current = null;
    makeNext();
    play = true;
    score = 0;
    gamePlay();
}

let gamePlay = () => {
    if (!play) return;
    c.clearRect(0, 0, 48 * u, 90 * u);
    drawBoard();

    if (current) {
        drawShape(current.shape, current.x, current.y, current.rot);
    }
    // console.log(current);
    clearBoard();
    // supports level upto 6 till now
    if (requestAnimationFrame(gamePlay) % (60 / level) !== 0) return;
    update();

}

init();