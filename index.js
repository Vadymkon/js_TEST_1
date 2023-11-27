class Box {
    enabled = true;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.status = Math.floor(Math.random() * 4) + 1;
        this.id = "ID" + x.toString() + y.toString();
    }

    makeBox() {
        let div = document.createElement("div");
        div.className = "box s" + this.status.toString();
        div.id = this.id;
        document.getElementById("opa").appendChild(div);
    }
}

class Field {
    listOfBox = [];
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    choose(x,y) {
        let xa = x-1;
        let ya = y-1;
        this.listOfBox[xa+ya*this.width].enabled = false;
        let elem = document.getElementById(this.listOfBox[xa+ya*this.width].id);
        elem.style.backgroundColor = "black";
        //down
        if (this.listOfBox[xa+(ya+1)*this.width] != null) //if exists
        {
            if (this.listOfBox[xa+(ya+1)*this.width].enabled === true) //if not black
                if (this.listOfBox[xa+(ya+1)*this.width].status === this.listOfBox[xa+ya*this.width].status) // if status same
                    this.choose(x,y+1);
        }
       // up
        if (this.listOfBox[xa+(ya-1)*this.width] != null) //if exists
        {
            if (this.listOfBox[xa+(ya-1)*this.width].enabled === true) //if not black
                if (this.listOfBox[xa+(ya-1)*this.width].status === this.listOfBox[xa+ya*this.width].status) // if status same
                    this.choose(x,y-1);
        }
        //right
        if (this.listOfBox[(xa+1)+ya*this.width] != null) //if exists
        {
            if (this.listOfBox[(xa+1)+ya*this.width].enabled === true) //if not black
                if (this.listOfBox[(xa+1)+ya*this.width].status === this.listOfBox[xa+ya*this.width].status) // if status same
                    this.choose(x+1,y);
        }
        //left
        if (this.listOfBox[(xa-1)+ya*this.width] != null) //if exists
        {
            if (this.listOfBox[(xa-1)+ya*this.width].enabled === true) //if not black
                if (this.listOfBox[(xa-1)+ya*this.width].status === this.listOfBox[xa+ya*this.width].status) // if status same
                    this.choose(x-1,y);
        }
    }

    makeArea() {
        for (let i = 1; i < this.width+1; i++)
            for (let j = 1; j < this.height+1; j++) {
                let ID = "ID" + j.toString() + i.toString();
                this.listOfBox.push(new Box(j, i));
                this.listOfBox[this.listOfBox.length - 1].makeBox();
                let element = document.getElementById(ID);
                console.log("Element:", element); // Log the element to check its value
                if (element) {
                    element.addEventListener('click', () => this.choose(j,i));
                } else {
                    console.log("Element not found:", ID);
                }
            }
    }
}

const p = new Field(7, 7);
p.makeArea();
