 //Connecting Firebase
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

    const iconDiv = document.getElementById('account-icon');
    iconDiv.addEventListener('click', accDetails);

     const TeacherName = localStorage.getItem('TeacherName');

    iconDiv.innerText = TeacherName[0]

function createOptionBtn(BtnValue, onclickAction){
    const optionDiv = document.getElementById('options-div');
    const btn = document.createElement('button');
    btn.innerText = BtnValue;
    btn.className = "option-btn";
    btn.addEventListener('click', onclickAction);
    optionDiv.appendChild(btn);
}
createOptionBtn("Assign Marks", assignMarks);

    const viewMarksPanel = document.getElementById('newPanel');

function createMarksRow(StudentName, StudentId ,i){

    const AssignmentId = 'Assignment'+i;
    const QuizId = 'Quiz'+i;
    const MidId = 'Mid'+i;
    const ProjectId = 'Project'+i;
    const FinalId = 'Final'+i;
    const StName = 'Name'+i;
    

    return `<tr class="markstable-row">
    <td id="${StName}">${StudentName}</td>
    <td>${StudentId}</td>
    <td>
        <input type="text" placeholder="Assignment Marks" class="markstable-input" id="${AssignmentId}" value='0'>
    </td>
    <td>
        <input type="text" placeholder="Quiz Marks" class="markstable-input" id="${QuizId}" value='0'>
    </td>
    <td>
        <input type="text" placeholder="Mid Marks" class="markstable-input" id="${MidId}" value='0'>
    </td>
    <td>
        <input type="text" placeholder="Project Marks" class="markstable-input" id="${ProjectId}" value='0'>
    </td>
    <td>
        <input type="text" placeholder="Final Marks" class="markstable-input" id="${FinalId}" value='0'> 
    </td>
</tr>`
}

let keyValue;

async function assignMarks() {

    viewMarksPanel.innerHTML = `
          <h2 class="enroll-heading">Marks Details</h2>
         
          <table class="markstable" style="text-align:left;">
          
              <tr class="markstable-row">
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Assignment</th>
                  <th>Quiz</th>
                  <th>Mid Term</th>
                  <th>Project</th>
                  <th>Final Exam</th>
              </tr>
          </table>
      `;
  
      const iTag = document.createElement('i');
      iTag.className = "fas fa-times";
      iTag.addEventListener('click', closeNewPanel);
      viewMarksPanel.appendChild(iTag);
  
      const enrollBtn = document.createElement('button');
      enrollBtn.className = "enroll-btn";
      enrollBtn.addEventListener('click', getMarks);
      enrollBtn.innerText = "Save All"
      viewMarksPanel.appendChild(enrollBtn);



    const snapshot = await get(
      child(
        dbref,
        `Teachers/${localStorage.getItem('TeacherSubject')}/enrolledStudents`
      )
    );
    if (snapshot.exists()) {
      let newObj = snapshot.val();
      let lengthOfObj = Object.keys(newObj).length;
      localStorage.setItem('Iteration', lengthOfObj);
      keyValue = Object.values(newObj);
  
      for (let i = 0; i < lengthOfObj; i++) {
        const studentId = keyValue[i];
        const studentSnapshot = await get(child(dbref, `Students/${studentId}`));
        if (studentSnapshot.exists()) {
          let studentData = studentSnapshot.val();
          let studentName = studentData.StName;
          let studentId = studentData.StId;
          let rowHtml = createMarksRow(studentName, studentId, i);
          document.querySelector('.markstable').innerHTML += rowHtml;
        
        } else {
          console.log('No Data Found!');
        }
      }
    } else {
      alert('No Student Enrolled!');
    }
}

function closeNewPanel(){
    viewMarksPanel.innerHTML = `
        <h2>Welcome to CMS - Teacher Dashboard</h2>
        <br>
        <p>for any query contact <a href="https://www.linkedin.com/in/kamilraza-dev/" class="admin-link">Admin</a> </p>
    `
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
    <h4 class="acc-details-text">Name: ${localStorage.getItem('TeacherName')}</h4><br>
    <h4 class="acc-details-text">Designation: ${localStorage.getItem('Designation')}</h4><br>
    <h4 class="acc-details-text">Course: ${localStorage.getItem('TeacherSubject')}</h4>
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
    viewMarksPanel.innerHTML = `
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
        update(ref(db, `Teachers/${localStorage.getItem('TeacherSubject')}`),{
          Password: newPass                  
              })
              alert('Password Updated');
    }
}

function getMarks(){
    
    const Subject = localStorage.getItem('TeacherSubject');
    const iteration = localStorage.getItem('Iteration');
    let grade;

    for(let i=0; i<iteration; i++){
        
        const AssignmentId = 'Assignment'+i;
        const QuizId = 'Quiz'+i;
        const MidId = 'Mid'+i;
        const ProjectId = 'Project'+i;
        const FinalId = 'Final'+i;

        const stringMarks = `${document.getElementById(AssignmentId).value} + ${document.getElementById(QuizId).value} + ${document.getElementById(MidId).value} + ${document.getElementById(ProjectId).value} + ${document.getElementById(FinalId).value}`
        const totalMarks = eval(stringMarks);

        if(totalMarks<50){
            grade = 'FAILED'

            const objectRef = ref(db, `Students/${keyValue[i]}`);
            const arrayRef = child(objectRef, 'failedSubjects');
    
        // Push the value into the array
            const newValueRef = push(arrayRef);
            set(newValueRef, Subject);

            } else {
                grade = 'PASSED'
            }

            set(ref(db, `Students/${keyValue[i]}/${Subject}`),{
                totalMarks : totalMarks,
                grade: grade
            })        
        
    }
    alert('Marks Saved');

    closeNewPanel();
}


