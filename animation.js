
// storing the circle container to add elements
const container = document.getElementById("circle");

// list for storing the index value of 200 squares
let indexList = [];



// loop for creating the squares
for (let i = 199; i>-1; i--){


    
    const row = 20-i%20;
    const column = Math.floor(i/20) +1;

    // appended to the list 
    indexList.push([row,column]);


    // creating the squares
    
    const ele = document.createElement("div");
    ele.classList.add("squares");

    ele.setAttribute("id", `box-${row},${column}`); /*for creating the id according to the row and column*/

    ele.setAttribute("onmouseover","checkCoordinates(this.id)") /*this will send coordinates of any square that is hovered*/

    container.appendChild(ele);

    // calling function to add the triangle inside the square box
    createTriangle(`box-${row},${column}`)
    }



    // creating the triangle inside of square
function createTriangle(value){
    let triangle = document.createElement("div");
    triangle.classList.add("triangle");
    let parentBox = document.getElementById(value);
    parentBox.appendChild(triangle);
}

// pattern created




// code starts for changing the triangle dimensions





// this trigger on mouseover and loop all the squares and also find the coordinates of cursor


function checkCoordinates(value){
    let coordinates =  (value.split("-")[1]).split(",");
    loop(coordinates[0],coordinates[1]);
} 


function loop(x,y){
    indexList.forEach(main)



// this will call all the desired functions 
function main(item){

    let newCoordinateX = item[0]-x;
    let newCoordinateY = item[1]-y;
    
    let quadrant = findQuadrant(newCoordinateX,newCoordinateY)


    let portion = findPortion(quadrant, newCoordinateX, newCoordinateY)


    shade(quadrant,portion,newCoordinateX,newCoordinateY,`box-${item[0]},${item[1]}`)
    
    
}}


// this will find in which quadrant the square lie
function findQuadrant(x,y){

    if(x>0){

        // when item is in first quadrant 
        if(y>0){
            return 1;
        }

        // when item is in fourth quadrant
        else{
            return 4;
        }
    }
    
    else if(x<0){

        // when item is in second quadrant
        if(y>0){
            return 2;
        }

        // when item is in third quadrant
        else{
            return 3;
        }

    }
    else{
        if(y>0){
            return 2;
        }
        else {
            return 4;
        }
    }

}



// this will find the in which portion the trianlge lie in a particular quadrant ; like bolow diagonal or above diagonal

function findPortion(quadrant, x,y){
    let result ;

    if(Math.abs(x)-Math.abs(y)==0){
        return "on diagonal";
    }

    else if (quadrant==1){
        result =x-y;

        // when above diagonal in first quadrant
        if (result>0){
            return "below diagonal";
        }
        else{
            return "above diagonal";
        }
        
    }
    else if (quadrant==2){
        result =x+y;

        if (result<0){
            return "below diagonal";
        }
        else{
            return "above diagonal";
        }

    }
    else if (quadrant==3){
        result =x-y;
        if (result<0){
            return "above diagonal";
        }
        else{
            return "below diagonal";
        }
    }

    else{
        result =x+y;
        if (result>0){
            return "above diagonal";
        }
        else {
            return "below diagonal";
        }

    }
}

// this will call the respective function  to give shade to the triangle according to the coordinates and portion of coordinate of trianlge

function shade(quadrant, portion , x, y, id){
    ele = document.getElementById(id);

    let height ;

    if(portion =="on diagonal"){
        //do nothing
    }

    else if (quadrant==1){
        if(portion =="below diagonal"){

            createCss2("right", "bottom", findHeight2(x,y), ele)

        }
        else{

            createCss1("right","bottom", ele, findHeight1(x,y))
        }
        
    }
    else if (quadrant==2){

        if(portion =="below diagonal"){

            createCss2("left", "bottom", findHeight2(x,y), ele)
        }
        else{

            createCss1("left","bottom", ele, findHeight1(x,y))  
        }
    }
    else if (quadrant==3){

        if(portion=="above diagonal"){

            createCss2("left", "top", findHeight2(x,y), ele,3.5-height)
        }
        else{

            createCss1("left","top", ele, findHeight1(x,y))
        }
        
    }
    else if (quadrant==4){

        if(portion=="above diagonal"){

            createCss2("right", "top", findHeight2(x,y), ele,3.5-height)
        }
        else if(portion =="below diagonal"){

            createCss1("right","top", ele, findHeight1(x,y))
        }
    }


}

// this will create the design css for type 1
function createCss1(base, zeroSide, ele, height){
    let oppositeSide;

    if (zeroSide == "top"){
        oppositeSide ="bottom";
    }
    else {
        oppositeSide= "top";
    }

    let css = `border-${base}: ${height}vh solid black; border-${zeroSide}: 0 solid transparent; border-${oppositeSide}: 4vh solid transparent; `

    ele.style.cssText = css;

}


// this will create the design css of type 2

function createCss2(base, zeroSide, height, ele, difference = 0){

    if (zeroSide == "top"){
        oppositeSide ="bottom";
    }
    else {
        oppositeSide= "top";
    }

    let css = `border-${base} : 4vh solid transparent; border-${zeroSide}: ${difference}vh solid transparent; border-${oppositeSide}: ${height+0.5}vh solid black;`

    ele.style.cssText = css;
}



// these will find the height of perpendicular of the triangle and this will shade them by inclining at the right angle towards centre

function findHeight1(x,y){
    x = Math.abs(x)
    y = Math.abs(y)

    return (2.1+3.2*x+y)/(2*y+1);
    
}


function findHeight2(x,y){
    x = Math.abs(x)
    y = Math.abs(y)
    
    return (2.1+3.2*y+x)/(2*x+1);

}



// to reset design when mouse is cursor is out of the circle 
function reset(){
    indexList.forEach(clean);
    
    function clean(item){
        ele = document.getElementById(`box-${item[0]},${item[1]}`)
        ele.style.cssText = "border-left: 4vh solid transparent; border-right: 0vh solid transparent border-bottom: 4vh solid black;"
    }
}