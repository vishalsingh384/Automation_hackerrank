const puppeteer=require("puppeteer");

let email="vishalsing384@gmail.com";
let password="Hacked@123";

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
    let emailWillBeTypedPromise=cTab.type("input[name='username']", email);
    return emailWillBeTypedPromise;
})
.then(function(){
    console.log("email is typed");
    let passwordWillBeTypedPromise = cTab.type("input[type='password']", password);
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
})
.catch(function(err){
    console.log(err);
})