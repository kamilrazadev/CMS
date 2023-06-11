    const iconDiv = document.getElementById('account-icon');
    iconDiv.addEventListener('click', accDetails);


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

function assignMarks(){

    
    viewMarksPanel.innerHTML = `
        <h2 class="enroll-heading">Marks Details</h2>
       
        <table class="markstable" style="text-align:left;">
        
        <!-- <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
        <label for="course-code1" class="field-label">Course1 Name</label><br>
        <div class="field-label"> <u style="color: rgb(0, 72, 139); text-decoration: none;">Total Marks:</u> 100 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> 89 | <u style="color: rgb(0, 72, 139); text-decoration: none;">Obtained Marks:</u> A</div><br>
         -->
            <tr class="markstable-row">
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Assignment</th>
                <th>Quiz</th>
                <th>Mid Term</th>
                <th>Project</th>
                <th>Final Exam</th>
            </tr>

            <tr class="markstable-row">
                <td>M Kamil Raza</td>
                <td>CSC-22S-136</td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input" > 
                </td>
            </tr>

            <tr class="markstable-row">
                <td>M Kamil Raza</td>
                <td>CSC-22S-136</td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input">
                </td>
                <td>
                    <input type="text" placeholder="Enter Marks" class="markstable-input"> 
                </td>
            </tr>



         </table>
    
        
        `
    
    
        const iTag = document.createElement('i');
        iTag.className = "fas fa-times";
        iTag.addEventListener('click', closeNewPanel);
        viewMarksPanel.appendChild(iTag);

        const enrollBtn = document.createElement('button');
        enrollBtn.className = "enroll-btn";
        enrollBtn.addEventListener('click', saveMarks);
        enrollBtn.innerText = "Save All"
        viewMarksPanel.appendChild(enrollBtn);
    
}

function closeNewPanel(){
    viewMarksPanel.innerHTML = `
        <h2>Welcome to CMS - Teacher Dashboard</h2>
        <br>
        <p>for any query contact <a href="https://www.linkedin.com/in/kamilraza-dev/" class="admin-link">Admin</a> </p>
    `
}

function saveMarks(){
    closeNewPanel();
    console.log("Marks Saved");
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
    <h4 class="acc-details-text">Name: Kamil Raza</h4><br>
    <h4 class="acc-details-text">ID: 12321</h4><br>
    <h4 class="acc-details-text">Designation : Lecturer</h4>
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