function clearAll()
{
    var txt = document.getElementById("txtScream");
    var text = document.getElementById("textarea");
    txt.value = "0";
    text.value = "";
}
function backSpace()
{
    var txt = document.getElementById('txtScream');
    if(txt.value != 0){
        txt.value = txt.value.substring(0,txt.value.length-1);
    }
}
function putTheKey(control){
    var txt = document.getElementById("txtScream");
    if(txt.value == 0)
    {
        txt.value = "";
    }
    txt.value += control.value;
}
function getResult(){
    var txt = document.getElementById("txtScream");
    var text = document.getElementById("textarea");
    var transit = txt.value + '#';
    text.value = Change(transit);
    txt.value = Infix(transit);
}

function meiLeBa(){
    var fff = document.getElementById("lck");
    fff.style.display = "none";
}



var sign = new Array();
                    // +   -   *    /    (    )   #
sign[0] = new Array('1','1','-1','-1','-1','1','1');   //+
sign[1] = new Array('1','1','-1','-1','-1','1','1');   //-
sign[2] = new Array('1','1','1','1','-1','1','1');     //*
sign[3] = new Array('1','1','1','1','-1','1','1');     ///
sign[4] = new Array('-1','-1','-1','-1','-1','0','');  //(
sign[5] = new Array('1','1','1','1','','1','1');       //)
sign[6] = new Array('-1','-1','-1','-1','-1','','0');  //#

function Sign(a,b){
    var str = ['+','-','*','/','(',')','#'];
    var str1;
    var str2;
    for(var i=0;i<7;i++){
        if(a == str[i]){
            str1 = i;
        }
        if(b == str[i]){
            str2 = i;
        }
    }
    var count = sign[str1][str2];
    return count;
}

function Stack(){
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.length = length;
    this.peek = peek;
    this.clear = clear;
}

function push(element){
    this.dataStore[this.top] = element;
    this.top++;
}

function pop(){
    return this.dataStore[--this.top];;
}

function peek(){
    return this.dataStore[this.top-1];
}

function clear(){
    this.top = 0;
}

function length(){
    return this.top;
}

function Change(item){
    var str = item;
    var stack = new Stack();
    stack.push("#");
    var outStack = new Array();
    var small = "";
    var flog = 0;
    for(var i=0;i<item.length;i++){
        if(!isNaN(str[i]) || str[i] == '.'){
            if(!isNaN(str[i+1]) || str[i+1] == '.' || flog == 1){
                small = small + str[i];
                flog = 1;
                if(isNaN(str[i+1]) && str[i+1] != '.'){
                    outStack.push(parseFloat(small));
                    small = "";
                    flog = 0;
                }
            }
            else{
                outStack.push(str[i]);
            }
        }
        else{
            var txt = stack.peek();
            if( str[i] == '('){
                stack.push(str[i]);
            }
            else if( str[i] == ')'){
                for(var j = i + 1 ; stack.peek() != "(" ; j--){
                    outStack.push(stack.pop());
                }
                stack.pop();                     
            }
            else{
                var relationship = Sign(txt,str[i]);
                if( relationship == -1){
                    stack.push(str[i]);
                }
                else if(relationship >= 0){
                    do{
                        outStack.push(stack.pop());
                    }while(Sign(stack.peek(),str[i])>0);
                    stack.push(str[i]);
                }
            }
        }
    }
    return outStack;
}

function suffix(item){
    var str = item;
    var outStack = new Stack();
    var small = "";
    var flog = 0;
    for(var i=0;i<item.length;i++){
        if(!isNaN(str[i]) || str[i] == '.'){
            if(!isNaN(str[i+1]) || str[i+1] == '.' || flog == 1){
                small = small + str[i];
                flog = 1;
                if(isNaN(str[i+1]) && str[i+1] != '.'){
                    outStack.push(parseFloat(small));
                    small = "";
                    flog = 0;
                }
            }
            else{
                outStack.push(str[i]);
            }
        }
        else{
            var str1 = parseFloat(outStack.pop());
            var str2 = parseFloat(outStack.pop());
            switch(str[i]){
                case'+':outStack.push(str2 + str1);
                break;
                case'-':outStack.push(str2 - str1);
                break;
                case'*':outStack.push(str2 * str1);
                break;
                case'/':outStack.push(str2 / str1);
                break;
            }
        }
    }
    return outStack.peek();
}

function Infix(item){
    var str = item;
    var stack = new Stack();
    stack.push("#");
    var outStack = new Array();
    var small = "";
    var flog = 0;
    for(var i=0;i<item.length;i++){
        if(!isNaN(str[i]) || str[i] == '.'){
            if(!isNaN(str[i+1]) || str[i+1] == '.' || flog == 1){
                small = small + str[i];
                flog = 1;
                if(isNaN(str[i+1]) && str[i+1] != '.'){
                    outStack.push(parseFloat(small));
                    small = "";
                    flog = 0;
                }
            }
            else{
                outStack.push(str[i]);
            }
        }
        else{
            var txt = stack.peek();
            if( str[i] == '('){
                stack.push(str[i]);
            }
            else if( str[i] == ')'){
                for(var j = i + 1 ; stack.peek() != "(" ; j--){
                    var a1 = parseFloat(outStack.pop());
                    var a2 = parseFloat(outStack.pop());
                    var a3 = stack.pop();
                    switch(a3){
                        case'+':outStack.push(a2 + a1);
                        break;
                        case'-':outStack.push(a2 - a1);
                        break;
                        case'*':outStack.push(a2 * a1);
                        break;
                        case'/':outStack.push(a2 / a1);
                        break;
                    }
                }
                stack.pop();                     
            }
            else{
                var relationship = Sign(txt,str[i]);
                if( relationship == -1){
                    stack.push(str[i]);
                }
                else if(relationship >= 0){
                    do{
                        var b1 = parseFloat(outStack.pop());
                        var b2 = parseFloat(outStack.pop());
                        var a3 = stack.pop();
                        switch(a3){
                            case'+':outStack.push(b2 + b1);
                            break;
                            case'-':outStack.push(b2 - b1);
                            break;
                            case'*':outStack.push(b2 * b1);
                            break;
                            case'/':outStack.push(b2 / b1);
                            break;
                        }
                    }while(Sign(stack.peek(),str[i])>0);
                    stack.push(str[i]);
                }
            }
        }
    }
    return outStack.pop().toFixed(5);
}