export class CreateInputPanel {
    constructor(){}
    //入力用の電卓作成
    createInputPanel () {
        const div = document.createElement("div");
        const buttons = [...Array(9).keys()].map(c => c + 1).concat("x");
        buttons.forEach( c => {
            const btn = document.createElement("button");
            btn.value=c;
            btn.textContent=c;
            div.appendChild(btn);
        });
        return div;
    }
}