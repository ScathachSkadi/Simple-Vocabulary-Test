document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    // --- Index Page Logic --- (index.html)
    if (pathname.endsWith('/') || pathname.endsWith('index.html')) {
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
                alert('유효하지 않은 링크입니다.');
                return;
            }
            // Redirect to teacher.html with the hash
            window.location.href = `teacher.html#${hash}`;
        });

        loadResultsBtn.addEventListener('click', () => {
            const link = document.getElementById('results-link-input').value;
            const hash = link.split('#')[1];

            if (!hash) {
                alert('유효하지 않은 링크입니다.');
                return;
            }

            try {
                const decodedString = decodeURIComponent(atob(hash));
                const testData = JSON.parse(decodedString);

                if (testData.p) {
                    const enteredPassword = prompt('결과를 보려면 비밀번호를 입력하세요:');
                    if (enteredPassword !== testData.p) {
                        alert('비밀번호가 틀렸습니다.');
                        return;
                    }
                }

                const allResults = JSON.parse(localStorage.getItem('testResults') || '[]');
                const testResults = allResults.filter(r => r.testId === '#' + hash);

                const resultsContainer = document.getElementById('results-container');
                resultsContainer.style.display = 'block';

                if (testResults.length === 0) {
                    resultsContainer.innerHTML = '<p>아직 제출된 결과가 없습니다.</p>';
                    return;
                }

                let tableHtml = '<table class="table table-striped"><thead><tr><th>학생 이름</th><th>점수</th><th>제출 시간</th><th>상세</th></tr></thead><tbody>';
                testResults.forEach((result, index) => {
                    tableHtml += `<tr>
                        <td>${result.studentName}</td>
                        <td>${result.score}</td>
                        <td>${new Date(result.timestamp).toLocaleString()}</td>
                        <td><button class="btn btn-sm btn-info" data-index="${index}">보기</button></td>
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
                    let detailsHtml = '<table class="table"><thead><tr><th>문제</th><th>정답</th><th>학생 답안</th><th>결과</th></tr></thead><tbody>';
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
                    if (existingModal) {
                        existingModal.remove();
                    }

                    const modalHtml = `
                        <div class="modal fade" id="${modalId}" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">${result.studentName} 학생 결과</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body">${detailsHtml}</div>
                                </div>
                            </div>
                        </div>`;
                    
                    document.body.insertAdjacentHTML('beforeend', modalHtml);
                    const modal = new bootstrap.Modal(document.getElementById(modalId));
                    modal.show();
                    document.getElementById(modalId).addEventListener('hidden.bs.modal', function () {
                        this.remove();
                    });
                };

            } catch (e) {
                alert('결과를 불러오는 데 실패했습니다. 링크가 올바른지 확인해주세요.');
                console.error(e);
            }
        });
    }

    // --- Teacher Page Logic --- (teacher.html)
    if (pathname.includes('teacher.html')) {
        const generateLinkBtn = document.getElementById('generate-link-btn');
        const copyLinkBtn = document.getElementById('copy-link-btn');

        // --- Load Test for Editing on page load ---
        const hash = window.location.hash.substring(1);
        if (hash) {
            try {
                const decodedString = decodeURIComponent(atob(hash));
                const testData = JSON.parse(decodedString);

                if (testData.p) {
                    const enteredPassword = prompt('이 시험을 수정하려면 비밀번호를 입력하세요:');
                    if (enteredPassword !== testData.p) {
                        alert('비밀번호가 틀렸습니다.');
                        // Redirect back to index.html if password is wrong
                        window.location.href = 'index.html';
                        return;
                    }
                }

                // Populate textareas with loaded data
                const koreanWords = testData.words.map(w => w.k).join('\n');
                const englishWords = testData.words.map(w => w.e).join('\n');

                document.getElementById('korean-words-input').value = koreanWords;
                document.getElementById('english-words-input').value = englishWords;
                document.getElementById('password').value = testData.p || '';
                document.getElementById('random-order-switch').checked = testData.random || false;
                document.getElementById('language-switch').checked = testData.lang || false;

            } catch (e) {
                alert('시험 데이터를 불러오는 데 실패했습니다. 링크가 올바른지 확인해주세요.');
                console.error(e);
            }
        }

        // --- Generate Test Link ---
        generateLinkBtn.addEventListener('click', () => {
            const koreanLines = document.getElementById('korean-words-input').value.split('\n').map(s => s.trim()).filter(s => s);
            const englishLines = document.getElementById('english-words-input').value.split('\n').map(s => s.trim()).filter(s => s);

            if (koreanLines.length === 0 || englishLines.length === 0) {
                alert('단어를 입력해주세요.');
                return;
            }

            if (koreanLines.length !== englishLines.length) {
                alert('입력된 한국어 뜻과 영어 단어의 개수가 일치하지 않습니다.');
                return;
            }

            const words = koreanLines.map((k, i) => ({ k: k, e: englishLines[i] }));

            const password = document.getElementById('password').value;
            const randomOrder = document.getElementById('random-order-switch').checked;
            const languageSwitch = document.getElementById('language-switch').checked;

            const testData = {
                words: words,
                p: password,
                random: randomOrder,
                lang: languageSwitch
            };

            const jsonString = JSON.stringify(testData);
            const encodedData = btoa(encodeURIComponent(jsonString));

            const baseUrl = window.location.href.split('#')[0].replace('teacher.html', 'test.html');
            const finalUrl = `${baseUrl}#${encodedData}`;

            document.getElementById('generated-link').value = finalUrl;
            document.getElementById('generated-link-container').style.display = 'block';
        });

        // --- Copy Link ---
        copyLinkBtn.addEventListener('click', () => {
            const linkInput = document.getElementById('generated-link');
            linkInput.select();
            document.execCommand('copy');
            alert('링크가 복사되었습니다!');
        });
    }

    // --- Test Page Logic --- (test.html)
    if (pathname.includes('test.html')) {
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
                const decodedString = decodeURIComponent(atob(hash));
                const testData = JSON.parse(decodedString);
                if (testData.words && testData.words.length > 0) {
                    testConfig = testData;
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
                alert('이름을 입력해주세요.');
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

            // Update button states
            document.getElementById('prev-word-btn').disabled = currentWordIndex === 0;
            const nextBtn = document.getElementById('next-word-btn');
            if (currentWordIndex === words.length - 1) {
                nextBtn.textContent = '완료';
            } else {
                nextBtn.textContent = '다음';
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
                if (isCorrect) {
                    score++;
                }
                return {
                    question: word.k,
                    answer: word.e,
                    userAnswer: userAnswers[index],
                    isCorrect: isCorrect
                };
            });

            // Store results for teacher
            const testResult = {
                studentName: studentName,
                score: `${score} / ${words.length}`,
                results: results,
                testId: window.location.hash,
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

        // Event Listeners
        document.getElementById('start-test-btn').addEventListener('click', startTest);
        const nextBtn = document.getElementById('next-word-btn');
        if(nextBtn) {
            nextBtn.addEventListener('click', moveToNextWord);
        }
        const prevBtn = document.getElementById('prev-word-btn');
        if(prevBtn) {
            prevBtn.addEventListener('click', moveToPrevWord);
        }
        
        const answerInput = document.getElementById('english-answer');
        if(answerInput) {
            answerInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    moveToNextWord();
                }
            });
        }

        const retryBtn = document.getElementById('retry-test-btn');
        if(retryBtn) {
            retryBtn.addEventListener('click', () => {
                resultScreen.style.display = 'none';
                nameEntryScreen.style.display = 'block';
            });
        }


        // Initial setup
        initializeTest();
    }
});
