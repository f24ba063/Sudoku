export class CubeLightUp{
    static cubeLightUpByCoords(row, col, divMap){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                divMap[i][j].classList.remove("besides-selected", "selected");
            }
        }
            
        const rowSpan = Math.floor(row / 3) * 3;
        const colSpan = Math.floor(col / 3) * 3;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                divMap[rowSpan + i][colSpan + j].classList.add("besides-selected");
            }
        }

        for(let line = 0; line < 9; line++){
            divMap[row][line].classList.add("besides-selected");
            divMap[line][col].classList.add("besides-selected");
        }

        divMap[row][col].classList.add("selected");
        return { row, col, element: divMap[row][col]};
    }

    static cubeLightUp(e, divMap){
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        return CubeLightUp.cubeLightUpByCoords(row, col, divMap);
    }
}