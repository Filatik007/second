"use strict";
// First
var _a, _b;
function coffeeCounter(size, milk, taste) {
    let sum = 0;
    if (size == "Маленький")
        sum += 150;
    else if (size == "Средний")
        sum += 180;
    else
        sum += 200;
    if (milk) {
        if (milk == "Банановое")
            sum += 100;
        else if (milk == "Кокосовое")
            sum += 110;
        else if (milk == "Соевое")
            sum += 130;
    }
    if (taste) {
        if (taste == "Ягодный")
            sum += 10;
        if (taste == "Ванильный")
            sum += 20;
        if (taste == "Карамельный")
            sum += 30;
        if (taste == "Шоколадный")
            sum += 40;
    }
    return sum;
}
console.log(coffeeCounter("Маленький", "Банановое", "Ванильный"));
console.log(coffeeCounter("Большой", "Коровье", "Шоколадный"));
console.log(coffeeCounter("Средний", "Соевое"));
console.log(coffeeCounter("Средний"));
// Second
function convertArray(x) {
    if (typeof x == 'string') {
        return x.split(" ");
    }
    else if (Array.isArray(x)) {
        return x;
    }
    else if (x == null)
        return [];
    else {
        let arr = [];
        for (let i = 1; i <= x; i++)
            arr.push(i);
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
let student1 = {
    surname: "Filatova",
    name: "Ananas"
};
let student2 = {
    surname: "Fedin",
    name: "Grisha"
};
let group1 = {
    title: "b2-ifst-21",
    course: 2,
    students: [student1]
};
let teacher1 = {
    surname: "Daurov",
    name: "Alexander",
    academicDegree: "Mag",
    groups: [group1]
};
function isMyStudent(s, t) {
    if (!t.groups)
        return false;
    for (let i = 0; i < t.groups.length; i++) {
        if (t.groups[i].students.includes(s))
            return true;
    }
    return false;
}
console.log(isMyStudent(student1, teacher1));
function getName(o) {
    if ("title" in o)
        return o.title;
    else
        return o.surname + " " + o.name + (o.patronymic ? o.patronymic : "");
}
console.log(getName(student1));
console.log(getName(teacher1));
console.log(getName(group1));
function studentCount(o) {
    let sum = 0;
    if ("name" in o) {
        if (!o.groups)
            return 0;
        for (let i = 0; i < o.groups.length; i++) {
            sum += o.groups[i].students.length;
        }
        return sum;
    }
    else
        return o.students.length;
}
console.log(studentCount(teacher1));
console.log(studentCount(group1));
function selectGroup(g1, g2, s) {
    if (g1.students.length < g2.students.length)
        g1.students.push(s);
    else
        g2.students.push(s);
}
function createElementWithAttrs(tag, args, inner) {
    let element = document.createElement(tag);
    args.forEach(function (arg) {
        let attr = document.createAttribute(arg.name);
        attr.value = arg.value;
        element.setAttributeNode(attr);
    });
    if (inner)
        element.innerText = inner;
    return element;
}
let divs = document.querySelectorAll("form>div");
(_a = document.querySelector("#elements")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (e) {
    divs.forEach(function (div) {
        if (!div.hidden && div.id != "general")
            div.hidden = true;
    });
    document.querySelector("#" + e.target.value).hidden = false;
});
(_b = document.querySelector("button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
    var _a;
    let curDivId = "";
    let inner;
    let attrs = [];
    divs.forEach(function (div) {
        if (!div.hidden && div.id != "general")
            curDivId = div.id;
    });
    document.querySelectorAll(`#${curDivId}>label>input, #general>label>input`).forEach(function (input) {
        if (input.getAttribute("data-value") == "txt")
            inner = input.value;
        let attr = {
            name: input.getAttribute("data-value"),
            value: input.value
        };
        attrs.push(attr);
    });
    document.querySelectorAll(`#${curDivId}>select`).forEach(function (select) {
        let attr = {
            name: select.getAttribute("data-value"),
            value: select.value
        };
        attrs.push(attr);
    });
    let element = createElementWithAttrs(curDivId, attrs, inner);
    (_a = document.querySelector("body>#result")) === null || _a === void 0 ? void 0 : _a.appendChild(element);
});
window.onload = function () {
    document.querySelector("#elements").selectedIndex = 0;
};
