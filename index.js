//Connecting Firebase
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
    import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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

    const containerDiv =  document.getElementById('container');

// CREATING INPUT FIELDSS
function inputDiv(inputElem, placeHolder, inputFieldID, fontawsomeClass, fieldType){
    
    containerDiv.innerHTML += `
    <div class="input-div">
    <h4>${inputElem}</h4>
    <i class="${fontawsomeClass}"></i>
    <input id="${inputFieldID}" class="input-fields" type="${fieldType}" placeholder="${placeHolder}" required>
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

loginBtn.onclick =  function login(){

    const idInput = document.getElementById('idInput');
    const passwordInput = document.getElementById('passwordInput');
    const AllStudents = ["Student1", "Student2", "Student3", "Student4", "Student5","Student6", "Student7"];
    const AllSubjects = [
        "Programming Fundamentals", "Applied Physics", "English Comprehension & Composition", "Introduction to Computer Technology", "Calculus & Analytical Geometery",
        "Object Oriented Programming", "Communication & Presentation Skills", "Probability & Statistics", "Arabic I", "Digital Electronics"
    ];

    let getId = idInput.value ;
    let getPassword = passwordInput.value;

    for(let i=0; i<AllStudents.length; i++){

        get(child(dbref, "Students/" + AllStudents[i])).then((snapshot)=>{
            if(snapshot.exists()){
                if(getId == snapshot.val().StId && getPassword == snapshot.val().Password){
                    window.location.href = '/studenDashboard/studendashboard.html';
                    localStorage.setItem('StudentNumber', AllStudents[i]);

                    localStorage.setItem('StudentName', snapshot.val().StName);
                    localStorage.setItem('StudentId', snapshot.val().StId);
                    localStorage.setItem('StudentFather', snapshot.val().FatherName);
                    localStorage.setItem('StudentSemester', snapshot.val().semester);
                    localStorage.setItem('EnrollmentStatus', snapshot.val().enrollmentStatus);
                } 

            } else {
              alert("Wrong Details!");
            }
          })
    }

    for(let i=0; i<AllSubjects.length; i++){
        get(child(dbref, "Teachers/" + AllSubjects[i])).then((snapshot)=>{
            if(snapshot.exists()){
                if(getId == snapshot.val().TeacherId && getPassword == snapshot.val().Password){
                    window.location.href = '/teacherDashboard/teacherdashboard.html';
                    localStorage.setItem('TeacherSubject', AllSubjects[i]);
                    localStorage.setItem('TeacherName', snapshot.val().TeacherName);
                    localStorage.setItem('TeacherId', snapshot.val().TeacherId);
                    localStorage.setItem('Designation', snapshot.val().Designation);
                    
                } 

            } else {
              alert("Wrong Details!");
            }
          })

        }

        if(getId == 'admin@12' && getPassword == 'adminpass@12'){
            window.location.href = './admin/admin.html';
        } else {
            containerDiv.innerHTML += `<p style="color: red; font-weight: bolder;">Wrong Details</p>`
        }
    }    
