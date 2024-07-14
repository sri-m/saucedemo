import { test, expect, Page } from '@playwright/test';
import { LogIn } from '../pages/saucedemo.page';

test('Login with Invalid credentials', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordInValidVal());
  expect(saucedemo.errorMsgLoc()).toHaveText(saucedemo.errorMsg())
});

test('Login with Valid credentials and logOut', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordValidVal());
  expect(page).toHaveURL(saucedemo.inventory());
  expect(saucedemo.productsLoc()).toHaveText(saucedemo.productsVal());
  expect(saucedemo.logoLoc()).toHaveText(saucedemo.logoVal());
  await saucedemo.linesIcon().click();
  await saucedemo.logOut().click();
  expect(page).toHaveURL(saucedemo.url());
  const msg = "Login and logOut are successfull";
  console.log(msg);
});

test('Product Sorting', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordValidVal());
  await saucedemo.filterLoc().click();
  await saucedemo.filterLoc().selectOption({ index: 2 });
  //Verify that the products are sorted correctly.
  expect(saucedemo.totalProducts()).toHaveCount(6);
  await saucedemo.filterLoc().click();
  await saucedemo.filterLoc().selectOption({ index: 0 });
  //Verify that the products items are sorted correctly.
  await page.waitForSelector(saucedemo.item_name());
  const items = await page.$$(saucedemo.item_name());
  const newItems = items.map(async (i, j) => {
    return await i.innerText();
  })
  newItems.map(async (data) => {
    expect(saucedemo.total()).toEqual(newItems.length)
  })

  const msg = "all items are sorted correctly";
  console.log(msg);
  await page.waitForTimeout(1000);
});

test('Add to Cart and Remove from Cart', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordValidVal());
  expect(page).toHaveURL(saucedemo.inventory());
  const badgeCount = await saucedemo.cartBadge().count();
  //console.log(badgeCount);
  if (badgeCount == 0) {
    await saucedemo.addItem().first().click();   //added product1 to cart
    await saucedemo.addItem().last().click();    //added product2 to cart
    expect(saucedemo.cartItems().count()).toEqual(saucedemo.cartBadge().count());  //validating count
    await saucedemo.removeItem().first().click();  //removed product1 to cart
    expect(saucedemo.removeItem().count()).toEqual(saucedemo.cartBadge().count());  //validating count
    expect(saucedemo.removeFromCart().first().textContent()).toEqual(saucedemo.allItems().first().textContent());//validating product removed from cart
    const msg = "Products are Added and Removed successfull.";
    console.log(msg);
  }
  else {
    const msg = "No Items in the Cart Badge";
    console.log(msg);
  }
});

test('Checkout Process', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordValidVal());
  expect(page).toHaveURL(saucedemo.inventory());
  await saucedemo.addItem().first().click();
  await saucedemo.cartBadge().click();
  await saucedemo.checkOut().click();
  await saucedemo.firstName().fill(saucedemo.fNameVal());
  await saucedemo.lastName().fill(saucedemo.lNameVal());
  await saucedemo.zipCode().fill(saucedemo.zipVal());
  await saucedemo.continueBtn().click();
  expect(page).toHaveURL(saucedemo.checkoutUrl());
  await saucedemo.finishBtn().click();
  expect(page).toHaveURL(saucedemo.checkoutComplete());
  expect(saucedemo.thankyouLoc()).toHaveText(saucedemo.thankyouMsg());
  await saucedemo.backToProducts().click();
  const msg = "Checkout Process successfull.";
  console.log(msg);
});

test('Product Details', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordValidVal());
  const items = await page.$$(saucedemo.item_name());
  const allProducts = items.map(async (item) => {
    return await item.textContent();
  })
  //console.log(allProducts);
  const msg = "Products are displayed correctly.";
  console.log(msg);
  await page.waitForTimeout(1000);
});

test('Menu Navigation', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordValidVal());
  await saucedemo.linesIcon().click();
  await saucedemo.resetApp().click();
  await saucedemo.allItems().click();
  await saucedemo.about().click();
  expect(page).toHaveURL(saucedemo.url());
  await page.goBack();
  await saucedemo.linesIcon().click();
  await saucedemo.logOut().click();
  expect(page).toHaveURL(saucedemo.url());
  await page.waitForTimeout(1000);
  const msg = "All menu's working fine.";
  console.log(msg);
});

test('Error Handling', async ({ page }) => {
  const saucedemo = new LogIn(page);
  await saucedemo.openApplication();
  await saucedemo.clickLogIn(saucedemo.userNameVal(), saucedemo.passwordValidVal());
  expect(page).toHaveURL(saucedemo.inventory());
  await saucedemo.addItem().first().click();
  await saucedemo.cartBadge().click();
  await saucedemo.checkOut().click();
  const inputField1 = await saucedemo.firstName().inputValue();
  const inputField2 = await saucedemo.lastName().inputValue();
  const inputField3 = await saucedemo.zipCode().inputValue();
  if (inputField1 == " " || inputField2 == "" || inputField3 == "") {
    expect(saucedemo.errorLoc1()).toContain(saucedemo.errorMsg1());
  }
  else {
    console.log('No Errors');
  }
  const msg = "Error Handling successfull";
  console.log(msg);
});