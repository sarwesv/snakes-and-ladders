export const BOARD_SIZE = 100;
export const BOARD_COLS = 10;
export const BOARD_ROWS = 10;
export const SQUARE_SIZE = 1;

export const SNAKES_AND_LADDERS = {
  snakes: [
    { start: 16, end: 6 },
    { start: 47, end: 26 },
    { start: 49, end: 11 },
    { start: 56, end: 53 },
    { start: 62, end: 19 },
    { start: 87, end: 24 },
    { start: 93, end: 73 },
    { start: 95, end: 75 },
  ],
  ladders: [
    { start: 1, end: 38 },
    { start: 4, end: 14 },
    { start: 9, end: 31 },
    { start: 21, end: 42 },
    { start: 28, end: 84 },
    { start: 51, end: 67 },
    { start: 72, end: 91 },
    { start: 80, end: 99 },
  ],
};

export const PLAYER_COLORS = [
  '#D84315', // Rust Orange
  '#558B2F', // Sage Green
  '#F9A825', // Mustard Yellow
  '#3D5A80', // Dusty Blue
];

export const COLOR_NAMES = ['Orange', 'Green', 'Yellow', 'Blue'];
