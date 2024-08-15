



  





/*
const go_btn=document.getElementById('gobtn');
const sliders=document.getElementById('sliders-cont');
go_btn.addEventListener('click',() => {
    sliders.style.display="flex";
});
*/




document.getElementById('gobtn').addEventListener('click', function () {
  var month = document.getElementById('Month').value;
  var grade = document.getElementById('Grade').value;
  var subject = document.getElementById('Subject').value;
  var chapter = document.getElementById('Chapter').value;

  if (month === 'Month' || grade === 'Grade' || subject === 'Subject' || chapter === 'Chapter') {
    alert("Please select all options");
  } else {
    document.getElementById('topic-sl-cont').style.display = 'flex';
  }
  var select1 = document.getElementById('Month');
  var select2 = document.getElementById('Grade');
  var select3 = document.getElementById('Subject');
  var select4 = document.getElementById('Chapter');

  var selectedoption1 = select1.options[select1.selectedIndex].text;
  var selectedoption2 = select2.options[select2.selectedIndex].text;
  var selectedoption3 = select3.options[select3.selectedIndex].text;
  var selectedoption4 = select4.options[select4.selectedIndex].text;

  document.getElementById("month-d").textContent = selectedoption1;
  document.getElementById("grade-d").textContent = selectedoption2;
  document.getElementById("subj-d").textContent = selectedoption3;
  document.getElementById("ch-d").textContent = selectedoption4;
  document.getElementById("topic-d").textContent =topics[cindex];
  topicprb.style.color='white';
  subtopic_change();
  subtopicprev.style.color='white';
  

});


