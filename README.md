# TicTacToe

## Simple rich model - Game

A logic implementation for a tic tac toe game

```ts

const game = new TicTacToeModel({ currentTurn: 'X' })
	.fillPosition('A1', 'O').printMatrix()
	.fillPosition('A2', 'X').printMatrix()
	.fillPosition('B2', 'O').printMatrix()
	.fillPosition('B3', 'X').printMatrix()
	.fillPosition('C3', 'O').printMatrix();

>`
[O][ ][ ]
[ ][ ][ ]
[ ][ ][ ]
`

>`
[O][ ][ ]
[X][ ][ ]
[ ][ ][ ]
`

>`
[O][ ][ ]
[X][O][ ]
[ ][ ][ ]
`

>`
[O][ ][ ]
[X][O][ ]
[ ][X][ ]
`

>`
[O][ ][ ]
[X][O][ ]
[ ][X][O]
`

const result = game.getGameResult();

console.log(result);

>`
{ 
	xWon: false, 
	oWon: true, 
	positions: [ 'A1', 'B2', 'C3' ] 
}
`


```
