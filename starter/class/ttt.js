const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("t", "test command (remove)", TTT.testCommand);

    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {
    const horizontalWin = this.checkHorizontalWin(grid);

    if (horizontalWin) {
      return horizontalWin;
    }
    const verticalWin = this.checkVerticalWin(grid);

    if (verticalWin) {
      return verticalWin;
    }

    const mainDiagonalWin = this.checkDiagonalWin(grid);

    if (mainDiagonalWin) {
      return mainDiagonalWin;
    }

    const antiDiagonalWin = this.checkAntiDiagonalWin(grid);

    if (antiDiagonalWin) {
      return antiDiagonalWin;
    }

    const tie = this.isTie(grid);
    if (tie) {
      return "T";
    }

    return false;
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
  }

  static checkHorizontalWin(grid) {
    for (const row of grid) {
      const isWin = row.every((cell) => cell === row[0] && cell !== " ");

      if (isWin) {
        return row[0];
      }
    }

    return false;
  }

  static checkVerticalWin(grid) {
    for (let i = 0; i < grid[0].length; i++) {
      const isWin = grid.every(
        (row) => row[i] === grid[0][i] && grid[0][i] !== " "
      );

      if (isWin) {
        return grid[0][i];
      }
    }
    return false;
  }

  static checkDiagonalWin(grid) {
    const size = grid.length;
    const firstCell = grid[0][0];
    if (firstCell === " ") return false;

    for (let i = 1; i < size; i++) {
      if (grid[i][i] !== firstCell) return false;
    }
    return firstCell;
  }

  static checkAntiDiagonalWin(grid) {
    const size = grid.length;
    const firstCell = grid[0][size - 1];
    if (firstCell === " ") return false;

    for (let i = 1; i < size; i++) {
      if (grid[i][size - 1 - i] !== firstCell) return false;
    }
    return firstCell;
  }

  static isTie(grid) {
    return grid.every((row) => row.every((cell) => cell !== " "));
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = TTT;
