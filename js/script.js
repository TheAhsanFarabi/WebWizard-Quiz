document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  let currentQuestionIndex = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        "Harper Lee",
        "Mark Twain",
        "Ernest Hemingway",
        "F. Scott Fitzgerald",
      ],
      answer: "Harper Lee",
    },
    // Add more questions as needed
  ];

  function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
            <h6>${questionData.question}</h6>
            ${questionData.options
              .map(
                (option, index) => `
                <div class="form-check option">
                    <input class="form-check-input" type="radio" name="option" id="option${index}" value="${option}">
                    <label class="form-check-label" for="option${index}">
                        ${option}
                    </label>
                </div>
            `
              )
              .join("")}
        `;
  }

  nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );
    if (selectedOption) {
      if (selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
      }
    } else {
      alert("Please select an option!");
    }
  });

  submitBtn.addEventListener("click", () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
      generateCertificate();
    } else {
      alert("Sorry, you did not pass. Try again!");
      location.reload();
    }
  });

  function generateCertificate() {
    // Use jsPDF or a similar library to generate a PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Certificate of Achievement", 20, 20);
    doc.text(
      `Congratulations! You scored ${score} out of ${questions.length}`,
      20,
      30
    );
    doc.save("certificate.pdf");
  }

  // Show the first question initially
  showQuestion();
});
