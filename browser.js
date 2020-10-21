const { By } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const csv = require('csv-parser');
const fs = require('fs');

var recordsToProcess = [];

fs.createReadStream('data/test_list1.csv')
    .pipe(csv())
    .on('data', (row) => {
        recordsToProcess.push(row);
    })
    .on('end', () => {
        console.log('------------ CSV file successfully processed ------------');
        (function loopAutomation(n) {

            if (n < recordsToProcess.length) setTimeout(function () {
                captureForm(recordsToProcess[n].name, recordsToProcess[n].surname, recordsToProcess[n].email);
                loopAutomation(n);
            }, getRandomInterval());
        
            console.log(`------------ Execution ${n++} ------------`);
        
        }(0));
    });


async function captureForm(name, surname, email) {

    try {
        console.log(`>>>> Setting up ${email}`);

        var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get('https://woobox.com/ko9fk3?embed=1&plugin=%257B%2522pid%2522%253A%2522ko9fk3_0%2522%252C%2522fid%2522%253A%2522offer%2522%257D');

        await driver.findElement(By.id('choice_183')).click();
        await driver.findElement(By.id('yourname_first')).sendKeys(name);
        await driver.findElement(By.id('yourname_last')).sendKeys(surname);
        await driver.findElement(By.id('email_id')).sendKeys(email);
        await driver.findElement(By.id('actionbutton')).click();

        driver.close();

        console.log(`<<<< Submitted for ${email}`);

    } catch (err) {
        console.error(err);
    }
}

function getRandomInterval() {  /* Get random number of minutes between 1 - 10 */
    const minutesToWait = Math.floor(Math.random() * 3),
        msToWait = minutesToWait * 1000 * 60;
    console.log(`------------ Waiting ${minutesToWait} minutes (${msToWait}ms)`)
    return msToWait;
}
