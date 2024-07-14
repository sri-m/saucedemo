import { expect, type Locator, type Page } from '@playwright/test';

export class LogIn {
  readonly page: Page;
  //logIn page locators start here
  readonly url = () => 'https://www.saucedemo.com/';
  readonly userNameVal = () => "standard_user";
  readonly passwordValidVal = () => "secret_sauce";
  readonly passwordInValidVal = () => "secret_sauce1";
  readonly userNameLoc = () => this.page.locator('input[data-test="username"]');
  readonly passwordLoc = () => this.page.locator('input[data-test="password"]');
  readonly logInBtnLoc = () => this.page.locator('#login-button');
  readonly errorMsgLoc = () => this.page.locator('h3[data-test="error"]');
  readonly errorMsg = () => "Epic sadface: Username and password do not match any user in this service"
  //logIn page locators end here

  //inventory page and product page all locators
  readonly productsLoc = () => this.page.locator('span[data-test="title"]');
  readonly productsVal = () => "Products";
  readonly logoLoc = () => this.page.locator('div[class="app_logo"]');
  readonly logoVal = () => "Swag Labs";
  readonly inventory = () => 'https://www.saucedemo.com/inventory.html'
  readonly item_name = () => '.inventory_item'
  readonly linesIcon = () => this.page.locator('button[id="react-burger-menu-btn"]');
  readonly logOut = () => this.page.locator('a[id="logout_sidebar_link"]');
  readonly filterLoc = () => this.page.locator('select[data-test="product-sort-container"]');
  readonly filterNameVal = () => "Name (A to Z)";
  readonly filterPriceVal = () => "Price (low to high)";
  readonly totalProducts = () => this.page.locator('div[data-test="inventory-item"][class="inventory_item"]');
  readonly sortTitle = () => this.page.locator('div[data-test="inventory-item-name"]');
  readonly sortPrice = () => this.page.locator('div[data-test="inventory-item-price"]');
  readonly cartBadge = () => this.page.locator('.shopping_cart_badge');
  readonly cartItems = () => this.page.locator('.cart_item');
  readonly addItem = () => this.page.locator('//button[text()="Add to cart"]');
  readonly removeItem = () => this.page.locator('//button[text()="Remove"]');
  readonly removeFromCart = () => this.page.locator('.inventory_item_name');
  readonly allItems = () => this.page.locator('//a[text()="All Items"]');
  readonly checkOut = () => this.page.locator('//button[text()="Checkout"]');
  readonly firstName = () => this.page.locator('input[id="first-name"]');
  readonly lastName = () => this.page.locator('input[id="last-name"]');
  readonly zipCode = () => this.page.locator('input[id="postal-code"]');
  readonly fNameVal = () => "Srinivasa";
  readonly lNameVal = () => "Rao";
  readonly zipVal = () => "534260";
  readonly continueBtn = () => this.page.locator('input[id="continue"]');
  readonly checkoutUrl = () => "https://www.saucedemo.com/checkout-step-two.html";
  readonly checkoutComplete = () => "https://www.saucedemo.com/checkout-complete.html";
  readonly finishBtn = () => this.page.locator('button[id="finish"]');
  readonly thankyouLoc = () => this.page.locator('//h2[@class="complete-header"]');
  readonly thankyouMsg = () => "Thank you for your order!";
  readonly backToProducts = () => this.page.locator('button[id="back-to-products"]');
  readonly total = () => 6;
  readonly about = () => this.page.locator('//a[text()="About"]');
  readonly resetApp = () => this.page.locator('//a[text()="Reset App State"]');
  readonly errorLoc1 = () => "Error: First Name is required";
  readonly errorMsg1 = () => "Error: First Name is required";
  

  constructor(page: Page) {   //this is constructor
    this.page = page;
  }

  //re-usability function for web application
  async openApplication() {   
    await this.page.goto(this.url());
  }

  //re-usability function for logIn
  async clickLogIn(uName:any, pword:any) {
    await this.userNameLoc().fill(uName);
    await this.passwordLoc().fill(pword);
    await this.logInBtnLoc().click();
  }


}


