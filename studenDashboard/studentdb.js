 //Connectinh Firebase
     // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getDatabase, ref, set, push, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use  
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBks0xnDhCVc9bQQcK0rjjSJl2z0TSd4N8",
    authDomain: "cmsproject-f2c9e.firebaseapp.com",
    projectId: "cmsproject-f2c9e",
    storageBucket: "cmsproject-f2c9e.appspot.com",
    messagingSenderId: "992836694446",
    appId: "1:992836694446:web:8d4c9bd17b29bc15e5983f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
    const dbref = ref(db);  

 
    const AllSemesters = ["semester1", "semester2"];
    const currSemester = localStorage.getItem('StudentSemester');
    const Name = localStorage.getItem('StudentName');
    const getSno = localStorage.getItem('StudentNumber');
    const StId = localStorage.getItem('StudentId');
    const fName = localStorage.getItem('StudentFather');

    const getEnrollmentStatus = localStorage.getItem('AdminEnrolllmentStatus');
    const enrollmentStatus = localStorage.getItem('EnrollmentStatus');
    
    const btnDiv = document.getElementById('btnDiv');
    const iconDiv = document.getElementById('account-icon');
    const enrollPanel = document.getElementById('newPanel');
 
    const courseDiv1 = document.getElementById('course1');
    const courseDiv2 = document.getElementById('course2');
    const courseDiv3 = document.getElementById('course3');
    const courseDiv4 = document.getElementById('course4');
    const courseDiv5 = document.getElementById('course5');




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

let studentFailedSubjects = '';

async function showFailedSubjects(){
  const getFailedSub = await get(child(dbref, `Students/${getSno}/failedSubjects`));
  const gettedFailedSub = getFailedSub.val()
  const failedSubNames = Object.values(gettedFailedSub)

  const failedSubjectsLength = failedSubNames.length

  for(let i=0; i<failedSubjectsLength; i++){
    studentFailedSubjects +=  `${failedSubNames[i]}, `
  }
}

function courseEnroll(){
  
  if(getEnrollmentStatus == 'open'){
  enrollPanel.innerHTML = `
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
`;
    get(child(dbref, "Students/" + getSno)).then((snapshot)=>{
        if(snapshot.exists()){
            let currSemester = snapshot.val().semester;
            if(snapshot.val().enrollmentStatus == "Enrolled"){
                alert("You are already Enrolled");
                enrollPanel.innerHTML = `
        <h2>Welcome to CMS - Student Dashboard</h2>
        <br>
        <p>for any query contact <a href="https://www.linkedin.com/in/kamilraza-dev/" class="admin-link">Admin</a> </p>
    `
            } else{
              showFailedSubjects();
                get(child(dbref, "Semesters/" + currSemester)).then((snapshot)=>{
                    if(snapshot.exists()){
                        let code1 = (snapshot.child('course1')).val().courseCode;
                        let code2 = (snapshot.child('course2')).val().courseCode;
                        let code3 = (snapshot.child('course3')).val().courseCode;
                        let code4 = (snapshot.child('course4')).val().courseCode;
                        let code5 = (snapshot.child('course5')).val().courseCode;

                        

                        enrollPanel.innerHTML = 
                    `
                    <h2 class="enroll-heading">Course Enrollment</h2>
                    <h6>You are Failed in: <b style="color: red;">${studentFailedSubjects}</b></h6>
                    <br>
                    
                    <p>Course Codes: <b style="color: red;"> Follow the Serial of Given Course Code</b> <br><br>
                    1) ${code1}
                    2) ${code2}
                    3) ${code3}
                    4) ${code4}
                    5) ${code4}
                    </p>
                    <br>
                    <div class="course-field-div">
                        <label for="course-code1" class="field-label">First Course: </label>
                        <input id="course-code1" class="course-field" type="text" placeholder="Enter course code" value="${code1}">
                        <label for="course-code2" class="field-label">Second Course: </label>
                        <input id="course-code2" class="course-field" type="text" placeholder="Enter course code" value="${code2}">
                        <label for="course-code3" class="field-label">Third Course: </label>
                        <input id="course-code3" class="course-field" type="text" placeholder="Enter course code" value="${code3}"> 
                        <label for="course-code4" class="field-label">Fourth Course: </label>
                        <input id="course-code4" class="course-field" type="text" placeholder="Enter course code" value="${code4}">
                        <label for="course-code5" class="field-label">Fifth Course: </label>
                        <input id="course-code5" class="course-field" type="text" placeholder="Enter course code" value="${code5}">
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

                    } else {
                      console.log("No Data Found!");
                    }

                  })
            
            
                
                 }
     } else {
          console.log("No Data Found!");
        }
      })

    } else{
      alert(`Enrollment is Closed please contact to Admin`);
    }

}



const courses = ['course1', 'course2', 'course3', 'course4', 'course5']
const currCourses = [];
const perSubjectMarks = [];

async function viewMarks(){
  const enrollmentStatus = localStorage.getItem('EnrollmentStatus');

  if(enrollmentStatus == 'Enrolled'){

  
    enrollPanel.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
    for(let i=0; i<5; i++){
    const snapshot = await get(child(dbref, `Students/${getSno}/${courses[i]}`))
        if(snapshot.exists()){
            currCourses[i] = snapshot.val()
        }

        const getMarks = await get(child(dbref, `Students/${getSno}/${currCourses[i]}/totalMarks`))
        if(getMarks.exists()){
            perSubjectMarks[i] = getMarks.val()
        } else {
            perSubjectMarks[i] = 'NA'
        }
    }


   


    enrollPanel.innerHTML = `
    <h2 class="enroll-heading">Marks Details</h2>
    <div class="course-field-div" style="text-align:left;" id="marks-div">
    </div>
    `
    const marksDiv = document.getElementById('marks-div');

    for(let i=0; i<5; i++){
        const newMarksRow = marksRow(currCourses[i],perSubjectMarks[i]);
        marksDiv.innerHTML += newMarksRow;
    }

    const iTag = document.createElement('i');
    iTag.className = "fas fa-times";
    iTag.addEventListener('click', closeNewPanel);
    enrollPanel.appendChild(iTag);
  } else {
    alert("You are not Enrolled");
  }
}

function marksRow(subject, marks){
    let gpa;
    let grade;
    let color;
    if (marks >= 91 && marks <= 100) {
  gpa = 4.00;
  grade = "PASSED"
  color = "green"
} else if (marks >= 80 && marks <= 90) {
  gpa = 3.66;
  grade = "PASSED"
  color = "green"
} else if (marks >= 75 && marks <= 79) {
  gpa = 3.33;
  grade = "PASSED"
  color = "green"
} else if (marks >= 71 && marks <= 74) {
  gpa = 3.00;
  grade = "PASSED"
  color = "green"
} else if (marks >= 68 && marks <= 70) {
  gpa = 2.66;
  grade = "PASSED"
  color = "green"
} else if (marks >= 64 && marks <= 67) {
  gpa = 2.33;
  grade = "PASSED"
  color = "green"
} else if (marks >= 61 && marks <= 63) {
  gpa = 2.00; 
  grade = "PASSED"
  color = "green"
} else if (marks >= 58 && marks <= 60) {
  gpa = 1.66;
  grade = "PASSED"
  color = "green"
} else if (marks >= 54 && marks <= 57) {
  gpa = 1.33;
  grade = "PASSED"
  color = "green"
} else if (marks >= 50 && marks <= 53) {
  gpa = 1.00;
  grade = "PASSED"
  color = "green"
} else if(marks=='NA'){
    gpa = 'NA'
    grade = "NA"
    color = "black"
}
    else {
  gpa = "FAIL";
  grade = 'FAILED'
  color = 'red'
}
    return `
    <label for="course-code1" class="field-label">${subject}</label><br>
    <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> ${marks} | <u style="color: rgb(0, 72, 139); text-decoration: none;">GPA :</u> ${gpa} | <span style="color: rgb(0, 72, 139);">Grade: <b style="color: ${color};">${grade}</b> </span></div><br>
    `
}


function generateTranscript(){
    console.log("Generate Transcript")
}


function showSubjects(){


    get(child(dbref, "Students/" + getSno)).then((snapshot)=>{
        if(snapshot.exists()){
            courseDiv1.innerText = snapshot.val().course1;
            courseDiv2.innerText = snapshot.val().course2;
            courseDiv3.innerText = snapshot.val().course3;
            courseDiv4.innerText = snapshot.val().course4;
            courseDiv5.innerText = snapshot.val().course5;
        } else {
          console.log("No Data Found!");
        }
      })
 
}

get(child(dbref, "Students/" + getSno)).then((snapshot)=>{
    if(snapshot.exists()){
        if(snapshot.val().enrollmentStatus == 'Enrolled'){
            showSubjects();
        }
    } else {
      console.log("No Data Found!");
    }
  })
  







function closeNewPanel(){
    enrollPanel.innerHTML = `
        <h2>Welcome to CMS - Student Dashboard</h2>
        <br>
        <p>for any query contact <a href="https://www.linkedin.com/in/kamilraza-dev/" class="admin-link">Admin</a> </p>
    `
}

function setStudenCourses(c1, c2, c3, c4, c5){
    

    const courseArray = [c1, c2, c3, c4, c5];
    for(let i=0; i<courseArray.length; i++){
        const objectRef = ref(db, `Teachers/${courseArray[i]}`);
        const arrayRef = child(objectRef, 'enrolledStudents');
    
        // Push the value into the array
        const newValueRef = push(arrayRef);
        set(newValueRef, getSno);
    }

       
    
    update(ref(db, 'Students/' + getSno),{
        course1: c1,
        course2: c2,
        course3: c3,
        course4: c4,
        course5: c5       
        
    })
    console.log("Data Saved");
}

function enrollCourse(){
                
    const courseCode1 = (document.getElementById('course-code1')).value;
    const courseCode2 = (document.getElementById('course-code2')).value;
    const courseCode3 = (document.getElementById('course-code3')).value;
    const courseCode4 = (document.getElementById('course-code4')).value;
    const courseCode5 = (document.getElementById('course-code5')).value;

    get(child(dbref, "Semesters/" + currSemester)).then((snapshot)=>{
        if(snapshot.exists()){
            let course1 = (snapshot.child('course1')).val().courseName;
            let course2 = (snapshot.child('course2')).val().courseName;
            let course3 = (snapshot.child('course3')).val().courseName;
            let course4 = (snapshot.child('course4')).val().courseName;
            let course5 = (snapshot.child('course5')).val().courseName;
            

            let code1 = (snapshot.child('course1')).val().courseCode;
            let code2 = (snapshot.child('course2')).val().courseCode;
            let code3 = (snapshot.child('course3')).val().courseCode;
            let code4 = (snapshot.child('course4')).val().courseCode;
            let code5 = (snapshot.child('course5')).val().courseCode;


                    update(ref(db, 'Students/' + getSno),{
                        enrollmentStatus: "Enrolled"                            
                      })
                      localStorage.setItem('EnrollmentStatus', 'Enrolled');
                      setStudenCourses(course1, course2,  course3, course4, course5);
                    
                    enrollPanel.innerHTML = `
                    <h2>Welcome to CMS - Student Dashboard</h2>
                    <br>
                    <p>for any query contact <a href="https://www.linkedin.com/in/kamilraza-dev/" class="admin-link">Admin</a> </p>
                `     
                alert("You Enrolled Successfully");
                showSubjects();

         

        } else {
          console.log("No Data Found!");
        }

      })

    
}
const accDetailsDiv = document.getElementById('acc-details');

function accDetails(){
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
    <h4 class="acc-details-text">ID: ${StId}</h4><br>
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
    accDetailsDiv.style.display = 'none'
    enrollPanel.innerHTML = `
    <h2 class="blue-color">Change Password</h2>
    <br><br>
    <label>Create New Password</label>
    <input type="password" id="newpass-input" class="input-fields" placeholder="Enter New Password">
    <br>
    <label>Confirm Password</label>
    <input type="password" id="confirmpass-input" class="input-fields" placeholder="Confirm Password">

    <button class="login-btn" id="updatepass-btn">Update</button>
    <br>
    <h5 style="color: red" id="checkPass"></h5>
    `

    const updatePassBtn = document.getElementById('updatepass-btn');
    updatePassBtn.addEventListener('click', updatePassword);
}

function updatePassword(){
    
    const newPass = document.getElementById('newpass-input').value;
    const ConfirmPass = document.getElementById('confirmpass-input').value;
    const checkPass = document.getElementById('checkPass');

    checkPass.innerText = ''

    if(newPass != ConfirmPass){
        checkPass.innerText = 'New Password and Confirm Password not matched'
    } else {
        update(ref(db, `Students/${getSno}`),{
          Password: newPass                  
              })
    }
}