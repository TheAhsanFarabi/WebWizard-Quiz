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
      question: "Which HTML tag is used to define an unordered list?",
      options: ["ul", "ol", "li", "list"],
      answer: "ul",
    },
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["variable x;", "var x;", "v x;", "let x;"],
      answer: "var x;",
    },
    {
      question:
        "What property is used to set the background color of an element in CSS?",
      options: [
        "background-color",
        "bgcolor",
        "color-background",
        "background",
      ],
      answer: "background-color",
    },
    {
      question:
        "What is the output of the following JavaScript code: console.log(typeof [1, 2, 3]);",
      options: ["array", "object", "number", "undefined"],
      answer: "object",
    },
    {
      question: "What function is used to output data to the screen in PHP?",
      options: ["print_r()", "echo()", "display()", "print()"],
      answer: "echo()",
    },
    {
      question: "Which CSS property is used to change the font size of text?",
      options: ["font-size", "text-size", "font-style", "text-font"],
      answer: "font-size",
    },
    {
      question: "Which tag is used to create a hyperlink in HTML?",
      options: ["url", "link", "a", "href"],
      answer: "a",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "What is the purpose of the 'alt' attribute in the <img> tag?",
      options: [
        "Alternative text for the image",
        "Alignment of the image",
        "Animation of the image",
        "Altitude of the image",
      ],
      answer: "Alternative text for the image",
    },
    {
      question:
        "What is the correct way to include an external JavaScript file?",
      options: [
        "script src='script.js'",
        "script type='text/javascript' src='script.js'",
        "script type='script/javascript' src='script.js'",
        "javascript src='script.js'",
      ],
      answer: "<script src='script.js'>",
    },
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
