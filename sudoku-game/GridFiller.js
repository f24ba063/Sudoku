export class GridFiller{
    //配列内容を、htmlの<div>群にコピー
    static gridFill(cu, arr){
        cu.forEach((e, index) => {
            e.classList.remove("statics");
            const row = Math.floor(index / 9);
            const col = index % 9;
            const val = arr[row][col];
            e.textContent = val === 0 ? "" : val;
            if(val != 0) {
                e.classList.add("statics");
            }else {
                e.classList.remove("statics");
            }
        });
    }
}