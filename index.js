    import { Student1, Student2, Student3, Student4, Student5, Student6, Student7 } from "/data.js";    


    const containerDiv =  document.getElementById('container');

// CREATING INPUT FIELDSS
function inputDiv(inputElem, placeHolder, inputFieldID, fontawsomeClass, fieldType){
    
    containerDiv.innerHTML += `
    <div class="input-div">
    <h4>${inputElem}</h4>
    <i class="${fontawsomeClass}"></i>
    <input id="${inputFieldID}" class="input-fields" type="${fieldType}" placeholder="${placeHolder}">
    </div>
    `

}  

inputDiv("ID: ", "e.g. CSC-22S-XXX", "idInput", "fas fa-user", "text");
inputDiv("Password: ", "Password", "passwordInput", "fas fa-lock", "password");
//  CREATE LOGIN BUTTON
const loginBtn =  document.createElement('button');
loginBtn.innerText = "LOGIN";
loginBtn.className = "login-btn"
containerDiv.appendChild(loginBtn)
// LOGIN FUNCTION**********************************
// let fetchedPassword = passwordInput.value;
loginBtn.onclick =  function login(){

        const idInput = document.getElementById('idInput');
        const passwordInput = document.getElementById('passwordInput');
    const AllStudents = [Student1, Student2, Student3, Student4, Student5, Student6, Student7];
    const AllStudentsSemeter = ["Student1Semester", "Student2Semester", "Student3Semester", "Student4Semester", "Student5Semester","Student6Semester", "Student7Semester"];

    let toLogin = false;

    let getId = idInput.value ;
    let getPassword = passwordInput.value;

    
    if(getId ==  "" || getPassword == ""){
        alert("All Fields are Required!");
    } else{
    for(let i=0; i<AllStudents.length; i++){
        if(getId == AllStudents[i].StId || getId == AllStudents[i].StId.toLowerCase()){
            if(getPassword == AllStudents[i].Password){                  
                
                    localStorage.setItem('Password', AllStudents[i].Password);
                    localStorage.setItem('Name', AllStudents[i].StName);
                    localStorage.setItem('Id', AllStudents[i].StId);
                    localStorage.setItem('FatherName', AllStudents[i].FatherName);
                    localStorage.setItem('Sno', AllStudents[i].S_no);
                    
                    let getSemester = localStorage.getItem(AllStudentsSemeter[i]);

                    if(getSemester == "nil"){
                        localStorage.setItem(AllStudentsSemeter[i], "semester1");
                    }
                    
                    toLogin = true;
            }
        } 
    }
    console.log(getPassword)
    if(toLogin){
        window.location.href = '/studenDashboard/studendashboard.html'; 
    } else {
        alert("Wrong Details");
    }
}

}




    