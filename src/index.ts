import { resolve } from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type Board = number[][];

const printBoard = (board: Board): void => {
  board.forEach((row) => {
    console.log(row.map((cell) => cell.toString()).join(' '));
  });
  console.log();
};

const findEmptySpace = (board: Board): [number, number] => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

const move = (board: Board, direction: string): Board => {
  let [row, col] = findEmptySpace(board);
  switch (direction) {
    case 'up':
      if (row > 0) {
        [board[row][col], board[row - 1][col]] = [
          board[row - 1][col],
          board[row][col],
        ];
      }
      break;
    case 'down':
      if (row < board.length - 1) {
        [board[row][col], board[row + 1][col]] = [
          board[row + 1][col],
          board[row][col],
        ];
      }
      break;
    case 'left':
      if (col > 0) {
        [board[row][col], board[row][col - 1]] = [
          board[row][col - 1],
          board[row][col],
        ];
      }
      break;
    case 'right':
      if (col < board[row].length - 1) {
        [board[row][col], board[row][col + 1]] = [
          board[row][col + 1],
          board[row][col],
        ];
      }
      break;
    default:
      console.log('Invalid move. Please try again.');
  }
  return board;
};

const isSolved = (board: Board): boolean => {
  const target: Board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  return JSON.stringify(board) === JSON.stringify(target);
};

const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const main = async (): Promise<void> => {
  let board: Board = [
    [1, 2, 3],
    [4, 0, 6],    [7, 5, 8],
  ];

  while (!isSolved(board)) {
    printBoard(board);
    console.log('Menu:');
    console.log('1. Move up');
    console.log('2. Move down');
    console.log('3. Move left');
    console.log('4. Move right');
    console.log('5. Quit');

    const choice: string = await askQuestion('Choose an action (1-5): ');
    switch (choice) {
      case '1':
        move(board, 'up');
        break;
      case '2':
        move(board, 'down');
        break;
      case '3':
        move(board, 'left');
        break;
      case '4':
        move(board, 'right');
        break;
      case '5':
        console.log('Quitting the game. Thank you for playing!');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 5.');
    }
  }

  if (isSolved(board)) {
    printBoard(board);
    console.log("Congratulations! You've solved the puzzle.");
  }
  rl.close();
};

main().catch((err) => {
  console.error(err);
  rl.close();
});
