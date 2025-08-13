import { GridConstructor } from './GridConstructor.js';
import { CreateInputPanel } from './CreateInputPanel.js';
import { BoardNumberValidation } from './BoardNumberValidation.js';
import { GridFiller } from './GridFiller.js';
import { ProblemGenerator } from './ProblemGenerator.js';
import { CubeLightUp } from './CubeLightUp.js';
import { SudokuGameState } from './SudokuGameState.js';
import { Hint } from './Hint.js';
import { GiveUp } from './GiveUp.js';

const game = document.getElementById("game");
const numberPanel = document.getElementById("number-panel");//数値入力用パネル
let GameState = new SudokuGameState(null,null);
let divMap = null;
let hint = document.getElementById("toggle-hint");
let giveUp = document.getElementById("give-up");

document.addEventListener("DOMContentLoaded", ()=> {
    //9x9マスのゲームフィールドを作成
    //divMapは数値を入力する<div>を二次元配列に対応させたもの
    const { frg, divMap: map }= GridConstructor.gridConstruction();
    divMap = map;
    game.appendChild(frg);

    //数字入力用のプレートの作成と隠ぺい
    const CIP = new CreateInputPanel();
    numberPanel.appendChild(CIP.createInputPanel());
    numberPanel.classList.add("hidden");

    //難易度設定ボタン(更新後)
    document.getElementById("diff").addEventListener('click',(e) =>{
        const difficulty = e.target.dataset.diff;
        if(difficulty === 'easy')console.log("簡単");
        if(difficulty === 'normal')console.log("普通");
        if(difficulty === 'hard')console.log("難しい");
        
        // 消す
        const start = performance.now();
        // 消す

        const answerBoard = BoardNumberValidation.constructBoard();

        let problemBoard = JSON.parse(JSON.stringify(answerBoard));
        const cu = document.querySelectorAll(".cube");

        problemBoard = ProblemGenerator.generateProblem(problemBoard, difficulty);
        GridFiller.gridFill(cu,problemBoard);
        GameState.set(answerBoard, problemBoard);

        const end = performance.now();
        console.log(`処理時間： ${(end - start) / 1000} 秒`);
    });

    //マス上でクリックするとそのマスが黄色く光り、
    //周囲3x3マスと縦1列、横1列が水色に光る
    //また数値入力ボタン押下時に入力されるマスのアドレスも獲得される
    let selectedCellPoint = null;
    game.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cube")) return;
        if (e.target.classList.contains("statics")) return;
        //tgtPointは問題シート中で現在クリックされているマス
        selectedCellPoint = CubeLightUp.cubeLightUp(e, divMap);

        numberPanel.classList.toggle("visible");
        const top = e.clientY;
        const left = e.clientX;
        numberPanel.style.top = (top + 5) +"px";
        numberPanel.style.left = (left + 5) +"px";

    });

    numberPanel.addEventListener("click", (e) => {
        if (!e.target.matches("button")) return;
        if (!selectedCellPoint) return; // 選択マスがないなら無視

        const number = e.target.value;  // 押された数字
        const { row, col } = selectedCellPoint;

        // divMap[row][col] に数字表示などの処理
        divMap[row][col].textContent = number === "x" ? "" : number;

        // もし盤面のデータ構造もあれば更新
        GameState.current[row][col] = number === "x" ? "" : number;
        
        let hit = (Number(GameState.answer[row][col]) === Number(GameState.current[row][col]));
        let blank = !GameState.current[row][col];
        if(game.classList.contains('hint') && !hit && !blank){
            divMap[row][col].classList.add("failure");
        }else{
            divMap[row][col].classList.remove("failure");
        }

        numberPanel.classList.toggle("visible");

        // 例えばここでselectedCellPointをクリアしてもよい
        selectedCellPoint = null;

        if (JSON.stringify(GameState.current) === JSON.stringify(GameState.answer)) {
            alert("クリア！");
        }
    });

    hint.addEventListener('click', () =>{
        game.classList.toggle('hint');
        const isHintOn = game.classList.contains('hint');

        Hint.HintFlag(isHintOn, hint, GameState, divMap);
    });

    giveUp.addEventListener('click', () => {
        GiveUp.giveUp(GameState, divMap);
    });
});

