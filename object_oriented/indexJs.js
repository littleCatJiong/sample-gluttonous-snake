window.onload = function(){
    playGrounds = new PlayGrounds();
    playGrounds.render();
    playGroundsGrid = new PlayGroundsGrid();
    playGroundsGrid.render();
    food = new Food();
    food.render();
    snake = new Snake();
    snake.render();

    timer = setInterval(function(){
        snake.move();
    }, 200);

    document.onkeydown = function(){
        var e = window.event || event;
        switch (e.keyCode){
            case 37:
                snake.setDirection('left');
                break;
            case 38:
                snake.setDirection('up');
                break;
            case 39:
                snake.setDirection('right');
                break;
            case 40:
                snake.setDirection('down');
                break;
            default:
                return;
        }
    }
};
var playGrounds;
var playGroundsGrid;
var food;
var snake;
var timer;
var sum = 0;
//define PlayGrounds class
function PlayGrounds(){
    //view
    this.width = 800;
    this.height = 400;
    this.margin = '0 auto';
    this.position = 'relative';
    this.border = '1px solid #ccc';
    this._playGrounds = null;   //to save playGrounds object

    //render
    this.render = function(){
        this._playGrounds = document.createElement('div');
        this._playGrounds.style.width = this.width + 'px';
        this._playGrounds.style.height = this.height + 'px';
        this._playGrounds.style.margin = this.margin;
        this._playGrounds.style.position = this.position;
        this._playGrounds.style.borderTop = this.border;
        this._playGrounds.style.borderLeft = this.border;

        document.getElementsByTagName('body')[0].appendChild(this._playGrounds);
    }
}
//define PlayGroundsGrid class
function PlayGroundsGrid(){
    this.width = 19;
    this.height = 19;
    this.float = 'left';
    this.backgroundColor = '#ccc';
    this.border = '1px solid #fff';

    //render
    this.render = function() {
        for (var i = 0; i < 800; i++) {
            var divEle = document.createElement('span');
            divEle.style.width = this.width + 'px';
            divEle.style.height = this.height + 'px';
            divEle.style.float = this.float;
            divEle.style.backgroundColor = this.backgroundColor;
            divEle.style.borderRight = this.border;
            divEle.style.borderBottom = this.border;

            playGrounds._playGrounds.appendChild(divEle);
        }
    }
}
//define Food class
function Food(){
    this.width = 20;
    this.height = 20;
    this.backgroundColor = '#D2A2CC';
    this.position = 'absolute';
    this.posX = 0;
    this.posY = 0;
    this.food = null;

    this.render = function(){
        //first render food
        if(this.food == null){
            this.food = document.createElement('div');
            this.food.style.width = this.width + 'px';
            this.food.style.height = this.height + 'px';
            this.food.style.backgroundColor = this.backgroundColor;
            this.food.style.position = this.position;

            playGrounds._playGrounds.appendChild(this.food);
        }
        //update food position randomly
        this.posX = Math.floor(Math.random() * 40);
        this.posY = Math.floor(Math.random() * 20);
        this.food.style.left = this.posX * 20 + 'px';
        this.food.style.top = this.posY * 20 + 'px';
    };
}
//define Snake class
function Snake(){
    this.width = 20;
    this.height = 20;
    this.position = 'absolute';
    this.body = [[3, 1, '#467500', null], [2, 1, '#64A600', null], [1, 1, '#64A600', null]];
    this.direction = '';

    this.render = function(){
        for(var i=0; i<this.body.length; i++){
            if(this.body[i][3] == null){
                this.body[i][3] = document.createElement('div');
                this.body[i][3].style.width = this.width + 'px';
                this.body[i][3].style.height = this.height + 'px';
                this.body[i][3].style.position = this.position;
                this.body[i][3].style.backgroundColor = this.body[i][2];

                playGrounds._playGrounds.appendChild(this.body[i][3]);
            }
            this.body[i][3].style.left = this.body[i][0] * 20 + 'px';
            this.body[i][3].style.top = this.body[i][1] * 20 + 'px';
        }
    };
    this.setDirection = function(direct){
        this.direction = direct;
        console.log(this.direction);
    };
    // while snake is moving, it may eat the food, may against the wall
    // also if the direction keeps no change, it will always move in the same direction
    this.move = function(){
        var snakeLength = this.body.length - 1;
        //keep moving with defined direction
        for(var i=snakeLength; i>0; i--){
            this.body[i][0] = this.body[i-1][0];
            this.body[i][1] = this.body[i-1][1];
        }
        switch (this.direction) {
            case 'left':
                this.body[0][0] -= 1;
                break;
            case 'up':
                this.body[0][1] -= 1;
                break;
            case 'right':
                this.body[0][0] += 1;
                break;
            case 'down':
                this.body[0][1] += 1;
                break;
            default:
                return;
        }
        //when snake eat the food
        if(this.body[0][0] == food.posX && this.body[0][1] == food.posY){
            sum++;
            document.title = sum;
            var x = this.body[snakeLength][0];
            var y = this.body[snakeLength][1];
            this.body.push([x, y, '#64A600', null]);
            food.render();
        }
        //when snake against the wall
        if(this.body[0][0] < 0 || this.body[0][0] > 39 || this.body[0][1] < 0 || this.body[0][1] > 19){
            alert('snake against the wall!');
            clearInterval(timer);
            return;
        }
        this.render();
    }
}