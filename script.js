document.addEventListener("DOMContentLoaded", function() {
    
     const navLinks = document.querySelectorAll(".sidebar nav ul li a");
     const pageSections = document.querySelectorAll(".page-section");
     const historyTableBody = document.querySelector("#history-table tbody");
     const themeSelect = document.getElementById("theme-select");
     const resetDataButton = document.getElementById("reset-data");
     const attendanceForm = document.getElementById("attendance-form");

     // Function to show a section and hide others
     function showSection(sectionId) {
         pageSections.forEach(section => {
             section.classList.remove("active");
         });
         document.getElementById(sectionId).classList.add("active");
     }

     // Add click event listeners to navigation links
     navLinks.forEach(link => {
         link.addEventListener("click", function(event) {
             event.preventDefault();
             const sectionId = this.getAttribute("data-section");
             showSection(sectionId);
         });
     });

     // Load attendance records into the history table
     function loadAttendanceRecords() {
         const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
         historyTableBody.innerHTML = ''; // Clear existing table rows
         attendanceRecords.forEach(record => {
             const row = document.createElement("tr");
             row.innerHTML = `
                 <td>${record.name}</td>
                 <td>${record.id}</td>
                 <td>${record.class}</td>
                 <td>${record.date}</td>
                 <td>${record.status}</td>`;
             historyTableBody.appendChild(row);
         });
     }

     // Load saved theme preference
     const savedTheme = localStorage.getItem("theme");
     if (savedTheme) {
         document.body.className = savedTheme;
         themeSelect.value = savedTheme; // Set the theme select dropdown
     }

     // Theme selection
     themeSelect.addEventListener("change", function() {
         const selectedTheme = themeSelect.value;
         document.body.className = selectedTheme; // Apply selected theme
         localStorage.setItem("theme", selectedTheme); // Save theme preference
     });

     // Reset data
     resetDataButton.addEventListener("click", function() {
         if (confirm("Are you sure you want to reset all data?")) {
             localStorage.clear();
             alert("All data has been reset.");
             loadAttendanceRecords(); // Reload the table
         }
     });

     // Handle form submission for adding attendance record
     attendanceForm.addEventListener("submit", function(event) {
         event.preventDefault(); // Prevent default form submission

         // Get form values
         const name = document.getElementById("student-name").value.trim();
         const id = document.getElementById("student-id").value.trim();
         const studentClass = document.getElementById("student-class").value.trim();
         const date = document.getElementById("attendance-date").value.trim();
         const status = document.getElementById("attendance-status").value;

         // Create a record object
         const record = { name, id, studentClass, date, status };

         // Save record in local storage
         let attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
         attendanceRecords.push(record);
         localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));

         // Clear form fields after submission
         attendanceForm.reset();

         // Load updated records in history table
         loadAttendanceRecords();
     });

     // Load attendance records on page load
     loadAttendanceRecords();

     // Show default section (Home)
     showSection("home");
});
               
