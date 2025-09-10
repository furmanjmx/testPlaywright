# 🎭 **Playwright TEST REPO**

---

## Install dependencies

```bash
npm i
```

## run tests Safari
```bash
npx playwright test --project="SafariLocal" --grep @regression  
```
## run tests Chrome
```bash
npx playwright test --project="ChromeLocal" --grep @smoke 
```


### Html-report (HTML + VIDEO report directory)
Test reports and video recordings are stored in the `html-report` folder located at the root of the project.

### Run Trace example
```bash
npx playwright show-trace test-artifacts/discountFilter-Discount-filtering-with-mocked-API-regression-SafariLocal/trace.zip
```

Traces are stored in the `test-artifacts` folder.

```bash
npx playwright show-report html-report
```
