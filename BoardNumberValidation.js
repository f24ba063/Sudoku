
export class BoardNumberValidation {
    constructor(){}

    static constructBoard(){
        let board = Array.from({length: 9}, () => Array(9).fill(0));
        const solved = this.solveSudoku(board);
        return solved;
    }
    //ランダムな配列を生成、投げ返す
    static shuffleArray(arr){
        for(let i = arr.length-1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    //縦・横・3x3に同じ数字がないかチェック。あったらルール違反なので差し戻し
    static validateNumber(board, row, col, num){
        for(let i = 0; i < 9; i++){
            if(board[row][i] === num || board[i][col] === num){
                return false;
            }
        }

        const rowStart = Math.floor(row / 3) * 3;
        const colStart = Math.floor(col / 3) * 3;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[rowStart + i][colStart + j] === num){
                    return false;
                }
            }
        }
        return true;
    }

    //0の入ったセルがあったらその添字を返す。
    static findEmptyCell(board){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j <9; j++){
                if(board[i][j] === 0){
                    return [i, j];
                }
            }
        }
        return null;
    }

    //隙間を埋めて、数独の問題としてルール違反していないかチェック
    //内容がすべて埋まったら正解用紙として返す
    static solveSudoku(board){
        const empty = this.findEmptyCell(board);
        //空いてるマスがなかったらそのまま返す
        if(!empty) 
            return board;
        

        const [row, col] = empty;
        const shuffleNum = this.shuffleArray([1,2,3,4,5,6,7,8,9]);

        for(let num of shuffleNum){
            if(this.validateNumber(board, row, col, num)){
                board[row][col] = num;
                if(this.solveSudoku(board)) return board;
                board[row][col] = 0;
            }
        }
        return false;
    }


}