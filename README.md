# Ion Commerce

Ion commerce is a simple ecommerce website built with React and the Ionic framework

## Demo

- [https://ion-commerce.vercel.app/store](https://ion-commerce.vercel.app/store)

#### Screenshot

![screenshot](./screenshot.png 'screenshot')

&nbsp;

---

&nbsp;

## Getting Started

* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/JM-M/ion-commerce.git`.
- create a `.env.local` file in the root directory and add the following:

```bash
VITE_APP_NAME='Ion Commerce'

# PAYSTACK
# @see https://support.paystack.com/hc/en-us/articles/360011508199-How-do-I-generate-new-API-keys-
VITE_PAYSTACK_PUBLIC_KEY=''

# BACKEND
VITE_BACKEND_URL=''

# ALGOLIA
# @see https://www.algolia.com/doc/guides/security/api-keys/
VITE_ALGOLIA_APPLICATION_ID=''
VITE_ALGOLIA_SEARCH_ONLY_API_KEY=''
```

* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.
&nbsp;

---

&nbsp;

### Deploying to Vercel
- Change the output directory from 'build' to 'dist'

&nbsp;

---

&nbsp;

## Resources
- [Ionic React](https://ionicframework.com/docs/react)
- [Paystack](https://paystack.com/)
- [Vercel](https://vercel.com/)

&nbsp;

## License

- [MIT](LICENSE.md)