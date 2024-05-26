document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const resultAlert = document.getElementById("result-alert");
  const nameInputContainer = document.getElementById("name-input-container");
  const generateCertificateBtn = document.getElementById(
    "generate-certificate-btn"
  );
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
          <h6 class="mb-4">${questionData.question}</h6>
          ${questionData.options
            .map(
              (option, index) => `
              <div class="form-check option mb-2">
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
      showResult("Congratulations! You passed the quiz.", "success");
      nameInputContainer.style.display = "block";
    } else {
      showResult("Sorry, you did not pass. Try again!", "danger");
    }
  });

  generateCertificateBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    if (name) {
      generateCertificate(name);
    } else {
      alert("Please enter your name!");
    }
  });

  function showResult(message, type) {
    resultAlert.className = `alert alert-${type}`;
    resultAlert.textContent = message;
    resultAlert.style.display = "block";
  }

  function generateCertificate(name) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Certificate of Achievement", 20, 20);
    doc.text(`Congratulations, ${name}!`, 20, 30);
    doc.text(`You scored ${score} out of ${questions.length}`, 20, 40);
    doc.save("certificate.pdf");
  }

  // Show the first question initially
  showQuestion();
});
