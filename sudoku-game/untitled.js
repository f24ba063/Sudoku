document.addEventListener("DOMContentLoaded", ()=> {
    Untitled.a_1(() => Untitled.a_2());
    Untitled.a_1(Untitled.a_3);
    const s= ()=>{return "HI"};
    console.log(s());
});

class Untitled{
    static a_1(callback){
        console.log("前準備");
        callback();
        console.log("後します");
        
    }

    static a_2(){
        console.log("a_2です。");
    }
    static a_3(){
        console.log("a_3です。");
    }
    
}