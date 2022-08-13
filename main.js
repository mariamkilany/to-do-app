    //window.localStorage.clear();
        var mode=0;
        //array of items
        let arr=new Array();
        // select from local storage
        if (window.localStorage.getItem("arr"))
        {
            arr = JSON.parse(window.localStorage.getItem("arr"));
        }
        //num of items
        let num=0;
        //select check 
        let checks=document.querySelectorAll(".check");
        //selecte dynamic span num of item
        let span=document.querySelector(".num");
        //appear content
        appear();
        //delete btn
        let dbtn=document.querySelectorAll(".delete");
        //select button
        let btn=document.querySelector(".input input[type=button]");
        //add to note items when click on btn
        btn.onclick=()=>addToPage(document.querySelector(".input input[type=text]").value);
        function addToPage(inptTxt){
        if(inptTxt!==""){
            let item= createItem(inptTxt);
            let obj={id:Date.now(),title:inptTxt,completed:false};
            item.setAttribute("id",obj.id);
            //select parenet
            let parent=document.querySelector(".items");
            arr.push(obj);
            parent.appendChild(item);
            addToLocalStorage();
            num++;
            span.innerHTML=num;
            
        }
        }
        function addToLocalStorage(){
        window.localStorage.setItem("arr",JSON.stringify(arr));
        }
        function createItem(inptTxt){
        let item=document.createElement("div");
            item.classList.add("item");
            item.innerHTML=`
                <div class="check"></div>
                <div class="txt">${inptTxt}</div>
            <div class="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div>`;
            item.lastChild.onclick=()=>daelete(item.lastChild);
        item.children[0].onclick=function(){
                this.classList.toggle("checked");
                this.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;
                item.classList.toggle("completed");
                arr.forEach(ele=>{
                    if(ele.id==item.getAttribute("id")){
                    if(ele.completed==false)
                    ele.completed=true;
                    else
                    ele.completed=false;
                    }
                });
            addToLocalStorage();
        };
        if(mode%2==1){
            item.classList.add("color");
        }
            return item;
        }
        function appear(){
        // let watch=window.localStorage.getItem("show");
        console.log(arr);
        arr.forEach(element => {
            let item=createItem(element.title);
            let parent=document.querySelector(".items");
            item.setAttribute("id",element.id);
            parent.appendChild(item);
            if(element.completed==true){
            item.children[0].classList.add("checked");
            item.children[0].innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;
            item.classList.add("completed");
            }
            
        });
        num+=arr.length;
        span.innerHTML=num;
        // appearWith(window.localStorage.getItem("show"));
        }
    function daelete(del){
                del.parentElement.style.display="none";
                let id=del.parentElement.getAttribute("id");
                if(arr.length>1){
                for(let i=0;i<arr.length;i++){
                    if(arr[i].id==id){
                    arr.splice(i,1);
                    }
                }
        }
        else{
        arr.pop();
        }
        num--;
        span.innerHTML=num;
        addToLocalStorage();
        };
        let show=document.querySelectorAll(".show div");
        show.forEach(el=>{
        el.onclick= function(){
            el.classList.toggle("clicked");
            show.forEach(ele=>{if(ele!==el)ele.classList.remove("clicked")});
            console.log(el.classList.value);
            if(el.classList.value=="actv clicked"){
            arr.forEach(ele=>{
                if(ele.completed==true){
                let items=document.querySelectorAll(".item");
                items.forEach(item=>{
                    if(item.id==ele.id){
                    item.classList.add("hide");
                    }
                })
                }
                else{
                let items=document.querySelectorAll(".item");
                items.forEach(item=>{
                    if(item.id==ele.id){
                    item.classList.remove("hide");
                    }
                })
                }
            })
            }
            else if(el.classList.value=="all clicked"){
            let items=document.querySelectorAll(".item");
                items.forEach(item=>{
                    item.classList.remove("hide");
                });
            }
            else if(el.classList.value=="comp clicked"){
            arr.forEach(ele=>{
                if(ele.completed==false){
                let items=document.querySelectorAll(".item");
                items.forEach(item=>{
                    if(item.id==ele.id){
                    item.classList.add("hide");
                    }
                })
                }
                else{
                let items=document.querySelectorAll(".item");
                items.forEach(item=>{
                    if(item.id==ele.id){
                    if(item.classList.contains("hide")){
                        item.classList.remove("hide");
                    }
                    }
                })
                }
            }
            )
            }
            window.localStorage.setItem("show",el.classList.value);
        };
        });
        //delete completed
        let clear=document.querySelector(".clear");
        clear.onclick=function(){
        let items=document.querySelectorAll(".item");
        items.forEach(el=>{
            if (el.classList.contains("completed")&&!el.classList.contains("done"))
            {
                el.classList.add("done");
                daelete(el.lastChild);
            }
        })
        }
        //change style
        let change=document.querySelector(".change");
        change.onclick=()=>{
        mode++;
        //change moon to sun
        let moon=change.firstChild;
        let sun=change.lastChild;
        moon.classList.toggle("moon");
        sun.classList.toggle("sun");
        //change header background image
        let header=document.querySelector(".header");
        header.classList.toggle("headerdark");
        document.querySelector(".input").classList.toggle("color");
        document.querySelector(".input input[type=text]").classList.toggle("color");
        document.querySelector(".input input[type=button]").classList.toggle("color");
        document.querySelector(".items").classList.toggle("color");
        document.querySelectorAll(".item").forEach(item=>{
        item.classList.toggle("color");
        });
        document.querySelector(".tail").classList.toggle("color");
        document.querySelector(".container").classList.toggle("color1");
        document.body.classList.toggle("color1");
        };