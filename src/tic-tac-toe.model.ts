import {
	IMatrix,
	IPosition,
	IResult,
	IRules,
	ISymbol,
	ITicTacToeModel,
	IMarkSymbol
} from "./types/index.interface";

export class TicTacToeModel implements ITicTacToeModel {
	#A1: ISymbol;
	#A2: ISymbol;
	#A3: ISymbol;
	#B1: ISymbol;
	#B2: ISymbol;
	#B3: ISymbol;
	#C1: ISymbol;
	#C2: ISymbol;
	#C3: ISymbol;
	#CurrentPlayer: IMarkSymbol;

	#wonRules: IRules = [
		['A1', 'A2', 'A3'],
		['A1', 'B2', 'C3'],
		['C1', 'B2', 'A3'],
		['A1', 'B1', 'C1'],
		['A2', 'B2', 'C2'],
		['A3', 'B3', 'C3'],
		['B1', 'B2', 'B3'],
		['C1', 'C2', 'C3']
	]

	constructor(props?: { matrix?: Partial<IMatrix>, currentTurn?: IMarkSymbol}) {

		const randomSymbol = (): IMarkSymbol => {
			const isPair = Math.trunc(Math.random() * 100) % 2 === 0;
			return isPair ? 'O' : 'X';
		}

		this.#A1 = props?.matrix?.A1 ?? ' ';
		this.#A2 = props?.matrix?.A2 ?? ' ';
		this.#A3 = props?.matrix?.A3 ?? ' ';
		this.#B1 = props?.matrix?.B1 ?? ' ';
		this.#B2 = props?.matrix?.B2 ?? ' ';
		this.#B3 = props?.matrix?.B3 ?? ' ';
		this.#C1 = props?.matrix?.C1 ?? ' ';
		this.#C2 = props?.matrix?.C2 ?? ' ';
		this.#C3 = props?.matrix?.C3 ?? ' ';
		this.#CurrentPlayer = props?.currentTurn ?? randomSymbol();
	}

	get matrix(): IMatrix {
		return this.getMatrix();
	}

	getMatrix(): IMatrix {
		return {
			A1: this.#A1,
			A2: this.#A2,
			A3: this.#A3,
			B1: this.#B1,
			B2: this.#B2,
			B3: this.#B3,
			C1: this.#C1,
			C2: this.#C2,
			C3: this.#C3,
		}
	}

	get rules(): IRules {
		return this.#wonRules;
	}

	getGameResult(): IResult {

		const matrix = this.getMatrix();
		
		const result: IResult = { 
			xWon: false, 
			oWon: false,
			positions: []
		};

		this.#wonRules.forEach((rules) => {
			const match = { x: 0, o: 0 };

			rules.forEach((rule) => {
				if (matrix[rule] === 'X') match.x = match.x + 1;
				if (matrix[rule] === 'O') match.o = match.o + 1;
			});

			if (match.o === 3 && match.x === 3) {
				throw new Error('X and O cannot win');
			}

			if (match.x === 3) {
				result.positions.push(...rules);
				result.xWon = true;
			}

			if (match.o === 3) {
				result.positions.push(...rules);
				result.oWon = true
			}
		});

		return result;
	}

	get isGameFinished(): boolean {
		return !this.canPlay();
	}

	get currentPlayer(): IMarkSymbol {
		return this.#CurrentPlayer;
	};

	get nextPlayer(): IMarkSymbol {
		return this.getNextSymbolTurn();
	};

	getNextSymbolTurn(): IMarkSymbol {
		return this.#CurrentPlayer === 'O' ? 'X' : 'O';
	}

	canPlay(): boolean {
		const gameResult = this.getGameResult();
		return !gameResult.oWon && !gameResult.xWon;
	}

	fillPosition(position: IPosition, symbol: IMarkSymbol): ITicTacToeModel {

		if (this.isGameFinished) {
			throw new Error("The game is over");
		}

		if (symbol !== this.nextPlayer) {
			throw new Error("Each player takes one turn at a time");
		}

		const isEmpty = this.isEmptyPosition(position);

		if (!isEmpty) {
			throw new Error(`The position ${position} is not empty`);	
		}

		const matrix = this.getMatrix();
		const nextSymbolPlayer = this.getNextSymbolTurn();

		return new TicTacToeModel({
			matrix: { ...matrix, [position]: symbol },
			currentTurn: nextSymbolPlayer
		});
	}

	isEmptyPosition(position: IPosition): boolean {
		return this.matrix[position] === ' ';
	}

	printMatrix(): ITicTacToeModel {
		const matrix = this.matrix;

		console.log(`
			[${matrix.A1}][${matrix.B1}][${matrix.C1}]
			[${matrix.A2}][${matrix.B2}][${matrix.C2}]
			[${matrix.A3}][${matrix.B3}][${matrix.C3}]
		`);

		return this;
	}
}

export default TicTacToeModel;
