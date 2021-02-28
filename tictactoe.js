//setup
var player1 = true
var draw = false
var sound = document.querySelector("audio")
var grid = document.querySelector(".grid")
var gridItems = document.querySelectorAll(".grid-item")
for(item of gridItems){
    item.addEventListener("click", function(){
        gridClicked(this)
    })
}
var endMenu = document.querySelector(".end")
var endText = document.querySelector(".end-text")
localStorage.setItem("count", 0)

function gridClicked(gridItem){
    if(gridItem.innerHTML == ""){
        if(player1){
            gridItem.innerHTML = "X"
            gridItem.style.color = "rgb(100, 100, 100)"
            player1 = false

        }
        else{
            gridItem.innerHTML = "O"
            gridItem.style.color = "rgb(65, 65, 65)"
            player1 = true
        }
        sound.play()
        if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            gridItem.style.fontSize = "4rem"
        }
        else{
            gridItem.style.fontSize = "10rem"
        }
        gridItem.style.transition = "font-size 0.2s"

        var count = localStorage.getItem("count") 
        localStorage.setItem("count", ++count)
        
        row = gridItem.id.charAt(1)
        column = gridItem.id.charAt(0)
        console.log("ID: " + row + ", " + column)
        array = generateGrid()
        checkIfWon(row,column,array)

    }

}

function generateGrid(){
    array = []
    for (let i = 0; i < 3; i++){
        temp = []
        for (let x = 0; x < 3; x++){
            temp.push(document.getElementById(x+""+i).innerHTML)
        }
        array.push(temp)
    }
    console.log("ARRAY:")
    console.log(array)
    return array
}

function checkIfWon(row,column,array){
    rowCheck = true
    columnCheck = true
    diagonalCheck = true

    //console.log("Row: " + row + " Column: " + column)
    //check if all items in row are the same
    for (let i = 0; i < array.length-1; i++){
        if(array[row][i] != array[row][i+1]){
            rowCheck = false
            break
        }
    }

    if (rowCheck == true){
        //console.log("row win")
        grid.style.pointerEvents = "none"
        end()
        return
    }

    //check if all items in column are the same
    temp = []
    for (let i = 0; i < array.length; i++){
        temp.push(array[i][column])
    }
    for (let i = 0; i < temp.length-1; i++){
        if(array[i][column] != array[i+1][column]){
            columnCheck = false
            break
        }
    }
    
    if (columnCheck == true){
        //console.log("column win")
        grid.style.pointerEvents = "none"
        end()
        return
    }

    //check diagonals
    for (let i = 0; i < array.length - 1; i++){
        if (array[i][i] != array[i+1][i+1] || array[i][i] == ""){
            diagonalCheck = false
            break
        }
    }

    if (diagonalCheck == true){
        //console.log("left diag win")
        grid.style.pointerEvents = "none"
        end()
        return
    }

    diagonalCheck=true

    //check diagonals
    ptr = array.length - 1
    for (let i = 0; i < array.length - 1; i++){
        if (array[i][ptr] != array[i+1][ptr-1] || array[i][ptr] == ""){
            diagonalCheck = false
            break
        }
        ptr -= 1
    }
    if (diagonalCheck == true){
        //console.log("right diag win")
        grid.style.pointerEvents = "none"
        end()
        return
    }

    //check for draw
    if(localStorage.getItem("count") == 9){
        grid.style.pointerEvents = "none"
        //console.log("DRaw")
        draw = true
        end()
    }


}
function end(){
    var text = ""
    if (draw == true){
        text="Draw"
    }
    else{
        if (player1){
            text = "Player 2 Wins"
        }
        else{
            text = "Player 1 Wins"
        }
    }
    endText.innerHTML = text
    endMenu.style.visibility = "visible"
    endMenu.style.transform = "scale(1)"
    endMenu.style.transition = "all 1s"
}

function resetGrid(){
    player1 = true
    draw = false
    localStorage.setItem("count", 0)
    endMenu.style.transform = "scale(0)"
    endMenu.style.transition = "all 0.25s"
    for (let i = 0; i < array.length; i++){
        for (let x = 0; x < array.length; x++){
            id = i+""+x
            document.getElementById(id).innerHTML = ""
            document.getElementById(id).style.fontSize = "0rem"
            document.getElementById(id).style.transition = "font-size 0.2s"
        }
    }
    grid.style.pointerEvents = "all"
}