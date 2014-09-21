var canvas = document.getElementById("realCanvas");
var tmp_board = document.getElementById("tempCanvas");
var b_width = canvas.width, b_height = canvas.height;
var ctx = canvas.getContext("2d");
var context = tmp_board.getContext("2d");
var x, y; 
var saved = false, hold = false, fill = false, stroke = true, tool = 'circle';
var data = {"rectangle": [], "circle": [], "line": []};

function curr_tool(selected){tool = selected;}

function attributes(){
	if (document.getElementById("fill").checked)
		fill = true;
	else
		fill = false;
	if (document.getElementById("outline").checked)
		stroke = true;
	else
		stroke = false;
}

function thickness(){
	context.lineWidth = document.getElementById("selclr").value;
}

function clears(){
	ctx.clearRect(0, 0, b_width, b_height);
	context.clearRect(0, 0, b_width, b_height);
	data = {"rectangle": [], "circle": [], "line": []};
}

function color(scolor){  
	context.strokeStyle = scolor;
	if (document.getElementById("fill").checked)
		context.fillStyle = scolor; 
}

tmp_board.onmousedown = function(e) {
	attributes();
	hold = true;
	x = e.pageX - this.offsetLeft;
	y = e.pageY -this.offsetTop;
	begin_x = x;
	begin_y = y;
	context.beginPath();
	context.moveTo(begin_x, begin_y);    
}

tmp_board.onmousemove = function(e) {
	if (x == null || y == null) {
		return;
 	}
	if(hold){
		x = e.pageX - this.offsetLeft;
		y = e.pageY - this.offsetTop;
		Draw();
	}
}
     
tmp_board.onmouseup = function(e) {
	ctx.drawImage(tmp_board,0, 0);
	context.clearRect(0, 0, tmp_board.width, tmp_board.height);
	end_x = x;
	end_y = y;
	x = null;
	y = null;
	Draw();
	hold = false;
}

function Draw(){
	if (tool == 'rectangle'){
		if(!x && !y){
			data.rectangle.push({"x": begin_x, "y": begin_y, "width": end_x-begin_x, "height": end_y-begin_y,
							"thick": context.lineWidth, "stroke": stroke, "strk_clr": context.strokeStyle,
							 "fill": fill, "fill_clr": context.fillStyle });
			return;
		}  
		context.clearRect(0, 0, b_width, b_height);
		context.beginPath();
		if(stroke)
			context.strokeRect(begin_x, begin_y, x-begin_x, y-begin_y);
		if(fill) 
			context.fillRect(begin_x, begin_y, x-begin_x, y-begin_y);
		context.closePath();
	}
	else if (tool == 'circle'){   
		if(!x && !y){
			data.circle.push({"x": begin_x, "y": begin_y, "radius": end_x-begin_x, 
							"thick": context.lineWidth, "stroke": stroke, "strk_clr": context.strokeStyle,
							"fill": fill, "fill_clr": context.fillStyle });   
			return;
		}
		context.clearRect(0, 0, b_width, b_height);
		context.beginPath();
		context.arc(begin_x, begin_y, Math.abs(x-begin_x), 0 , 2 * Math.PI, false);
		if(stroke) 
			context.stroke();
		if(fill) 
			context.fill();
		context.closePath();
	}
	else if (tool == 'line'){ 
		if(!x && !y){
			data.line.push({"x": begin_x, "y": begin_y, "end_x": end_x, "end_y": end_y,
                            "thick": context.lineWidth, "color": context.strokeStyle });
			return;
		}
		context.clearRect(0, 0, b_width, b_height);
		context.beginPath();
		context.moveTo(begin_x, begin_y);
		context.lineTo(x, y);
		context.stroke();
		context.closePath();
	}
}

function is_there(fname){
	for(var each in py_data){
		if(each == fname) 
		return true;
	}
	return false;
}

function save(){
	var f_name =  document.getElementById("fname").value;
	var title = document.getElementById('name').innerHTML;
	if(!f_name){
		alert("Enter a Filename to save!");
		return;
	}
	else{
		$.post("/save/",{'fname': f_name, 'whole_data': JSON.stringify(data)});
		title = f_name;
		alert("Saved....!");
	}
}
