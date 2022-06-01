function openForm() {
    document.getElementById("myForm").style.display = "block";
    showTab(currentTab); // Display the current tab

}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
} 

function countryList(address){
    let dropdown = document.getElementById('country');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Country';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    let option;
    for (let i = 0; i < address.length; i++) {
      option = document.createElement('option');
      option.text = address[i].name;
      option.value = address[i].name;
      dropdown.add(option);
    }
}


var addresses = {};
const addresslist = fetch("address.json")
.then(response => {
return response.json();
})
.then(jsondata => {
    const obj = JSON.stringify(jsondata);
    addresses = JSON.parse(obj);
    countryList(addresses);
});



function changeCountry() {
    let changes = document.getElementById("country").value;
    if (changes !== 'Choose Country'){
        document.getElementById("state").removeAttribute("disabled");
        let dropdown = document.getElementById('state');
        let country = document.getElementById('country').value;
        dropdown.length = 0;

        let defaultOption = document.createElement('option');
        defaultOption.text = 'Choose State';
        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;
        let option;
        for (let i = 0; i < addresses.length; i++) {
            if(addresses[i].name === country){
                for (let j = 0; j < addresses[i].states.length; j++) {
                    option = document.createElement('option');
                    const text = addresses[i].states[j].name;
                    const value = addresses[i].states[j].name;
                    option.text = text
                    option.value = value
                    dropdown.add(option);
                }
                break;
            }
        }
    }else{
        document.getElementById("state").setAttribute("disabled","disable");
        document.getElementById("city").setAttribute("disabled","disable");
    }
  };

function changeState() {
    let changes = document.getElementById("state").value;
    if (changes !== 'Choose State'){
        document.getElementById("city").removeAttribute("disabled");
        let dropdown = document.getElementById('city');
        let country = document.getElementById('country').value;
        let state = document.getElementById('state').value;
        dropdown.length = 0;

        let defaultOption = document.createElement('option');
        defaultOption.text = 'Choose City';
        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;
        let option;
        for (let i = 0; i < addresses.length; i++) {
            if(addresses[i].name === country){
                for (let j = 0; j < addresses[i].states.length; j++) {
                    if(addresses[i].states[j].name === state){
                        for (let k = 0; k < addresses[i].states[j].cities.length; k++) {
                            option = document.createElement('option');
                            option.text = addresses[i].states[j].cities[k].name;
                            option.value = addresses[i].states[j].cities[k].name;
                            dropdown.add(option);
                        }
                        break;
                    }
                }
                break;
            }
        }
    }else{
        document.getElementById("city").setAttribute("disabled","disable");
    }
};

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.marginLeft = "41.5%";
  } else {
    document.getElementById("nextBtn").style.marginLeft = "0%";
    document.getElementById("prevBtn").style.display = "inline-block";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("form-container").submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}
// Try ----------------------------------------------------------------------------------------------------------------------1
// class CreateSingleEdu{
//     constructor(){
//         this.idno = 1;
//         this.store = ["edu1"];
//     }
//     cloningNew(){
//         var ele = document.getElementById(this.store[this.store.length -1]);
//         var clone = ele.cloneNode(true);
//         this.idno = this.idno + 1;
//         clone.id ="edu" + this.idno;
//         this.store.push(clone.id);
//         ele.parentNode.insertBefore(clone,ele.nextSibling);
//         if(this.store.length > 1){
//             this.store.forEach(item => document.getElementById(item).getElementsByClassName("dot")[0].style.display = "block");
//         }
//         this.changeHeader(clone.id);         
//     }
//     changeHeader(idpos){
//         let pos = this.store.indexOf(idpos);
//         console.log(idpos,pos)
//         document.getElementById(idpos).getElementsByClassName("header")[0].innerHTML = "Education - " + (pos + 1);
//     }
//     closingSingle(idpos){
//         const index = this.store.indexOf(idpos);
//         if(index > -1){
//             this.store.splice(index,1);
//         }
//         document.getElementById(idpos).remove();
//         if(this.store.length == 1){
//             document.getElementById(this.store[0]).getElementsByClassName("dot")[0].style.display = "none";
//         }
//         if(!(index==this.store.length)){
//             this.reorderBlocks(index);
//         }
//     }
//     reorderBlocks(index){
//         var j;
//         for(j=index; j<this.store.length;j++){
//             document.getElementById(this.store[j]).getElementsByClassName("header")[0].innerHTML = "Education - " + (j + 1);
//         }
//     }

// }

// function cloningEdu(){
//     cloningProcess.cloningNew();
//     let mee = document.getElementsByClassName("single-edu");
// }

// Try ----------------------------------------------------------------------------------------------------------------------2

// function closeSingle(eventButton){
//     cloningProcess.closingSingle(eventButton.parentElement.id);
// }

// function cloningNew(){
//     let s = document.getElementById("edu-holder").innerHTML += eduStruct;
//     let x = document.getElementsByClassName("single-edu");
//     count += 1;
//     x[x.length-1].getElementsByClassName("header")[0].innerHTML = "Education - " + count;
//     if(x.length > 1){
//         var j;
//         for(j=0;j<x.length;j++){
//             x[j].getElementsByClassName("dot")[0].style.display = "block";
//         }
//     }
// }

// function closeSingle(idpos){
//     let cu =idpos.getElementsByClassName("header")[0].innerHTML;
// }

// Try ----------------------------------------------------------------------------------------------------------------------3

// function manageListener(index){
    
//     if(!(index == eduList.length)){
//         var i = 0;
//         while(i<singleHolder.length){
//             for(let variables in eduList[index]){
//                 console.log("Ar");
//                 // console.log(singleHolder[i]);
//                 singleHolder[i].addEventListener("change", (e) => {
//                     //e.target.value = "arun";
//                     eduList[index][variables] = e.target.value;
//                     //
//                 });
//                 singleHolder[i].setAttribute('value', eduList[index][variables]);
//                 i++;
//             }
//         }
//     }
//     // singleHolder[i].addEventListener("change", (e) => {
//     //     let temp = index
//     //     eduList[index][variables] = e.target.value;
//     //     //e.target.value = eduList[index][variables]
//     // });
// }

// function remEvent(index){
//     var mainHolder = document.getElementsByClassName("single-edu");
//     //var singleHolder = mainHolder[index].getElementsByTagName('input');
//     if(!(index == eduList.length)){
//         for(let i=index;i<eduList.length;i++){
//             let temp = mainHolder[i].getElementsByTagName('input');
//             for(let k =0; k<temp.length;k++){
//                 temp[k].addEventListener("change", (e) => {
//                     let temp = index
//                     eduList[index][variables] = e.target.value;
//                     //e.target.value = eduList[index][variables]
//                 });
//             }
            
            
//         }
//     }
// }

// singleHolder[i].removeEventListener("change", (e) => {
//     eduList[index][variables] = e.target.value;
// });

// function insertInputs(index){
//     var mainHolder = document.getElementsByClassName("single-edu");
//     var singleHolder = mainHolder[index].getElementsByTagName('input');
//     var closeHolder = mainHolder[index].getElementsByClassName("dot");
//     closeHolder[0].addEventListener("click", (e) => {
//         eduList.splice(index, 1);
//         mainHolder[index].remove();
//         remEvent(index);
//         manageListener(index);
//         if(eduList.length == 1){
//             mainHolder[0].getElementsByClassName("dot")[0].style.display = "none";
//         }
//     });
//     var i = 0;
//     while(i<singleHolder.length){
//         for(let variables in eduList[index]){
            
//             singleHolder[i].addEventListener("change", (e) => {
//                 eduList[index][variables] = e.target.value;
//             });
//             // (e) => {
//             //     //eduList[index][variables] = e.target.value;
//             //     //e.target.value = eduList[index][variables]
//             // });
//             singleHolder[i].setAttribute('value', eduList[index][variables]);
//             i++;
//         }
//     }
//     mainHolder[index].getElementsByClassName("header")[0].innerHTML = "Education - " + (index + 1);
// }

// function cloningNew(){
//     var newObj = createObj();
//     eduList.push(newObj);
//     let allHolder = document.getElementById("edu-holder");
//     allHolder.insertAdjacentHTML("beforeend", eduStruct);
//     var useMe = document.getElementsByClassName("single-edu");
//     if(eduList.length > 1){
//         for(let x = 0; x < eduList.length; x++){
//             useMe[x].getElementsByClassName("dot")[0].style.display = "block";
//         }
//     }
//     insertInputs(eduList.length - 1);

// }

// var count = 0
// var createObj = () => {
//     return ({
//         eduName : "",
//         eduPlace : "",
//         eduQualification : "",
//         eduSpecialization : "",
//         eduYear : ""
//     });
// }

// Try ----------------------------------------------------------------------------------------------------------------------4

function removeAll(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function insertAll(){
    let parent = document.getElementById("edu-holder");
    parent.innerHTML = eduStruct.repeat(eduList.length);
    var mainHolder = parent.getElementsByClassName("single-edu");
    if(eduList.length > 1){
        for(let x = 0; x < eduList.length; x++){
            mainHolder[x].getElementsByClassName("dot")[0].style.display = "block";
        }
    }
    for(let i=0;i<eduList.length;i++){
        let singleHolder = mainHolder[i].getElementsByTagName('input');
        var closeHolder = mainHolder[i].getElementsByClassName("dot");
        mainHolder[i].getElementsByClassName("header")[0].innerHTML = "Education - " + (i + 1);
        closeHolder[0].addEventListener("click", (e) => {
            eduList.splice(i, 1);
            removeAll(e.target.parentNode.parentNode.parentNode)
            insertAll();
        });
        let j = 0;
        while(j<singleHolder.length){
            for(let variables in eduList[i]){
                singleHolder[j].setAttribute('value', eduList[i][variables]);
                singleHolder[j].addEventListener("change", (e) => {
                    eduList[i][variables] = e.target.value;
                });
                j++;
            }            
        }
        
    }
}

function insertInputs(index){
    var mainHolder = document.getElementsByClassName("single-edu");
    var singleHolder = mainHolder[index].getElementsByTagName('input');
    var closeHolder = mainHolder[index].getElementsByClassName("dot");
    closeHolder[0].addEventListener("click", (e) => {
        eduList.splice(index, 1);
        console.log("Parent",e.target.parentNode.parentNode);
        console.log("single",e.target.parentNode);
        removeAll(e.target.parentNode.parentNode.parentNode)
        insertAll();
    });
    var i = 0;
    while(i<singleHolder.length){
        for(let variables in eduList[index]){
            singleHolder[i].setAttribute('value', eduList[index][variables]);
            singleHolder[i].addEventListener("change", (e) => {
                eduList[index][variables] = e.target.value;
            });
            i++;
        }
    }
    mainHolder[index].getElementsByClassName("header")[0].innerHTML = "Education - " + (index + 1);
}

function cloningNew(){
    var newObj = createObj();
    eduList.push(newObj);
    let allHolder = document.getElementById("edu-holder");
    allHolder.insertAdjacentHTML("beforeend", eduStruct);
    var useMe = document.getElementsByClassName("single-edu");
    if(eduList.length > 1){
        for(let x = 0; x < eduList.length; x++){
            useMe[x].getElementsByClassName("dot")[0].style.display = "block";
        }
    }
    insertInputs(eduList.length - 1);

}

var createObj = () => {
    return ({
        eduName : "",
        eduPlace : "",
        eduQualification : "",
        eduSpecialization : "",
        eduYear : ""
    });
}

var eduList = [];
var currentTab = 0; // Current tab is set to be the first tab (0)
var eduStruct = '<div class="single-edu"><div class="dot" ><p>x</p></div><div class="header">Education - </div><div class="row"><div class="col-md-8 mt-2"><label for="eduname" class="form-details"><b>Name (College/ Institute/ School)</b></label><input class="eduname" type="text" placeholder="College/ Institute/ School" name="edu" required>    </div><div class="col-md-4 mt-2"><label for="eduplace" class="form-details"><b>Place</b></label><input class="eduplace" type="text" placeholder="Place" name="edu" required>    </div></div><div class="row"><div class="col-md-4 mt-2"><label for="eduqualification" class="form-details"><b>Qualification</b></label><input class="eduqualification" type="text" placeholder="Qualification" name="edu" required>    </div><div class="col-md-4 mt-2"><label for="eduspecialization" class="form-details"><b>Specialization</b></label><input class="eduspecialization" type="text" placeholder="Specialization" name="edu" required>    </div><div class="col-md-4 mt-2"><label for="eduyear" class="form-details"><b>Year of Completion</b></label><input class="eduyear" type="text" placeholder="Place" name="edu" required>    </div></div></div></div>';
cloningNew();
//var cloningProcess = new CreateSingleEdu();

