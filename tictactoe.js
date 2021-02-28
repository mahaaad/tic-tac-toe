var player1 = true
var draw = false
localStorage.setItem("count", 0)

function gridClicked(row,column){
    if(document.getElementById(row+column).innerHTML == ""){
        if(player1){
            document.getElementById(row+""+column).innerHTML = "X"
            document.getElementById(row+column).style.color = "rgb(100, 100, 100)"
            player1 = false

        }
        else{
            document.getElementById(row+""+column).innerHTML = "O"
            document.getElementById(row+column).style.color = "rgb(65, 65, 65)"
            player1 = true
        }

        document.getElementById(row+column).style.fontSize = "10rem"
        document.getElementById(row+column).style.transition = "font-size 0.2s"

        var count = localStorage.getItem("count") 
        localStorage.setItem("count", ++count)

    }
    array = generateGrid()
    checkIfWon(row,column,array)
}

function generateGrid(){
    array = []
    for (let i = 0; i < 3; i++){
        temp = []
        for (let x = 0; x < 3; x++){
            temp.push(document.getElementById(i+""+x).innerHTML)
        }
        array.push(temp)
    }
    ////console.log(array)
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
        document.getElementById("grid").style.pointerEvents = "none"
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
        document.getElementById("grid").style.pointerEvents = "none"
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
        document.getElementById("grid").style.pointerEvents = "none"
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
        document.getElementById("grid").style.pointerEvents = "none"
        end()
        return
    }

    //check for draw
    if(localStorage.getItem("count") == 9){
        document.getElementById("grid").style.pointerEvents = "none"
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
    document.getElementById("end-text").innerHTML = text
    document.getElementById("end").style.visibility = "visible"
    document.getElementById("end").style.transform = "scale(1)"
    document.getElementById("end").style.transition = "all 1s"
}

function resetGrid(){
    player1 = true
    draw = false
    localStorage.setItem("count", 0)
    document.getElementById("end").style.transform = "scale(0)"
    document.getElementById("end").style.transition = "all 0.25s"
    for (let i = 0; i < array.length; i++){
        for (let x = 0; x < array.length; x++){
            id = i+""+x
            document.getElementById(id).innerHTML = ""
            document.getElementById(id).style.fontSize = "0rem"
            document.getElementById(id).style.transition = "font-size 0.2s"
        }
    }
    document.getElementById("grid").style.pointerEvents = "all"
}