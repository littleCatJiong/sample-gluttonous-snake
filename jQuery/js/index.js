$(document).ready(function(){
    //create palyGrounds grid
    createPlayGroundsGrid(defaultConfig.groundsSize);
    food = new Food();
    food.render();
    snake = new Snake();
    snake.render();
    timer = setInterval(function(){
        snake.move();
    }, defaultConfig.speed);
    $(document).on('keydown', function(e) {
        var code = e.keyCode;
        switch (code) {
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
    })
});
var defaultConfig = {
    groundsSize: 20,
    speed: 200
};
var direction;
var food;
var pos;
var lastBody;
var snake;
var timer;
function createPlayGroundsGrid(size){
    var contentStr = '';
    //use table to be as palyGrounds, column(size) * rows(size)
    contentStr += '<table>';
    for(var  i=0; i<size; i++){
        contentStr += '<tr>';
        for(var j=0; j<size; j++){
            //<td class="td_0_0"></td>
            contentStr += '<td class="td_'+i+'_'+j+'"></td>';
        }
        contentStr += '</tr>';
    }
    contentStr += '</table>';
    $('.divContainer').html(contentStr);
}
function Food(){
    //first render food or update food position
    this.render = function(){
        if(pos){
            $('.td_' + pos[0] + '_' + pos[1]).removeClass('food');
        }
        //create food position x and y randomly     x: (0 ~ size)
        var x = Math.floor(Math.random() * defaultConfig.groundsSize);
        var y = Math.floor(Math.random() * defaultConfig.groundsSize);
        $('.td_' + x + '_' + y).addClass('food');
        pos = [x, y];
    }
}
function Snake(){
    this.direction;
    //snake default position
    this.body = [[1,3,'#467500'],[1,2,'#64A600'],[1,1,'#64A600']];
    this.render = function(){
        if(lastBody){
            $('.td_' + lastBody[0] + '_' + lastBody[1]).css('backgroundColor', '#fff');
        }
        for(var i=0; i<this.body.length; i++){
            var x = this.body[i][0];
            var y = this.body[i][1];
            $('.td_' + x + '_' + y).css('backgroundColor', this.body[i][2]);
        }
    };
    this.setDirection = function(direct){
        this.direction = direct;
    };
    this.move = function(){
        var length = this.body.length - 1;
        //snake eat the food
        if(this.body[0][0] == pos[0] && this.body[0][1] == pos[1]){
            var x = this.body[length][0];
            var y = this.body[length][1];
            this.body.push([x, y,'#64A600']);
            food.render();
        }
        if(this.direction) {
            lastBody = [this.body[length][0], this.body[length][1]];
            for (var i = length; i > 0; i--) {
                this.body[i][0] = this.body[i - 1][0];
                this.body[i][1] = this.body[i - 1][1];
            }
        }
        switch (this.direction) {
            case 'left':
                this.body[0][1] -= 1;
                break;
            case 'up':
                this.body[0][0] -= 1;
                break;
            case 'right':
                this.body[0][1] += 1;
                break;
            case 'down':
                this.body[0][0] += 1;
                break;
            default:
                return;
        }
        //sname against the wall
        if(this.body[0][0]<0 || this.body[0][1] < 0 || this.body[0][0] > defaultConfig.groundsSize -1 || this.body[0][1] > defaultConfig.groundsSize -1){
            alert('snake against the wall');
            clearInterval(timer);
            return;
        }
        this.render();
    }
}