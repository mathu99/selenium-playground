const { By } = require("selenium-webdriver");
var webdriver = require('selenium-webdriver');

async function runAutomation() {

    try{
        
        var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get("https://woobox.com/ko9fk3?embed=1&plugin=%257B%2522pid%2522%253A%2522ko9fk3_0%2522%252C%2522fid%2522%253A%2522offer%2522%257D");

        await driver.findElement(By.id('choice_183')).click();
        await driver.findElement(By.id('yourname_first')).sendKeys('Yashlin');
        await driver.findElement(By.id('yourname_last')).sendKeys('Naidoo');
        await driver.findElement(By.id('email_id')).sendKeys('yashlinn@bbs.com');
        await driver.findElement(By.id('actionbutton')).click();

    } catch (err) {
        console.error(err);
    }
}
runAutomation();
