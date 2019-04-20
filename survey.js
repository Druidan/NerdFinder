document.addEventListener("DOMContentLoaded", function () {
    //My JS starts past this point.

    //Website States
    let searching = false;

    //Global Variables
    let matches = [];
    let numQs = 0;
    let largestDiff;

    //Grab HTML Elements
    const surveyDiv = document.querySelectorAll(`.surveyDiv`);
    const surveySubmitBtn = document.querySelectorAll(`.submitSurvBtn`);

    function buildQs() {
        axios.get(`/api/surveyQs`).then(surveyQs => {
            results = surveyQs.data
            results.forEach(q => {
                numQs++
                const qText = q.question;
                const newQ = document.createElement(`div`);
                const qTextHeader = document.createElement(`h3`);
                const qContent = document.createElement(`p`);
                const dropMenu = document.createElement(`div`);
                const dirtySelector = `
                <select class='dropMenu'>
                    <option value=""></option>
                    <option value="1">1 (Strongly Disagree)</option>
                    <option value="2">2</option>
                    <option value="3">3 (Neutral or Unsure)</option>
                    <option value="4">4</option>
                    <option value="5">5 (Strongly Agree)</option>
                </select>`
                const cleanSelector = DOMPurify.sanitize(dirtySelector);
                newQ.className = `qDiv q${numQs}Div`;
                qTextHeader.className = `qHead`;
                qTextHeader.textContent = `Question ${numQs}`;
                newQ.appendChild(qTextHeader);
                qContent.className = `qContent`;
                qContent.textContent = qText;
                newQ.appendChild(qContent);
                dropMenu.innerHTML = cleanSelector;
                newQ.appendChild(dropMenu);
                surveyDiv.forEach(elem => {
                    elem.appendChild(newQ);
                })
            });
            largestDiff = numQs * 4
        })
    }
    buildQs();

    surveySubmitBtn.forEach(function (elm) {
        searching = true;
        elm.addEventListener('click', function () {
            event.preventDefault();
            const formBoxes = document.querySelectorAll(`.formBox`);
            const dropMenues = document.querySelectorAll(`.dropMenu`);

            function emptyCheck() {
                let allFull = true;

                formBoxes.forEach(form => {
                    if (form.value === "") {
                        allFull = false;
                    };
                });

                dropMenues.forEach(menu => {
                    if (menu.value === "") {
                        allFull = false;
                    };
                });

                return allFull;
            };

            if (emptyCheck()) {
                const thisUserName = document.querySelectorAll(`.name-input`);
                const thisUserPic = document.querySelectorAll(`.pic-link-input`);
                const thisUser = {
                    name: thisUserName[0].value,
                    photo: thisUserPic[0].value,
                    scores: [],
                }
                dropMenues.forEach(result => {
                    thisUser.scores.push(parseInt(result.value));
                });
                axios.post(`/api/nerdFriends`, thisUser).then(function (response) {
                    bestMatchCheck(thisUser)
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                alert(`Please fill out all of the survey!`)
                searching = false
            }
        }, false);
    });

    function bestMatchCheck(userObj) {
        const thisUserName = userObj.name;
        const thisUserArr = userObj.scores;

        axios.get(`/api/nerdFriends`).then(response => {
            const nerds = response.data
            console.log(nerds)
            nerds.forEach(nerd => {
                console.log(nerd.name)
                console.log(thisUserName)
                let diffTotal = 0;
                i = 0;
                if (nerd.name !== thisUserName) {
                    nerd.scores.forEach(score => {
                        diffTotal = diffTotal + (score + thisUserArr[i]);
                        i++
                    })
                    console.log(diffTotal)
                    if (diffTotal < largestDiff) {
                        largestDiff = diffTotal
                        matches = [];
                        matches.push(nerd)
                    } else if (diffTotal === largestDiff) {
                        matches.push(nerd)
                    }
                }
            })
            console.log(matches)
        })
    }

    //My JS Ends beyond this point.
});