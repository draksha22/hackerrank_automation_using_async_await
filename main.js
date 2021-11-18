const puppeteer = require('puppeteer')
const codeObj = require('./codes')

let email = "labefik349@elastit.com";
let password = "pepcoding"
//launch browser
let loginlink = "https://www.hackerrank.com/auth/login";



(async function (){
    try{
        let browserOpen = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        })

        let newtab = await browserOpen.newPage();
        await newtab.goto(loginlink);
        await newtab.type("input[id='input-1']", email, {delay : 50});
        await newtab.type("input[type='password']", password, {delay : 50});
        await newtab.click("button[data-analytics='LoginPassword']",  {delay : 50});
        await waitAndClick(".topic-card a[data-attr1='algorithms",  newtab);
        await waitAndClick("input[value='warmup']",  newtab);
        let allChallenges = await newtab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay: 50});
        console.log("Total questions: " , allChallenges.length);
        await questionSolver(newtab, allChallenges[0], codeObj.answers[0]);

    }catch(error){
        console.log(error);
    }
})();


// it is waiting for the page to load, when the page loads it will perform actions after that only
async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector);
    let selectorClicked = cPage.click(selector);
    return selectorClicked;
    
}

async function questionSolver(page, question, answer){
    await question.click();
    await waitAndClick('.monaco-editor.no-user-select.vs', page);
    await waitAndClick('.checkbox-input', page);
    await page.waitForSelector('textarea.custominput', page);
    await page.type('textarea.custominput', answer, {delay: 10});
    await page.keyboard.down('Control');
    await page.keyboard.press('A', {delay:100});
    await page.keyboard.press('X', {delay:100});
    await page.keyboard.up('Control');
    await waitAndClick('.monaco-editor.no-user-select.vs', page);
    await page.keyboard.down('Control');
    await page.keyboard.press('A', {delay:100});
    await page.keyboard.press('V', {delay:100});
    await page.keyboard.up('Control');
    await page.click('.hr-monaco__run-code', {delay: 50});


}
