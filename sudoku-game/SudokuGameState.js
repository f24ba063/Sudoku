export class SudokuGameState{
    constructor(){
        this.answer = null;
        this.problem = null;
        this.current = null;
    }

    set(answer, problem){
        this.answer = answer;
        this.problem = problem;
        this.current = JSON.parse(JSON.stringify(problem));
    }
    isCorrect(row, col, value){
        return this.answer[row][col] === value;
    }
}