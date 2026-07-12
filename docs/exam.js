//@ts-check
(() => {
    /** @type HTMLElement */
    const E_Exam = document.querySelector('.exam') ?? new HTMLElement;
    /** @type HTMLButtonElement */
    const E_ShowAnswer = document.querySelector('#show-answer') ?? new HTMLButtonElement;
    /** @type HTMLButtonElement */
    const E_Print = document.querySelector('#print') ?? new HTMLButtonElement;

    // Menu Buttons
    E_ShowAnswer.addEventListener('click', () => {
        if (E_Exam.classList.contains('show-answer')) {
            E_ShowAnswer.innerText = 'Show Ans.';
        } else {
            E_ShowAnswer.innerText = 'Hide Ans.';
        }
        E_Exam.classList.toggle('show-answer');
    });
    E_Print.addEventListener('click', () => {
        window.print();
    });


    function FillAnswers() {
        /** @type HTMLElement */
        const E_Answers = document.querySelector('.answers') ?? new HTMLElement;
        /** @type Element[] */
        const EL_Answers = [...E_Answers.querySelectorAll('td:nth-child(3n+2)')];
        /** @type HTMLElement[] */
        const EL_Questions = [...document.getElementsByTagName('article')];

        /** @type number[] */
        let indexToAnswer = [];
        if (E_Answers.classList.contains('rev15')) {
            indexToAnswer = [
                0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
                1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21,
                22, 25, 28, 31, 34, 37, 40, 43,
                23, 26, 29, 32, 35, 38, 41, 44,
                24, 27, 30, 33, 36, 39, 42, 45
            ];
        }

        EL_Questions.forEach((E_Article, index) => {
            if (index >= indexToAnswer.length) return;
            const answerIndex = indexToAnswer[index];
            const answer = EL_Answers[answerIndex].innerHTML;
            const multipleChoiceIndex = "①②③④⑤".indexOf(answer);
            if (multipleChoiceIndex != -1) {
                // Multiple Choice: Find the list element with index
                const EL_Choices = E_Article.querySelectorAll(":is(article > ol, .select) li");
                if (multipleChoiceIndex >= EL_Choices.length) return;
                EL_Choices[multipleChoiceIndex].classList.add('ans');
                return;
            }
            // Short Answer: Add an answer element
            // <div class="ans"><span>[Answer]</span></div>
            const E_Answer = document.createElement('div');
            E_Answer.classList.add('ans');
            const E_AnswerSpan = document.createElement('span');
            E_AnswerSpan.innerText = answer;
            E_Answer.appendChild(E_AnswerSpan);
            E_Article.appendChild(E_Answer);
        });
    }
    FillAnswers();
})();