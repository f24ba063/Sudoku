export class Hint{
    static HintFlag(isHintOn, hint, GameState, divMap){
        if (isHintOn) {
            hint.textContent = "ヒント: On";
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    let hit = (GameState.answer[r][c] === GameState.current[r][c]);
                    let blank = !GameState.current[r][c];
                    if (!hit && !blank) {
                        divMap[r][c].classList.add("failure");
                    }
                }
            }
        } else {
            hint.textContent = "ヒント: Off";
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    divMap[r][c].classList.remove("failure");
                }
            }
        }
    
    }
}