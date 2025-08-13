import { BoardNumberValidation } from './BoardNumberValidation.js';

export class ProblemGenerator{
    constructor(){}

    //難易度ごとに消すマスの数を決定する
    static generateProblem(problemBoard, difficulty){
        
        let eraseCount;
        switch(difficulty){
            case "easy" :   eraseCount = 35;break;
            case "normal" : eraseCount = 45;break;
            case "hard" :   eraseCount = 55;break;
            case "extreme" :   eraseCount = 65;break;
        }

        problemBoard = this.removeNumbers(problemBoard, eraseCount);
        return problemBoard;
    }

    //所定の数だけ数字を消し、穴を開ける処理
    static removeNumbers(problemBoard, totalErase){
        let solvationRoute = {counter: 0};
        let resultBoard = null;

        const MAX_TRY = 1000;
        for (let tryCount = 0; tryCount < MAX_TRY; tryCount++) {
            let deepCopy = JSON.parse(JSON.stringify(problemBoard));
            let deleteNow = 0;//何枚を「０」にしたかの数
            const deleteUnit = 5;
            let checkTiming = deleteUnit;//5枚ずつ抜いてゆき、最終的に目的の数まで抜く計画

            while(checkTiming <= totalErase){
                let copyBeforeDelete = JSON.parse(JSON.stringify(deepCopy))
                
                let erased = 0;
                while(erased < deleteUnit){
                    const row = Math.floor(Math.random() * 9);
                    const col = Math.floor(Math.random() * 9);
                    if(deepCopy[row][col] !== 0){
                        deepCopy[row][col] = 0;
                        deleteNow++;
                        erased++;
                    }
                }
                //解答数のチェック
                solvationRoute.counter = 0;
                this.countAnswer(deepCopy, solvationRoute);
                console.log(`Try: ${tryCount + 1}, 解の数: ${solvationRoute.counter}`);
                
                if(solvationRoute.counter != 1){
                    deleteNow -= deleteUnit; //マスの消した数を差し戻し、
                    deepCopy = JSON.parse(JSON.stringify(copyBeforeDelete));//数字配置も戻す
                    continue;
                }
                checkTiming += deleteUnit;
            }
            resultBoard =JSON.parse(JSON.stringify(deepCopy));
            return deepCopy;
        }
    
 
        console.warn("一意解の生成に失敗。元の盤面を返します。");
        return problemBoard;
       
    }

    //問題の正解の一意性の調査
    // static countAnswer(board, solvationRoute){
    //     if(solvationRoute.counter > 1)return;

    //     for(let row = 0; row < 9; row++){
    //         for(let col = 0; col < 9; col++){
    //             if(board[row][col] == 0){
    //                 for(let num = 1; num <= 9; num++){
    //                     if(BoardNumberValidation.validateNumber(board, row, col, num)){
    //                         board[row][col] = num;
    //                         this.countAnswer(board, solvationRoute);
    //                         board[row][col] = 0;

    //                         if(solvationRoute.counter >1)return;
    //                     }
    //                 }
    //                 //ここにたどり着くのは、１～９どの数字でもvalidateNumberに矛盾が発生するとき
    //                 return;
    //             }
    //         }
    //     }
    //     solvationRoute.counter++;
    // }

    static countAnswer(board, solvationRoute) {
        if (solvationRoute.counter > 1) return;
    
        let minCandidates = 10;
        let targetRow = -1;
        let targetCol = -1;
        let candidates = [];
    
        // 候補数が最小のマスを探す
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    let possible = [];
                    for (let num = 1; num <= 9; num++) {
                        if (BoardNumberValidation.validateNumber(board, row, col, num)) {
                            possible.push(num);
                        }
                    }
                    if (possible.length < minCandidates) {
                        minCandidates = possible.length;
                        targetRow = row;
                        targetCol = col;
                        candidates = possible;
                        if (minCandidates === 1) break; // 最小は1なので即決
                    }
                }
            }
            if (minCandidates === 1) break;
        }
    
        // 空きマスがない＝解答完成
        if (targetRow === -1) {
            solvationRoute.counter++;
            return;
        }
    
        // 候補を順に試す
        for (let num of candidates) {
            board[targetRow][targetCol] = num;
            this.countAnswer(board, solvationRoute);
            board[targetRow][targetCol] = 0;
            if (solvationRoute.counter > 1) return;
        }
    }
}