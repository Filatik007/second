// First

type size = "Маленький" | "Средний" | "Большой";
type milk = "Банановое" | "Кокосовое" | "Соевое" | "Коровье";
type taste = "Ягодный" | "Ванильный" | "Карамельный" | "Шоколадный";

function coffeeCounter(size: size, milk?: milk, taste?: taste) : number{
    let sum = 0;

    if(size == "Маленький") sum += 150;
    else if(size == "Средний") sum += 180;
    else sum += 200;
    
    if(milk){
        if(milk == "Банановое") sum += 100;
        else if(milk == "Кокосовое") sum += 110;
        else if(milk == "Соевое") sum += 130;
    }

    if(taste){
        if(taste =="Ягодный") sum += 10;
        if(taste =="Ванильный") sum += 20;
        if(taste =="Карамельный") sum += 30;
        if(taste =="Шоколадный") sum += 40;
    }
    return sum;
}

console.log(coffeeCounter("Маленький", "Банановое", "Ванильный"));
console.log(coffeeCounter("Большой", "Коровье", "Шоколадный"));
console.log(coffeeCounter("Средний", "Соевое"));
console.log(coffeeCounter("Средний"));

// Second

function convertArray<T>(x: string | T[] | null | number) : string[] | number[] | T[] {
    if(typeof x == 'string'){
        return x.split(" ");
    }
    else if(Array.isArray(x)){
        return x;
    }
    else if(x == null) return [];
    else
    {
        let arr = [];
        for(let i = 1; i <= x; i++) arr.push(i);
        return arr;
    }
}

console.log("Second");
console.log(convertArray("Hi there"));
console.log(convertArray([1, 2, 3]));
console.log(convertArray(5));
console.log(convertArray(null));

// Third
console.log("Third");

type Student = {
    surname: string,
    name: string, 
    patronymic?: string,
}

type Group = {
    title: string,
    course: number,
    students: Student[]
}

type Teacher = {
    surname: string,
    name: string, 
    patronymic?: string,
    academicDegree?: string,
    groups?: Group[]
}

let student1 : Student = {
    surname: "Filatova",
    name: "Ananas"
}

let student2 : Student = {
    surname: "Fedin",
    name: "Grisha"
}

let group1 : Group = {
    title: "b2-ifst-21",
    course: 2,
    students: [student1]
}

let teacher1 : Teacher = {
    surname: "Daurov",
    name: "Alexander",
    academicDegree: "Mag",
    groups: [group1]
}

function isMyStudent(s: Student, t: Teacher) : boolean{
    if(!t.groups) return false;
    for(let i = 0; i < t.groups.length; i++){
        if(t.groups[i].students.includes(s)) return true;
    }
    return false;
}

console.log(isMyStudent(student1, teacher1));

function getName(o: Student | Teacher | Group) : string{
    if("title" in o) 
        return o.title;
    else 
        return o.surname + " " + o.name + (o.patronymic ? o.patronymic : "");
}

console.log(getName(student1));
console.log(getName(teacher1));
console.log(getName(group1));

function studentCount(o: Teacher | Group) : number{
    let sum = 0;
    if("name" in o){
        if(!o.groups) return 0;
        for(let i = 0; i < o.groups.length; i++){
            sum += o.groups[i].students.length;
        }
        return sum;
    }
    else
        return o.students.length;
}

console.log(studentCount(teacher1));
console.log(studentCount(group1));

function selectGroup(g1: Group, g2: Group, s: Student) : void{
    if(g1.students.length < g2.students.length) g1.students.push(s);
    else g2.students.push(s);
}


// Fourth

type Attribute = {
    name: string,
    value: string
}

function createElementWithAttrs(tag: string, args: Attribute[], inner?: string) : HTMLElement{
    let element = document.createElement(tag);
    args.forEach(function(arg){
        let attr = document.createAttribute(arg.name);
        attr.value = arg.value;
        element.setAttributeNode(attr);
    });
    if(inner) element.innerText = inner;
    return element;
}

let divs = document.querySelectorAll("form>div");

document.querySelector("#elements")?.addEventListener('change', function(e){
    divs.forEach(function(div){
        if(!(<HTMLElement> div).hidden && div.id != "general") (<HTMLElement> div).hidden = true;
    });
    (<HTMLFieldSetElement> document.querySelector("#" + (<HTMLInputElement> e.target).value)).hidden = false;
})

document.querySelector("button")?.addEventListener("click", function(e){
    let curDivId = "";
    let inner;
    let attrs : Attribute[] = [];
    divs.forEach(function(div){
        if(!(<HTMLElement> div).hidden && div.id != "general") curDivId = div.id;
    });
    document.querySelectorAll(`#${curDivId}>label>input, #general>label>input`).forEach(function(input){
        if(input.getAttribute("data-value") == "txt") inner = (<HTMLInputElement> input).value;
        let attr : Attribute = {
            name: input.getAttribute("data-value")!,
            value: (<HTMLInputElement> input).value
        };
        attrs.push(attr);
    });
    document.querySelectorAll(`#${curDivId}>select`).forEach(function(select){
        let attr : Attribute = {
            name: select.getAttribute("data-value")!,
            value: (<HTMLInputElement> select).value
        };
        attrs.push(attr);
    });
    let element = createElementWithAttrs(curDivId, attrs, inner);
    document.querySelector("body>#result")?.appendChild(element);
})

window.onload = function(){
    (<HTMLSelectElement>document.querySelector("#elements")).selectedIndex = 0;
}