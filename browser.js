const { By } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');

const RUNS_TO_DO = 5;

async function captureForm(name, surname, email) {

    try {
        console.log(`>>>> Setting up ${email}`);

        var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get('https://woobox.com/ko9fk3?embed=1&plugin=%257B%2522pid%2522%253A%2522ko9fk3_0%2522%252C%2522fid%2522%253A%2522offer%2522%257D');

        // await driver.findElement(By.id('choice_183')).click();
        await driver.findElement(By.id('choice_181')).click();
        await driver.findElement(By.id('yourname_first')).sendKeys(name);
        await driver.findElement(By.id('yourname_last')).sendKeys(surname);
        await driver.findElement(By.id('email_id')).sendKeys(email);
        // await driver.findElement(By.id('actionbutton')).click();

        driver.close();

        console.log(`<<<< Submitted for ${email}`);

    } catch (err) {
        console.error(err);
    }
}

(function loopAutomation(n) {

    if (n < RUNS_TO_DO) setTimeout(function () {
        captureForm(`J${n}`, `Snow${n}`, `JSnow${n}@gmail.com`);    /* TODO: Get from CSV */
        loopAutomation(n);
    }, getRandomInterval());

    console.log(`Execution ${n++}`);

}(0));

function getRandomInterval() {  /* Get random number of minutes between 1 - 30 */
    const minutesToWait = Math.floor(Math.random() * 30),
        msToWait = minutesToWait * 1000 * 60;
    console.log(`Waiting ${minutesToWait} minutes (${msToWait}ms)`)
    return msToWait;
}
