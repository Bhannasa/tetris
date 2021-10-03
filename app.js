let canvas = document.querySelector('#main-board');
let canvasNext=document.getElementById('next');
let u = innerHeight / 100;
// u/=2;
canvas.height = 90 * u;
canvas.width = 48 * u;
canvasNext.height = 30 * u;
canvasNext.width = 30 * u;
let c = canvas.getContext('2d');
let cn=canvasNext.getContext('2d');

let drawBox = (j, i, color,cnv) => {
    cnv.fillStyle = color;
    cnv.fillRect(j * 6 * u, i * 6 * u, 6 * u, 6 * u);
    cnv.strokeStyle=color===boardColor?"white":color; // style 1
    cnv.strokeStyle="white";                          // style 2
    cnv.strokeRect(j * 6 * u, i * 6 * u, 6 * u, 6 * u);
}

let drawBoard = (cnv) => {
    cnv.fillRect(0, 0, 48 * u, 90 * u);
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 8; j++) {
            let blcColor = board[i][j] !== "" ? board[i][j] : boardColor;
            drawBox(j, i, blcColor,cnv);
        }
    }
}

let drawShape = (shape, x, y, rot,cnv) => {
    let arr = shape.pattern[rot](x, y);
    arr.forEach(e => drawBox(e.x, e.y, shape.color,cnv));
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
        current=next;
        makeNext();
    }
}
let move = dxn => {
    let posnArr = current.shape.pattern[current.rot](current.x, current.y);
    let canMove = true;
    posnArr.forEach(bx => {
        let xx = bx.x + dxn;
        let yy = bx.y;
        if (xx < 0 || xx >= 8) canMove = false;
        else if (yy>=0&&board[yy][xx] !== "") canMove = false;
    });
    if (canMove) current.x += dxn;
}

let rotate = (add=0) => {
    let posnArr = current.shape.pattern[(current.rot + 1) % 4](current.x, current.y);
    let canMove = true;
    posnArr.forEach(bx => {
        let xx = bx.x+add;
        let yy = bx.y;
        if (xx < 0 || xx >= 8){
            canMove = false;
        } 
        else if (yy >= 15) canMove = false;
        else if (yy>=0&&board[yy][xx] !== "") canMove = false;
    });
    if (canMove){
        current.x+=add;
        current.rot = (current.rot + 1) % 4;
        return true;
    } 
    if(add===0&&(rotate(1)||rotate(-1)||rotate(2)||rotate(-2)))   return true;
    return false;
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
            incScore(0.1);
            update();
            break;
        case ' ':
            isGameOver?init():play=!play;
            console.log(isGameOver,play);
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
            incScore(50);
        }
    }
}

let gameOver = () => {
    isGameOver=true;
    document.querySelector('.gameover').style.display="block"
    play = false;
    // c.font = "50px Verdana";
    // c.fillStyle = "black";
    // c.fillText("Game over", u * 6, u * 6 * 7, );

}

// drawBoard();
// let ob = shapes[0].pattern(1, 1);
// console.log(ob);
let incScore=(inc)=>{
    if(!play)   return;
    score+=inc;
    if(score>=hiScore){  
        hiScore=parseInt(score)
        localStorage.setItem("hiScore",hiScore);
    }
    document.getElementById('score').innerText=parseInt(score);
    document.getElementById('high-score').innerText=parseInt(hiScore);
    if(score>1&&(parseInt(score/200)==level)){
        level++;
        document.getElementById('level').innerText=level;
    } 
}

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
    makeNext();
    current = next;
    makeNext();
    level=1;
    document.getElementById('level').innerText=level;
    document.querySelector('.gameover').style.display="none";
    isGameOver=false;
    play = true;
    incScore(-score);
    gamePlay(c);
}

let gamePlay = () => {
    if (isGameOver) return;
    if(!play){
        requestAnimationFrame(gamePlay);
        return;
    }
    c.clearRect(0, 0, 48 * u, 90 * u);
    cn.clearRect(0, 0, 48 * u, 90 * u);
    drawBoard(c);

    if (current) {
        drawShape(current.shape, current.x, current.y, current.rot,c);
    }
    if(next){
        drawShape(next.shape, 2, 3, next.rot,cn);  // here replace next.rot with 0 to see the first rotation only in next
    }
    // console.log(current);
    clearBoard();
    // supports level upto 6 till now
    if (requestAnimationFrame(gamePlay) % (60 / level) !== 0) return;
    update();

}
init();