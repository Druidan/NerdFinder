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
    const bestMatchTitle = document.querySelectorAll(`.bestMatchTitle`);
    const bestMatchesDiv = document.querySelectorAll(`.bestMatchModal`);

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
                qTextHeader.textContent = `Statement ${numQs}`;
                newQ.appendChild(qTextHeader);
                qContent.className = `qContent`;
                qContent.textContent = qText;
                newQ.appendChild(qContent);
                dropMenu.innerHTML = cleanSelector;
                dropMenu.className = `dropMenuBox`;
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
            nerds.forEach(nerd => {
                let diffTotal = 0;
                i = 0;
                if (nerd.name !== thisUserName) {
                    nerd.scores.forEach(score => {
                        let diff = score - thisUserArr[i]
                        if(diff <=0 ){
                            diff = diff*(-1);
                        }
                        diffTotal = diffTotal + diff;
                        i++
                    })
                    if (diffTotal < largestDiff) {
                        largestDiff = diffTotal
                        matches = [];
                        matches.push(nerd)
                    } else if (diffTotal === largestDiff) {
                        matches.push(nerd)
                    }
                }
            })
            buildMatchesModal(matches);
        })
    }

    function buildMatchesModal(arr) {
        let i = 0;
        arr.forEach( match => {
            i++
            const newMatch = document.createElement(`div`);
            const dirtyMatchHTML = `
            <div class="bMatches bMatch${i}">
                <img src="${match.photo}" class="bmImage bmImg${i}" alt="Match ${i} Profile Image"></img>
                <h3 class="bmName">${match.name}</h3> 
            </div>`
            const cleanMatchHTML = DOMPurify.sanitize(dirtyMatchHTML);
            newMatch.innerHTML = cleanMatchHTML;
            // newMatch.className = `glide_slide`
            bestMatchTitle.forEach(div => {
                div.appendChild(newMatch);
            })
        })
        // new Glide('.glide').mount()
        bestMatchesDiv.forEach(div => {
            if(hasClass(div, `buryIt`)) {
                removeClass(div, `buryIt`)
            }
        });
        // gliderDiv.forEach(div => {
        //     div.style.width = `100%`;
        // });
        // if(matches.length <= 2) {
        //     glideArrows.forEach(arrow => {
        //         addClass(arrow, `buryIt`);
        //     })
        // }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
        largestDiff = numQs * 4
    }

    function hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }
    function addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
        }
    function removeClass(el, className) {
            if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className=el.className.replace(reg, ' ')
        }
    }


    //My JS Ends beyond this point.
});