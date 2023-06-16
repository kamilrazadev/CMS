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



const getEnrollmentStatus = localStorage.getItem('AdminEnrolllmentStatus');

function createEnrollmentBtn(onclickAction){
    const optionDiv = document.getElementById('options-div');
    const btn = document.createElement('button');
    if(getEnrollmentStatus == 'open'){
        btn.innerText = 'Close Enrollment'
    } else {
        btn.innerText = 'Open Enrollment'

    }
    btn.className = "option-btn";
    btn.addEventListener('click', onclickAction);
    optionDiv.appendChild(btn);
}

function createSemesterBtn(onclickAction){
    const optionDiv = document.getElementById('options-div');
    const btn = document.createElement('button');
    btn.innerText = 'New Semester'
    btn.className = "option-btn";
    btn.addEventListener('click', onclickAction);
    optionDiv.appendChild(btn);
}


createEnrollmentBtn(modifyEnrollment);
createSemesterBtn(modifySemester);

function modifyEnrollment(){

    if(getEnrollmentStatus == 'open'){
        localStorage.setItem('AdminEnrolllmentStatus', 'closed'); 
        location.reload();
    } else {
        localStorage.setItem('AdminEnrolllmentStatus', 'open'); 
        location.reload();
    }
}

async function modifySemester(){

    let AdminChoice = prompt(`Do You Want to Increment Semeters?
    Enter 'Yes' OR 'No'`);
    let AdminChoiceLC = AdminChoice.toLocaleLowerCase();
    if(AdminChoiceLC == 'yes' ){

        const AllStudents = await get(child(dbref, "Students"))
    if(AllStudents.exists()){
        const AllStudentsObj = AllStudents.val()
        const totalStudents = Object.keys(AllStudentsObj)
        const totalStudentsLength = totalStudents.length

        for(let i=0; i<totalStudentsLength; i++){
            update(ref(db, `Students/${totalStudents[i]}`),{
                enrollmentStatus: "Not Enrolled"
            })
            const getSemester = await get(child(dbref, `Students/${totalStudents[i]}/semester`))
        
            if(getSemester.exists()){
                const gettedSemester = getSemester.val()
                    if(gettedSemester == 'Semester1'){
                        update(ref(db, `Students/${totalStudents[i]}`),{
                            semester: "Semester2"
                        })
                    } else if(gettedSemester == 'Semester2'){
                        update(ref(db, `Students/${totalStudents[i]}`),{
                            semester: "Semester3"
                        })
                    } else if(gettedSemester == 'Semester3'){
                        update(ref(db, `Students/${totalStudents[i]}`),{
                            semester: "Semester4"
                        })
                    } else if(gettedSemester == 'Semester4'){
                        update(ref(db, `Students/${totalStudents[i]}`),{
                            semester: "Semester5"
                        })
                    } else if(gettedSemester == 'Semester5'){
                        update(ref(db, `Students/${totalStudents[i]}`),{
                            semester: "Semester6"
                        })
                    } else if(gettedSemester == 'Semester6'){
                        update(ref(db, `Students/${totalStudents[i]}`),{
                            semester: "Semester7"
                        })
                    } else if(gettedSemester == 'Semester7'){
                        update(ref(db, `Students/${totalStudents[i]}`),{
                            semester: "Semester8"
                        })
                    }
            }
    }
    
    }

   alert('New Semester Started'); 

    
    } 

}

const iconDiv = document.getElementById('account-icon');
iconDiv.innerHTML = 'A'
iconDiv.addEventListener('click', accDetails);

const accDetailsDiv = document.getElementById('acc-details');

function accDetails(){
    
    const logoutBtn = document.createElement('button');


    logoutBtn.innerText = 'LOGOUT';
    logoutBtn.className = 'logout-btn';
    logoutBtn.addEventListener('click', logoutToMain)

    if(accDetailsDiv.className.includes('disable')){

    accDetailsDiv.classList.remove('disable');
    accDetailsDiv.innerHTML = `

    <br>
    <h4 class="acc-details-text"> CMS-Admin </h4><br>
    <h4 class="acc-details-text"> Department Of Computer Science </h4><br>
    `
    accDetailsDiv.appendChild(logoutBtn);

    } else {
        accDetailsDiv.innerHTML = " ";
        accDetailsDiv.classList.add('disable');
    }
}

function logoutToMain(){
    window.location.href = '/index.html'; 
}

