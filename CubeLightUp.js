export class CubeLightUp{
    static cubeLightUp(e, divMap){
        divMap.flat().forEach(div => 
            div.classList.remove("besides-selected"));
            
        const rowSpan = Math.floor(Number(e.target.dataset.row) / 3) * 3;
        const colSpan = Math.floor(Number(e.target.dataset.col) / 3) * 3;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                divMap[rowSpan + i][colSpan + j].classList.add("besides-selected");
            }
        }

        const selectedCellNumber = e.target;
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        const point = {row: row, col: col, number: selectedCellNumber};

        for(let line = 0; line < 9; line++){
            divMap[row][line].classList.add("besides-selected");
            divMap[line][col].classList.add("besides-selected");
        }
        if(e.target.classList.contains("cube")){
            document.querySelectorAll(".cube").forEach(c => 
                c.classList.remove("selected"));
            e.target.classList.add("selected");
        }
        
        return point
    }
}