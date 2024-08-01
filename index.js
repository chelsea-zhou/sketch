/*
1. 16*16 divs
    a. wrap in container
    b. use flexbox to make div as grid
    c. careful with border+ margin
2. div change color on mouse hover
    a. hover happen when mouse enter a div and end when leaves it
    b. change color of div: add new class to div, change div's background color
3. add button to send user popup asking for number of square per side for new grid
    - once entered, existing grid is removed
    - new grid is generated
    - limit input to 100
4. extra
    - randomize color 
    - pregressive darkening by 10% 

    3:51 - 5:51 finish
*/
function generateHexColor() {
    // Generate a random number between 0 and 16777215 (0xFFFFFF)
    const randomColor = Math.floor(Math.random() * 16777215);
    // Convert the number to a hexadecimal string and pad with zeros if necessary
    const hexColor = '#' + randomColor.toString(16).padStart(6, '0');
    return hexColor;
}

function createGrid() {
    const div = document.createElement('div');
    div.style.cssText = 'width: 30px; height: 30px; border: 1px solid black; background-color: rgba(0, 0, 0, 0);';
    return div;
}

function getRgbColor() {
    return Math.floor(Math.random() * 255);
}
function changeColor(div) {
    div.addEventListener("mouseover", (e) => {
        let color = '';
        if (e.target.style["background-color"] === 'rgba(0, 0, 0, 0)') {
            color = `rgba(${getRgbColor()}, ${getRgbColor()}, ${getRgbColor()}, 0.1)`;
            e.target.style["background-color"] = `${color}`;
        } else if (e.target.style.opacity < 1) {
            let bg = e.target.style["background-color"];
            let bgArr = bg.split(" ");
            let last_index = bgArr.length-1;
            let op = Number(bgArr[last_index].split(")")[0]);
            let newOp = op + 0.1;
            bgArr[last_index] = newOp + ')';
            e.target.style["background-color"] = bgArr.join(" ");
        }
    })
}

function createGrids(width) {
    let i = 0;
    let j = 0;
    let grids = []
    while(i < width) {
        const row = document.createElement('div');
        while (j < width) {
            const div = createGrid();
            changeColor(div);
            row.appendChild(div);
            j +=1
        }
        grids.push(row);
        j = 0;
        i += 1;
    }
    return grids;
}

function addGridsToContainer(grids) {
    container.innerHTML = '';
    grids.forEach((row) => {
        container.appendChild(row);
    });
}

const container = document.querySelector('.container');
const grids = createGrids(16);
addGridsToContainer(grids);


const button = document.querySelector('.sizeButton');
button.addEventListener('click', (e) => {
    const num = prompt('what canvas size do you want?');
    const grids = createGrids(num);
    addGridsToContainer(grids);
});