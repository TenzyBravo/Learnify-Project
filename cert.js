function generateCertificate() {
  // Get current user and course data
  const currentUser = JSON.parse(localStorage.getItem('learnifyCurrentUser'));
  // Replace this with the actual logic to get the completed course ID, e.g., from localStorage or a function parameter
  const courseId = localStorage.getItem('learnifyCompletedCourseId');
  const course = coursesData[courseId];
  
  // Populate certificate data
  const certData = {
    studentName: currentUser.name,
    courseTitle: course.title,
    grade: calculateFinalGrade(), // Your grading function
    date: new Date().toLocaleDateString(),
    certId: 'LFY-' + Date.now(),
    instructor: course.instructor
  };

  // Update certificate HTML
  document.getElementById('studentName').textContent = certData.studentName;
  document.getElementById('courseTitle').textContent = certData.courseTitle;
  // ... populate other fields ...

  // Convert to image (using html2canvas library)
  html2canvas(document.querySelector('.certificate')).then(canvas => {
    const link = document.createElement('a');
    link.download = `Learnify-Certificate-${certData.courseTitle}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
}