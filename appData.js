let level = 1;
let current;
let next;
let board;
let play;
let score;
let shapes = [{
        name: "L",
        color: "purple",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y - 2 },
                ]
            },
            3: (x, y) => {
                return [
                    { x: x + 1, y: y },
                    { x: x, y: y },
                    { x: x - 1, y: y },
                    { x: x + 1, y: y - 1 }
                ]
            },
        }
    },
    {
        name: "Line",
        color: "blue",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y },
                    { x: x + 2, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 3 },
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                ]
            },
            2: (x, y) => {
                return [
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y },
                    { x: x + 2, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 3 },
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                ]
            },
        }
    },
    {
        name: "Square",
        color: "red",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
        }
    },
    {
        name: "Inverted L",
        color: "indigo",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y - 2 }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x + 1, y: y },
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 }
                ]
            },
        }
    },
    {
        name: "T",
        color: "yellow",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x - 1, y: y },
                    { x: x, y: y },
                    { x: x + 1, y: y },
                    { x: x, y: y - 1 }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y }
                ]
            },
        }
    },
    {
        name: "Z",
        color: "cyan",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x - 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x + 1, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x - 1, y: y - 1 },
                    { x: x - 1, y: y }
                ]
            },
        }
    },
    {
        name: "S",
        color: "lightBlue",
        pattern: {
            0: (x, y) => {
                return [
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y }
                ]
            },
            1: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x + 1, y: y }
                ]
            },
            2: (x, y) => {
                return [
                    { x: x + 1, y: y - 1 },
                    { x: x, y: y - 1 },
                    { x: x, y: y },
                    { x: x - 1, y: y }
                ]
            },
            3: (x, y) => {
                return [
                    { x: x, y: y - 2 },
                    { x: x, y: y - 1 },
                    { x: x + 1, y: y - 1 },
                    { x: x + 1, y: y }
                ]
            },
        }
    },
];