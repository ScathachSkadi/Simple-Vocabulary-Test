document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'ko';

    const i18n = {
        ko: {
            // Index Page
            wordTest: '단어 시험',
            createAndTakeTests: '온라인으로 간편하게 단어 시험을 만들고 응시하세요.',
            createTest: '시험 만들기',
            editTest: '기존 시험 수정하기',
            viewResults: '학생 결과 확인하기',
            pasteEditLink: '수정할 시험 링크를 여기에 붙여넣으세요',
            loadTest: '시험 불러오기',
            pasteResultsLink: '결과를 확인할 시험 링크를 여기에 붙여넣으세요',
            loadResults: '결과 불러오기',
            english: 'English',
            // Teacher Page
            createTestTitle: '시험 만들기',
            enterWordsAndPass: '단어와 뜻을 입력하고, 수정을 위한 비밀번호를 설정하세요.',
            testTitle: '시험 제목',
            testTitlePlaceholder: '예: DTM 1과 단어 시험',
            term: '제시어',
            definition: '답',
            enterOnePerLine: '한 줄에 하나씩 입력하세요',
            shuffleWords: '단어 순서 섞기',
            swapTermDef: '제시어-답 바꾸기',
            editPassword: '수정용 비밀번호',
            passwordPlaceholder: '비밀번호를 입력하지 않으면 수정이 불가합니다.',
            generateLink: '시험 링크 생성',
            generatedLink: '생성된 시험 링크:',
            copy: '복사',
            backToMain: '메인으로 돌아가기',
            // Test Page
            enterName: '이름을 입력하세요',
            studentNamePlaceholder: '홍길동',
            startTest: '시험 시작',
            enterAnswer: '여기에 답을 입력하세요',
            prev: '이전',
            next: '다음',
            finish: '완료',
            testResultsTitle: '시험 결과',
            totalScore: '총점',
            retryTest: '다시 풀기',
            invalidAccess: '잘못된 접근입니다.',
            useTestLink: '선생님께 받은 시험 링크로 접속해주세요.',
            // Alerts & Prompts
            invalidLink: '유효하지 않은 링크입니다.',
            enterPasswordForResults: '결과를 보려면 비밀번호를 입력하세요:',
            incorrectPassword: '비밀번호가 틀렸습니다.',
            noResults: '아직 제출된 결과가 없습니다.',
            failedToLoadResults: '결과를 불러오는 데 실패했습니다. 링크가 올바른지 확인해주세요.',
            enterPasswordForEdit: '이 시험을 수정하려면 비밀번호를 입력하세요:',
            failedToLoadTest: '시험 데이터를 불러오는 데 실패했습니다. 링크가 올바른지 확인해주세요.',
            pleaseEnterWords: '단어를 입력해주세요.',
            wordCountMismatch: '입력된 한국어 뜻과 영어 단어의 개수가 일치하지 않습니다.',
            linkCopied: '링크가 복사되었습니다!',
            pleaseEnterName: '이름을 입력해주세요.',
            wordTestDefault: '단어 시험',
        },
        en: {
            // Index Page
            wordTest: 'Word Test',
            createAndTakeTests: 'Easily create and take word tests online.',
            createTest: 'Create Test',
            editTest: 'Edit Existing Test',
            viewResults: 'Check Student Results',
            pasteEditLink: 'Paste the test link to edit here',
            loadTest: 'Load Test',
            pasteResultsLink: 'Paste the test link to check results here',
            loadResults: 'Load Results',
            korean: '한국어',
            // Teacher Page
            createTestTitle: 'Create Test',
            enterWordsAndPass: 'Enter the words and their meanings, and set a password for editing.',
            testTitle: 'Test Title',
            testTitlePlaceholder: 'e.g., DTM Unit 1 Vocabulary Test',
            term: 'Term',
            definition: 'Definition',
            enterOnePerLine: 'Enter one per line',
            shuffleWords: 'Shuffle Word Order',
            swapTermDef: 'Swap Term/Definition',
            editPassword: 'Edit Password',
            passwordPlaceholder: "If you don't set a password, you can't edit it.",
            generateLink: 'Generate Test Link',
            generatedLink: 'Generated Test Link:',
            copy: 'Copy',
            backToMain: 'Back to Main',
            // Test Page
            enterName: 'Enter your name',
            studentNamePlaceholder: 'John Doe',
            startTest: 'Start Test',
            enterAnswer: 'Enter your answer here',
            prev: 'Previous',
            next: 'Next',
            finish: 'Finish',
            testResultsTitle: 'Test Results',
            totalScore: 'Total Score',
            retryTest: 'Retry Test',
            invalidAccess: 'Invalid Access.',
            useTestLink: 'Please use the test link provided by the teacher.',
            // Alerts & Prompts
            invalidLink: 'Invalid link.',
            enterPasswordForResults: 'Please enter the password to view the results:',
            incorrectPassword: 'Incorrect password.',
            noResults: 'No results submitted yet.',
            failedToLoadResults: 'Failed to load results. Please check if the link is correct.',
            enterPasswordForEdit: 'Please enter the password to edit this test:',
            failedToLoadTest: 'Failed to load test data. Please check if the link is correct.',
            pleaseEnterWords: 'Please enter words.',
            wordCountMismatch: 'The number of terms and definitions does not match.',
            linkCopied: 'Link copied!',
            pleaseEnterName: 'Please enter your name.',
            wordTestDefault: 'Word Test',
        }
    };

    const t = i18n[lang];

    function setLanguageContent() {
        // Universal elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (el.placeholder) {
                    el.placeholder = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });
        document.title = t.wordTest;
    }

    // --- Index Page Logic ---
    if (pathname.endsWith('/') || pathname.includes('index')) {
        document.title = t.wordTest;
        document.querySelector('h1').textContent = t.wordTest;
        document.querySelector('p.lead').textContent = t.createAndTakeTests;
        document.querySelector('a.btn-primary').textContent = t.createTest;
        document.getElementById('edit-test-btn').textContent = t.editTest;
        document.getElementById('view-results-btn').textContent = t.viewResults;
        document.querySelector('#edit-test-section h4').textContent = t.editTest;
        document.getElementById('load-link-input').placeholder = t.pasteEditLink;
        document.getElementById('load-link-btn').textContent = t.loadTest;
        document.querySelector('#view-results-section h4').textContent = t.viewResults;
        document.getElementById('results-link-input').placeholder = t.pasteResultsLink;
        document.getElementById('load-results-btn').textContent = t.loadResults;
        const langSwitcher = document.getElementById('lang-switcher');
        langSwitcher.textContent = lang === 'ko' ? t.english : t.korean;
        langSwitcher.href = `index.html?lang=${lang === 'ko' ? 'en' : 'ko'}`;
        document.querySelector('a.btn-primary').href = `teacher.html?lang=${lang}`

        const editTestBtn = document.getElementById('edit-test-btn');
        const viewResultsBtn = document.getElementById('view-results-btn');
        const editTestSection = document.getElementById('edit-test-section');
        const viewResultsSection = document.getElementById('view-results-section');
        const loadLinkBtn = document.getElementById('load-link-btn');
        const loadResultsBtn = document.getElementById('load-results-btn');

        editTestBtn.addEventListener('click', () => {
            editTestSection.style.display = 'block';
            viewResultsSection.style.display = 'none';
        });

        viewResultsBtn.addEventListener('click', () => {
            viewResultsSection.style.display = 'block';
            editTestSection.style.display = 'none';
        });

        loadLinkBtn.addEventListener('click', () => {
            const link = document.getElementById('load-link-input').value;
            const hash = link.split('#')[1];
            if (!hash) {
                alert(t.invalidLink);
                return;
            }
            window.location.href = `teacher.html?lang=${lang}#${hash}`;
        });

        loadResultsBtn.addEventListener('click', () => {
            const link = document.getElementById('results-link-input').value;
            const hash = link.split('#')[1];
            if (!hash) {
                alert(t.invalidLink);
                return;
            }
            
            try {
                const decodedString = atob(hash);
                const parsedData = JSON.parse(decodedString);
                
                const testData = {
                    p: parsedData.p || ''
                };
                
                if (testData.p) {
                    const enteredPassword = prompt(t.enterPasswordForResults);
                    if (enteredPassword !== testData.p) {
                        alert(t.incorrectPassword);
                        return;
                    }
                }
                
                const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
                const testResults = allResults.filter(r => r.testId === '#' + hash);
                const resultsContainer = document.getElementById('results-container');
                resultsContainer.style.display = 'block';
                if (testResults.length === 0) {
                    resultsContainer.innerHTML = `<p>${t.noResults}</p>`;
                    return;
                }
                let tableHtml = `<table class="table table-striped"><thead><tr><th>${lang === 'ko' ? '학생 이름' : 'Student Name'}</th><th>${lang === 'ko' ? '점수' : 'Score'}</th><th>${lang === 'ko' ? '제출 시간' : 'Submission Time'}</th><th>${lang === 'ko' ? '상세' : 'Details'}</th></tr></thead><tbody>`;
                testResults.forEach((result, index) => {
                    tableHtml += `<tr>
                        <td>${result.studentName}</td>
                        <td>${result.score}</td>
                        <td>${new Date(result.timestamp).toLocaleString()}</td>
                        <td><button class="btn btn-sm btn-info" data-index="${index}">${lang === 'ko' ? '보기' : 'View'}</button></td>
                    </tr>`;
                });
                tableHtml += '</tbody></table>';
                resultsContainer.innerHTML = tableHtml;
                resultsContainer.addEventListener('click', function(e) {
                    if (e.target && e.target.matches('button.btn-info')) {
                        const index = e.target.getAttribute('data-index');
                        showResultDetails(testResults[index], index);
                    }
                });
                function showResultDetails(result, index) {
                    let detailsHtml = `<table class="table"><thead><tr><th>${lang === 'ko' ? '문제' : 'Question'}</th><th>${lang === 'ko' ? '정답' : 'Correct Answer'}</th><th>${lang === 'ko' ? '학생 답안' : 'Student Answer'}</th><th>${lang === 'ko' ? '결과' : 'Result'}</th></tr></thead><tbody>`;
                    result.results.forEach(item => {
                        detailsHtml += `<tr class="${item.isCorrect ? 'table-success' : 'table-danger'}">
                            <td>${item.question}</td>
                            <td>${item.answer}</td>
                            <td>${item.userAnswer}</td>
                            <td>${item.isCorrect ? 'O' : 'X'}</td>
                        </tr>`;
                    });
                    detailsHtml += '</tbody></table>';
                    const modalId = `details-modal-${index}`;
                    const existingModal = document.getElementById(modalId);
                    if (existingModal) existingModal.remove();
                    const modalHtml = `
                        <div class="modal fade" id="${modalId}" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">${result.studentName}${lang === 'ko' ? ' 학생 결과' : "'s Results"}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body">${detailsHtml}</div>
                                </div>
                            </div>
                        </div>`;
                    document.body.insertAdjacentHTML('beforeend', modalHtml);
                    const modal = new bootstrap.Modal(document.getElementById(modalId));
                    modal.show();
                    document.getElementById(modalId).addEventListener('hidden.bs.modal', function () { this.remove(); });
                };
            } catch (e) {
                alert(t.failedToLoadResults);
                console.error(e);
            }
        });
    }

    // --- Teacher Page Logic ---
    if (pathname.includes('teacher.html')) {
        document.title = t.createTestTitle;
        document.querySelector('h2').textContent = t.createTestTitle;
        document.querySelector('p').textContent = t.enterWordsAndPass;
        document.querySelector('label[for="test-title"]').textContent = t.testTitle;
        document.getElementById('test-title').placeholder = t.testTitlePlaceholder;
        document.querySelector('label[for="korean-words-input"]').textContent = t.term;
        document.getElementById('korean-words-input').placeholder = t.enterOnePerLine;
        document.querySelector('label[for="english-words-input"]').textContent = t.definition;
        document.getElementById('english-words-input').placeholder = t.enterOnePerLine;
        document.querySelector('label[for="random-order-switch"]').textContent = t.shuffleWords;
        document.querySelector('label[for="language-switch"]').textContent = t.swapTermDef;
        document.querySelector('label[for="password"]').textContent = t.editPassword;
        document.getElementById('password').placeholder = t.passwordPlaceholder;
        document.getElementById('generate-link-btn').textContent = t.generateLink;
        document.querySelector('#generated-link-container h5').textContent = t.generatedLink;
        document.getElementById('copy-link-btn').textContent = t.copy;
        document.querySelector('.mt-4 a').textContent = t.backToMain;
        document.querySelector('.mt-4 a').href = `index.html?lang=${lang}`;

        const generateLinkBtn = document.getElementById('generate-link-btn');
        const copyLinkBtn = document.getElementById('copy-link-btn');

        const hash = window.location.hash.substring(1);
        
        if (hash) {
            try {
                const decodedString = atob(hash);
                const parsedData = JSON.parse(decodedString);
                // Convert optimized format to full format
                const testData = {
                    title: parsedData.t || '',
                    words: parsedData.w.map(w => Array.isArray(w) ? { k: w[0], e: w[1] } : w),
                    p: parsedData.p || '',
                    random: parsedData.r || false,
                    lang: parsedData.l || false
                };
                
                if (testData.p) {
                    const enteredPassword = prompt(t.enterPasswordForEdit);
                    if (enteredPassword !== testData.p) {
                        alert(t.incorrectPassword);
                        window.location.href = `index.html?lang=${lang}`;
                        return;
                    }
                }
                document.getElementById('test-title').value = testData.title || '';
                document.getElementById('korean-words-input').value = testData.words.map(w => w.k).join('\n');
                document.getElementById('english-words-input').value = testData.words.map(w => w.e).join('\n');
                document.getElementById('password').value = testData.p || '';
                document.getElementById('random-order-switch').checked = testData.random || false;
                document.getElementById('language-switch').checked = testData.lang || false;
            } catch (e) {
                alert(t.failedToLoadTest);
                console.error(e);
            }
        }

        generateLinkBtn.addEventListener('click', () => {
            const koreanLines = document.getElementById('korean-words-input').value.split('\n').map(s => s.trim()).filter(s => s);
            const englishLines = document.getElementById('english-words-input').value.split('\n').map(s => s.trim()).filter(s => s);
            if (koreanLines.length === 0 || englishLines.length === 0) {
                alert(t.pleaseEnterWords);
                return;
            }
            if (koreanLines.length !== englishLines.length) {
                alert(t.wordCountMismatch);
                return;
            }
            const words = koreanLines.map((k, i) => ({ k: k, e: englishLines[i] }));
            const title = document.getElementById('test-title').value;
            const password = document.getElementById('password').value;
            const randomOrder = document.getElementById('random-order-switch').checked;
            const languageSwitch = document.getElementById('language-switch').checked;
            
            // Optimize data structure - only include non-default values
            const testData = {};
            if (title) testData.t = title;
            testData.w = words.map(w => [w.k, w.e]); // Simplified word format
            if (password) testData.p = password;
            if (randomOrder) testData.r = true;
            if (languageSwitch) testData.l = true;
            
            // Compress JSON string by removing spaces
            const jsonString = JSON.stringify(testData);
            const encodedData = btoa(jsonString);
            
            const baseUrl = window.location.href.split('?')[0].split('#')[0].replace('teacher.html', 'test.html');
            const finalUrl = `${baseUrl}?lang=${lang}#${encodedData}`;
            document.getElementById('generated-link').value = finalUrl;
            document.getElementById('generated-link-container').style.display = 'block';
        });

        copyLinkBtn.addEventListener('click', () => {
            const linkInput = document.getElementById('generated-link');
            linkInput.select();
            document.execCommand('copy');
            alert(t.linkCopied);
        });
    }

    // --- Test Page Logic ---
    if (pathname.includes('test.html')) {
        document.title = t.wordTest;
        document.querySelector('label[for="student-name"]').textContent = t.enterName;
        document.getElementById('student-name').placeholder = t.studentNamePlaceholder;
        document.getElementById('start-test-btn').textContent = t.startTest;
        document.getElementById('english-answer').placeholder = t.enterAnswer;
        document.getElementById('prev-word-btn').textContent = t.prev;
        document.getElementById('next-word-btn').textContent = t.next;
        document.querySelector('#result-screen h2').textContent = t.testResultsTitle;
        document.querySelector('#result-screen .display-5').textContent = t.totalScore;
        document.querySelector('#result-screen .btn-primary').textContent = t.backToMain;
        document.querySelector('#result-screen .btn-primary').href = `index.html?lang=${lang}`;
        document.getElementById('retry-test-btn').textContent = t.retryTest;
        document.querySelector('#no-test-data-screen h2').textContent = t.invalidAccess;
        document.querySelector('#no-test-data-screen p').textContent = t.useTestLink;
        document.querySelector('#no-test-data-screen a').href = `index.html?lang=${lang}`;

        const nameEntryScreen = document.getElementById('name-entry-screen');
        const testScreen = document.getElementById('test-screen');
        const resultScreen = document.getElementById('result-screen');
        const noTestDataScreen = document.getElementById('no-test-data-screen');
        let words = [];
        let studentName = '';
        let currentWordIndex = 0;
        let testConfig = {};
        let userAnswers = [];

        function initializeTest() {
            const hash = window.location.hash.substring(1);
            
            if (!hash) {
                nameEntryScreen.style.display = 'none';
                noTestDataScreen.style.display = 'block';
                return;
            }
            
            try {
                const decodedString = atob(hash);
                const parsedData = JSON.parse(decodedString);
                // Convert optimized format to full format
                const testData = {
                    title: parsedData.t || '',
                    words: parsedData.w.map(w => Array.isArray(w) ? { k: w[0], e: w[1] } : w),
                    random: parsedData.r || false,
                    lang: parsedData.l || false
                };
                
                if (testData.words && testData.words.length > 0) {
                    testConfig = testData;
                    document.getElementById('test-title-display').textContent = testData.title || t.wordTestDefault;
                    nameEntryScreen.style.display = 'block';
                } else {
                    throw new Error('No words found');
                }
            } catch (e) {
                console.error('Failed to parse test data:', e);
                nameEntryScreen.style.display = 'none';
                noTestDataScreen.style.display = 'block';
            }
        }

        function startTest() {
            studentName = document.getElementById('student-name').value.trim();
            if (!studentName) {
                alert(t.pleaseEnterName);
                return;
            }
            words = JSON.parse(JSON.stringify(testConfig.words));
            if (testConfig.lang) {
                words = words.map(word => ({ k: word.e, e: word.k }));
            }
            if (testConfig.random) {
                words.sort(() => Math.random() - 0.5);
            }
            userAnswers = new Array(words.length).fill('');
            currentWordIndex = 0;
            nameEntryScreen.style.display = 'none';
            resultScreen.style.display = 'none';
            testScreen.style.display = 'block';
            document.getElementById('student-name-display').textContent = studentName;
            displayWord();
        }

        function displayWord() {
            const word = words[currentWordIndex];
            document.getElementById('progress-indicator').textContent = `${currentWordIndex + 1} / ${words.length}`;
            document.getElementById('korean-word-display').textContent = word.k;
            const answerInput = document.getElementById('english-answer');
            answerInput.value = userAnswers[currentWordIndex] || '';
            answerInput.focus();
            document.getElementById('prev-word-btn').disabled = currentWordIndex === 0;
            const nextBtn = document.getElementById('next-word-btn');
            if (currentWordIndex === words.length - 1) {
                nextBtn.textContent = t.finish;
            } else {
                nextBtn.textContent = t.next;
            }
        }

        function storeAnswer() {
            const userAnswer = document.getElementById('english-answer').value.trim();
            userAnswers[currentWordIndex] = userAnswer;
        }

        function moveToNextWord() {
            storeAnswer();
            if (currentWordIndex < words.length - 1) {
                currentWordIndex++;
                displayWord();
            } else {
                finishTest();
            }
        }

        function moveToPrevWord() {
            storeAnswer();
            if (currentWordIndex > 0) {
                currentWordIndex--;
                displayWord();
            }
        }

        function finishTest() {
            let score = 0;
            const results = words.map((word, index) => {
                const isCorrect = userAnswers[index].toLowerCase() === word.e.toLowerCase();
                if (isCorrect) score++;
                return { question: word.k, answer: word.e, userAnswer: userAnswers[index], isCorrect: isCorrect };
            });
            
            const testIdForResults = window.location.hash;
            
            const testResult = {
                studentName: studentName,
                score: `${score} / ${words.length}`,
                results: results,
                testId: testIdForResults,
                timestamp: new Date().toISOString()
            };
            let allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
            allResults.push(testResult);
            localStorage.setItem('testResults', JSON.stringify(allResults));
            showResults(score);
        }

        function showResults(score) {
            testScreen.style.display = 'none';
            resultScreen.style.display = 'block';
            document.getElementById('final-student-name').textContent = studentName;
            document.getElementById('score-display').textContent = `${score} / ${words.length}`;
        }

        document.getElementById('start-test-btn').addEventListener('click', startTest);
        document.getElementById('next-word-btn').addEventListener('click', moveToNextWord);
        document.getElementById('prev-word-btn').addEventListener('click', moveToPrevWord);
        document.getElementById('english-answer').addEventListener('keyup', (e) => { if (e.key === 'Enter') moveToNextWord(); });
        document.getElementById('retry-test-btn').addEventListener('click', () => {
            resultScreen.style.display = 'none';
            nameEntryScreen.style.display = 'block';
        });

        initializeTest();
    }

    setLanguageContent();
});