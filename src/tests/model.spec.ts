import TicTacToeModel from "../tic-tac-toe.model"

describe('tic-tac-toe.model', () => {
	it('should create a empty matrix model', () => {
		
		const game = new TicTacToeModel();

		expect(game.matrix).toEqual(
			{
				A1: ' ',
				A2: ' ',
				A3: ' ',
				B1: ' ',
				B2: ' ',
				B3: ' ',
				C1: ' ',
				C2: ' ',
				C3: ' ',
			}
		);
	});

	it('should game do not be finished on start', () => {
		const game = new TicTacToeModel();

		expect(game.isGameFinished).toBeFalsy();
	});

	it('should can play', () => {
		const game = new TicTacToeModel();

		expect(game.canPlay()).toBeTruthy();
	});

	it('should fill position with X', () => {
		const game = new TicTacToeModel();

		expect(game.canPlay()).toBeTruthy();
	});

	it('should next turn to be X', () => {
		const game = new TicTacToeModel({ currentTurn: 'X'});

		const nextTurn = game.getNextSymbolTurn();

		expect(nextTurn).toBe('O');
		
		const updatedMatrix = game.fillPosition('A2', 'O');

		expect(updatedMatrix.getNextSymbolTurn()).toBe('X');
	});

	it('should fail if position is not empty', () => {
		const game = new TicTacToeModel({ currentTurn: 'X'});

		expect.assertions(1);
		try {
			game.fillPosition('A1', 'O').fillPosition('A1', 'X');
		} catch (error: any) {
			expect(error.message).toBe('The position A1 is not empty');
		}
	});

	it('should finish the game if player to win', () => {
		const game = new TicTacToeModel({ currentTurn: 'X'})
			.fillPosition('A1', 'O')
			.fillPosition('A2', 'X')
			.fillPosition('B1', 'O')
			.fillPosition('C1', 'X')
			.fillPosition('B2', 'O')
			.fillPosition('C2', 'X')
			.fillPosition('C3', 'O');
		
		game.printMatrix();

		expect(game.isGameFinished).toBeTruthy();
		expect(game.getGameResult()).toEqual({
			oWon: true,
			xWon: false,
			positions: ['A1', 'B2', 'C3']
		});
		
	});

	it('should throws on fill position when game is over', () => {
		const game = new TicTacToeModel({ currentTurn: 'X' })
			.fillPosition('A1', 'O')
			.fillPosition('A2', 'X')
			.fillPosition('B1', 'O')
			.fillPosition('C1', 'X')
			.fillPosition('B2', 'O')
			.fillPosition('C2', 'X')
			.fillPosition('C3', 'O');
	
		game.printMatrix();
		expect.assertions(2);
		try {
			expect(game.isGameFinished).toBeTruthy();
			game.fillPosition('B3', 'X');
		} catch (error: any) {
			expect(error.message).toBe('The game is over');
		}
	});

	it('should simulate a game', () => {
		const game = new TicTacToeModel({ currentTurn: 'X' })
			.fillPosition('A1', 'O').printMatrix()
			.fillPosition('A2', 'X').printMatrix()
			.fillPosition('B2', 'O').printMatrix()
			.fillPosition('B3', 'X').printMatrix()
			.fillPosition('C3', 'O').printMatrix();
		
		console.log(game.getGameResult());
		
		expect(game.isGameFinished).toBeTruthy();
	})
});
