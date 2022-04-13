const puppeteer=require("puppeteer");
let email=require("./secret");
// console.log(email.emailId());
let password=require("./secret");
let {answer}=require("./codes");
let cTab;
let browserOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"],

    //by default, ye Chromium me khulega
    //Agar apne Chrome Browser me kholna hai to, follow below steps;-
    //type this in browser->chrome:version
    //copy this option->executablePath:.......................

    //executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
});

browserOpenPromise.then(function(browser){
    console.log("browser is open");
    //An array of all open pages inside the Browser.
    let allTabsPromise=browser.pages();
    return allTabsPromise;
})
.then(function(alltabsArr){
    cTab=alltabsArr[0];
    console.log("new tab opened");
//URL to navigate page to
    let visitingLoginpagePromise=cTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginpagePromise;
})
.then(function(){
    console.log("hackerrank opened");
    let emailWillBeTypedPromise=cTab.type("input[name='username']", email.emailId(),{delay:100});//delay is to avoid any unecessary detection of automation. To make it seem more human.
    return emailWillBeTypedPromise;
})
.then(function(){
    console.log("email is typed");
    let passwordWillBeTypedPromise = cTab.type("input[type='password']", password.passWord(),{delay:100});
    return passwordWillBeTypedPromise;
})
.then(function(){
    console.log("password has been typed");
    let willBeLoggedInPromise = cTab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return willBeLoggedInPromise;
})
.then(function(){
    console.log("logged into hackerrank successfully");
    //waitAndClick will wait for the selector to load and then click on the node
    let algorithmTabWillBeOpenedPromise=waitAndClick( "div[data-automation='algorithms']");
    return algorithmTabWillBeOpenedPromise;
})
.then(function(){
    console.log("alogrithm page will be opened");
    let allQuesPromise=cTab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]');
    return allQuesPromise;
})
.then(function(){
    function getAllQuesLinks(){
        let allElemArr=document.querySelectorAll('a[data-analytics="ChallengeListChallengeName"]');
        let linksArr=[];
        for(let i=0;i<allElemArr.length;i++){
            linksArr.push(allElemArr[i].getAttribute("href"));
        } return linksArr;
    }
    let linksArrPromise=cTab.evaluate(getAllQuesLinks);
    return linksArrPromise;
})
.then(function(linksArr){
    console.log("links to all questions received");
    //question solving
    let questionWillBeSolvedPromise=questionSolver(linksArr[0],0);
    for(let i=1;i<4;i++){
        questionWillBeSolvedPromise=questionWillBeSolvedPromise.then(function(){
            return questionSolver(linksArr[i],i);
        })
    }
    return questionWillBeSolvedPromise;
}).then(function(){
    console.log("question is solved");
})
.catch(function(err){
    console.log(err);
});

function waitAndClick(algoBtn){
    let waitClickPromise=new Promise(function(resolve,reject){
        let waitForSelectorPromise=cTab.waitForSelector(algoBtn);
        waitForSelectorPromise.then(function(){
            console.log("algo btn is found");
            let clickPromise=cTab.click(algoBtn);
            return clickPromise;
        })
        .then(function(){
            console.log("algo btn is clicked");
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    });
    return waitClickPromise;
}

function questionSolver(url,idx){
    return new Promise(function(resolve,reject){
        let fullLink=`https:hackerrank.com${url}`;
        let goToQuesPagePromise=cTab.goto(fullLink);
        goToQuesPagePromise.then(function(){
            //tick the custom input box mark
            let waitForCheckBoxAndClickPromise=waitAndClick(".checkbox-input");
            return waitForCheckBoxAndClickPromise;
        })
        .then(function(){
            //select the box where code will be typed
            let waitForTextBoxPromise = cTab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        })
        .then(function () {
            let codeWillBeTypedPromise = cTab.type(".custominput", answer[idx],{delay:10});
            return codeWillBeTypedPromise;
        })
        .then(function(){
            //control key is pressed
            let controlPressedPromise=cTab.keyboard.down("Control");//.keyboard.press->to press a key of keyboard
            console.log("ctrl is pressed");
            return controlPressedPromise;
        })
        .then(function(){
            let aKeyPressedPromise=cTab.keyboard.press("a");
            console.log("a is pressed");
            return aKeyPressedPromise;
        })
        .then(function(){
            let xKeyPressedPromise=cTab.keyboard.press("x");
            console.log("x is pressed");
            return xKeyPressedPromise;
        })
        .then(function(){
            //control key is pressed
            let controlPressedPromise=cTab.keyboard.up("Control");//.keyboard.press->to press a key of keyboard
            console.log("ctrl is pressed");
            return controlPressedPromise;
        })
        .then(function(){
            //select the editor promise
            let cursorOnEditorPromise=cTab.click(".hr-monaco-editor-parent");
            console.log("editor clicked");
            return cursorOnEditorPromise;
        })
        .then(function(){
            //control key is pressed
            let controlPressedPromise=cTab.keyboard.down("Control");//.down->because ye button dabaye rakhta hai, unlinke 'press'. 
            console.log("ctrl is pressed again");
            return controlPressedPromise;
        })
        .then(function () {
            let aKeyPressedPromise = cTab.keyboard.press("a");//press->one time key press(dabaye nahi rakhta)
            console.log("a pressed again");
            return aKeyPressedPromise;
        })
        .then(function () {
            let vKeyPressedPromise = cTab.keyboard.press("v");
            console.log("v pressed again");
            return vKeyPressedPromise;
        })
        .then(function(){
            let controlDownPromise=cTab.keyboard.up("Control");//to undo down. button se finger uthane ke liye
            return controlDownPromise;
        })
        .then(function(){
            let submitButtonClickedPromise=cTab.click(".hr-monaco-submit");
            console.log("submit clicked");
            return submitButtonClickedPromise;
        })
        .then(function(){
            console.log("question is solved");
            resolve();
        })
        .catch(function(err){
            reject(err);//if the 'err'/error is not passed, the catch of this promise above will show undefined if it's an error
        });
    });
}

