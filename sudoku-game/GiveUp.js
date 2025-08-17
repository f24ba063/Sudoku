export class GiveUp {
    static giveUp(GameState, divMap){
        for(let i =0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                GameState.current[i][j] = GameState.answer[i][j];
                divMap[i][j].textContent = GameState.answer[i][j];
            }
        }
    }
}