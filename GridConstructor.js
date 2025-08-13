//9x9のグリッドを作成し、cubeクラスを付与するクラス

export class GridConstructor{
    constructor (){}

    static createCube(row, col){
        const div = document.createElement("div");
        div.classList.add("cube");
        div.dataset.row = row;
        div.dataset.col = col;
        if(row % 3 === 0) div.style.borderTop = "3px solid black";
        if(row === 8) div.style.borderBottom = "3px solid black";
        if(col % 3 === 0) div.style.borderLeft = "3px solid black";
        if(col === 8) div.style.borderRight = "3px solid black";
        
        //マス目をクリックしたとき、そのマス目が黄色く光る
        div.addEventListener('click', () => {
            const cubes = document.querySelectorAll(".cube");
            cubes.forEach((e) => {
                e.classList.remove("selected");
            })
        });
        return div;
    }
    static gridConstruction(){
        const divMap = [];
        const frg = document.createDocumentFragment();

        for(let row = 0; row < 9; row++){
            divMap[row] = [];
            for(let col = 0; col < 9; col++){
                const cube = GridConstructor.createCube(row, col);
                divMap[row][col] = cube;

                frg.appendChild(cube);
            }
        }
        return {frg: frg, divMap: divMap};
    }

}