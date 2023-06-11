    import {semester1, semester2} from  '/data.js'
    import { Student1, Student2, Student3, Student4, Student5, Student6, Student7 } from '/data.js';
    const AllSemesters = [semester1, semester2];
    const AllStudents = [Student1, Student2, Student3, Student4, Student5, Student6, Student7];
    const getSno = localStorage.getItem('Sno');

    const allCourseCodes = [semester1, semester2]
    const Name = localStorage.getItem('Name');
    const Id = localStorage.getItem('Id');
    const fName = localStorage.getItem('FatherName');
    const btnDiv = document.getElementById('btnDiv');
    const iconDiv = document.getElementById('account-icon');
    const enrollPanel = document.getElementById('newPanel');

    iconDiv.innerHTML = Name[0]
    iconDiv.addEventListener('click', accDetails);

function createOptionBtn(BtnValue, onclickAction){
    const optionDiv = document.getElementById('options-div');
    const btn = document.createElement('button');
    btn.innerText = BtnValue;
    btn.className = "option-btn";
    btn.addEventListener('click', onclickAction);
    optionDiv.appendChild(btn);
}
createOptionBtn("Course Enrollment", courseEnroll);
createOptionBtn("View Marks", viewMarks);
createOptionBtn("Generate Transcript", generateTranscript);
    let i;
    const AllStudentsSemeter = ["Student1Semester", "Student2Semester", "Student3Semester", "Student4Semester", "Student5Semester","Student6Semester", "Student7Semester"];

    const currSemester = localStorage.getItem(AllStudentsSemeter[(getSno-1)]);
    if( currSemester == "semester1"){
        i = 0;
    } else if( currSemester == "semester2"){
        i = 1;
    } else if( currSemester == "semester3"){
        i = 2;
    } else if( currSemester == "semester4"){
        i = 3;
    } else if( currSemester == "semester5"){
        i = 4;
    }

    const enrollmentStatusLocal = ["enrollmentStatus1", "enrollmentStatus2", "enrollmentStatus3", "enrollmentStatus4", "enrollmentStatus5", "enrollmentStatus6", "enrollmentStatus7"];
    let toSetEnrolled;
    for(let j=1; j<=AllStudents.length; j++){
        if(getSno == j){
            toSetEnrolled = enrollmentStatusLocal[j-1];
            break;
        }
    }

function courseEnroll(){

    if(localStorage.getItem(toSetEnrolled) == 'Enrolled'){
        alert("You are already Enrolled");
    }
     else{
    
    enrollPanel.innerHTML = `
    <h2 class="enroll-heading">Course Enrollment</h2>
    <br>
    <p>Course Codes: <b style="color: red;"> Follow the Serial of Given Course Code</b> <br><br>

    1) ${allCourseCodes[i].course1[1]} 
    2) ${allCourseCodes[i].course2[1]} 
    3) ${allCourseCodes[i].course3[1]} 
    4) ${allCourseCodes[i].course4[1]} 
    5) ${allCourseCodes[i].course5[1]} 
    </p>
    <br>
    <div class="course-field-div">
        <label for="course-code1" class="field-label">First Course: </label>
        <input id="course-code1" class="course-field" type="text" placeholder="Enter course code" value="${allCourseCodes[i].course1[1]}">
        <label for="course-code2" class="field-label">Second Course: </label>
        <input id="course-code2" class="course-field" type="text" placeholder="Enter course code" value="${allCourseCodes[i].course2[1]}">
        <label for="course-code3" class="field-label">Third Course: </label>
        <input id="course-code3" class="course-field" type="text" placeholder="Enter course code" value="${allCourseCodes[i].course3[1]}"> 
        <label for="course-code4" class="field-label">Fourth Course: </label>
        <input id="course-code4" class="course-field" type="text" placeholder="Enter course code" value="${allCourseCodes[i].course4[1]}">
        <label for="course-code5" class="field-label">Fifth Course: </label>
        <input id="course-code5" class="course-field" type="text" placeholder="Enter course code" value="${allCourseCodes[i].course5[1]}">
        <p style="color: red;">Note: Check all course codes<p>
    </div>

    
    `


    const iTag = document.createElement('i');
    iTag.className = "fas fa-times";
    iTag.addEventListener('click', closeNewPanel);
    enrollPanel.appendChild(iTag);

    const enrollBtn = document.createElement('button');
    enrollBtn.className = "enroll-btn";
    enrollBtn.addEventListener('click', enrollCourse);
    enrollBtn.innerText = "Enroll"
    enrollPanel.appendChild(enrollBtn);
     }
}

function viewMarks(){
    
    enrollPanel.innerHTML = `
    <h2 class="enroll-heading">Marks Details</h2>
   
    <div class="course-field-div" style="text-align:left;">
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        
        <p style="color: red;">Note: Check all course codes<p>
    </div>

    
    `


    const iTag = document.createElement('i');
    iTag.className = "fas fa-times";
    iTag.addEventListener('click', closeNewPanel);
    enrollPanel.appendChild(iTag);

}


function generateTranscript(){
    console.log("Generate Transcript")
}

function showSubjects(){
    const c1 = document.getElementById('course1');
    const c2 = document.getElementById('course2');
    const c3 = document.getElementById('course3');
    const c4 = document.getElementById('course4');
    const c5 = document.getElementById('course5');

    c1.innerText = AllSemesters[i].course1[0];
    c2.innerText =  AllSemesters[i].course2[0];
    c3.innerText =  AllSemesters[i].course3[0];
    c4.innerText =  AllSemesters[i].course4[0];
    c5.innerText =  AllSemesters[i].course5[0];    
}

if(localStorage.getItem(toSetEnrolled) == 'Enrolled'){
    showSubjects();
}


function closeNewPanel(){
    enrollPanel.innerHTML = `
        <h2>Welcome to CMS - Student Dashboard</h2>
        <br>
        <p>for any query contact <a href="https://www.linkedin.com/in/kamilraza-dev/" class="admin-link">Admin</a> </p>
    `
}



function enrollCourse(){

    
    const courseCode1 = (document.getElementById('course-code1')).value;
    const courseCode2 = (document.getElementById('course-code2')).value;
    const courseCode3 = (document.getElementById('course-code3')).value;
    const courseCode4 = (document.getElementById('course-code4')).value;
    const courseCode5 = (document.getElementById('course-code5')).value;

    if( courseCode1 == allCourseCodes[i].course1[1] && 
        courseCode2 == allCourseCodes[i].course2[1] && 
        courseCode3 == allCourseCodes[i].course3[1] && 
        courseCode4 == allCourseCodes[i].course4[1] && 
        courseCode5 == allCourseCodes[i].course5[1] 
        ){
            localStorage.setItem(toSetEnrolled, 'Enrolled');
            
            enrollPanel.innerHTML = `
            <h2>Welcome to CMS - Student Dashboard</h2>
            <br>
            <p>for any query contact <a href="https://www.linkedin.com/in/kamilraza-dev/" class="admin-link">Admin</a> </p>
        `     
        alert("You Enrolled Successfully");
        showSubjects();
    } else {
        alert(`Error: 
            1. Check all course codes
            2. Check the series (must be same as given)
                `);
    }
}
function accDetails(){
    
    const accDetailsDiv = document.getElementById('acc-details');
    const logoutBtn = document.createElement('button');
    const changePassBtn = document.createElement('button');

    changePassBtn.innerText = 'Change Password';
    changePassBtn.className = 'logout-btn';
    changePassBtn.addEventListener('click', changePassword)

    logoutBtn.innerText = 'LOGOUT';
    logoutBtn.className = 'logout-btn';
    logoutBtn.addEventListener('click', logoutToMain)

    if(accDetailsDiv.className.includes('disable')){

    accDetailsDiv.classList.remove('disable');
    accDetailsDiv.innerHTML = `

    <br>
    <h4 class="acc-details-text">Name: ${Name}</h4><br>
    <h4 class="acc-details-text">ID: ${Id}</h4><br>
    <h4 class="acc-details-text">Father Name: ${fName}</h4>
    `
    accDetailsDiv.appendChild(logoutBtn);
    accDetailsDiv.appendChild(changePassBtn);

    } else {
        accDetailsDiv.innerHTML = " ";
        accDetailsDiv.classList.add('disable');
    }
}

function logoutToMain(){
    window.location.href = '/index.html'; 
}

function changePassword(){
    console.log("Change Password");
}