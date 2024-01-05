Code Assess Features
- embedded in martyblocks
- google classroom login
    - class management (add, remove, add students, remove students) can only be done in google classroom
- class overview
    - teacher
        - class name
        - class subject
        - number of enrolled students
    - student
        - class name
        - class subject
        - join/exit class button
- students overview
    - teacher
        - quick view of enrolled students
            - student name
            - student scores
            - student activity status
        - detailed view of each student
            - latest assessment score
                - current session
            - badges
                - all sessions
            - performance history
                - need at least 5 sessions to show performance history
- class announcements
    - teacher
        - create new announcement
            - text announcement 
            - emoji feedback
        - view all announcements
    - student
        - receive announcements
- badges
    - students can earn badges if they achieve a certain score in an assessment
    - badges have stars 
        - each star represents a different type of assessment within a subject 
        - each star can have 3 levels: bronze, silver, gold
            - each level can be earned by achieving a certain score in an assessment
    - badges can be viewed in the student overview
    - badges show up as a gamified pop up when earned

Code Assess Testing
- test the user can login with google classroom

Teacher
- test the teacher can see the class overview ✅
- test the teacher can see the students overview ✅
- test the teacher can see the class announcements ✅
- test the teacher can see the student latest assessment score ✅
- test the teacher can see the student badges ✅
- test the teacher can see the student performance history ✅

- test what happens when there are no classes ✅
- test what happens when there are no students in the class ✅

- in the students overview, test the student spider graphs update real-time ✅

- test what happens when the teacher visits the code assess, logs in, and then leaves the tab ✅
    - geting back in should not require login ✅
    - the teacher should be able to see the overview of the class ✅
    - the teacher should be able to see the overview of the students ✅
    - the teacher should be able to see the announcements ✅

- test with multiple classes ✅
    - navigate between classes and make sure everything works correctly ✅

- test with multiple students ✅
    - in the student's overview, navigate between students and make sure everything works correctly ✅

- announcements
    - test the teacher can create a new announcement ✅
        - emoji announcement ✅
        - text announcement ✅
        - (from the student side, check that the announcement shows up) ✅
    - test the teacher can see all announcements ✅
    - test the teacher can sort announcements by date / responses ✅


Student
- test the student can see the class overview ✅
- test the student can see their progress ✅
- test the student can see their badges ✅
- test the student can join a class ✅
- test the student can exit a class ✅
- test the student sends data to db when they are programming ✅
- test the student can see the badges pop up when they occur ✅
- test the student can see the class announcements when they are created ✅
- test the student can't see an already seen announcement ✅

- test what happens when there are no classes  ✅

- test with multiple classes ✅
    - navigate between classes and make sure everything works correctly  ✅

- test what happens when the student visits the code assess, logs in, and then leaves the tab ✅
    - geting back in should not require login ✅
    - the student should be able to see the overview of the class ✅
    - the student should be able to see their progress ✅