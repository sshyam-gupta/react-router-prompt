# react-router-prompt 🚨

> A component for the react-router-dom 6 / react-router 7 `Prompt`. Allows to create more flexible dialogs.

Please follow [Note section](https://github.com/sshyam-gupta/react-router-prompt#note) for more details on react-router support

[![npm version](https://img.shields.io/npm/v/react-router-prompt.svg)](https://www.npmjs.com/package/react-router-prompt)

[![npm downloads](https://img.shields.io/npm/dw/react-router-prompt.svg)](https://www.npmjs.com/package/react-router-prompt)

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-router-prompt)](https://www.npmjs.com/package/react-router-prompt)

## ✨ [Demo](https://codesandbox.io/s/react-router-prompt-example-react-router-6-7-y9ug7z?file=/src/App.js)

## 🏠 [Homepage](https://github.com/sshyam-gupta/react-router-prompt#readme)

## Installation

### Prerequisite

**React-router-dom >= 7** and shall be ideally used with [**data routers**](https://reactrouter.com/6.28.1/routers/picking-a-router#using-v64-data-apis)

```bash
pnpm add react-router-prompt
```

or with other package manager like yarn

```bash
yarn add react-router-prompt
```

## Basic Usage

```jsx
<ReactRouterPrompt when={isDirty}>
  {({ isActive, onConfirm, onCancel }) => (
    <Modal show={isActive}>
      <div>
        <p>Do you really want to leave?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Ok</button>
      </div>
    </Modal>
  )}
</ReactRouterPrompt>
```

### Props

1. `when`: `boolean` | `BlockerFunction`

   ```ts
   BlockerFunction = (args: {
     currentLocation: Location
     nextLocation: Location
     historyAction: HistoryAction
   }) => boolean
   ```

2. `beforeConfirm(nextLocation?: Location)` : `Promise<unknown>` _(Optional)_

3. `beforeCancel()` : `Promise<unknown>` _(Optional)_

### Return values

1. `isActive`: `Boolean`
2. `onConfirm(nextLocation?: Location)`: `void`
3. `onCancel()`: `void`
4. `nextLocation`: `Location | undefined`

#### Note 🗒️

This version works with react-router-dom >=v7 or react-router >=v7 and shall be ideally used with [**data routers**](https://reactrouter.com/6.28.1/routers/picking-a-router#using-v64-data-apis)

- For react-router support `(v7)` please install `v0.8.x`

- For react-router-dom support `(v6.19.x - v6.28.1)` please install `v0.7.x`

- For react-router-dom support `(v6.7.x - v6.18.x)` please install `v0.5.4`

- For react-router-dom support `(v6 - v6.2.x)` please install `v0.3.0`

_Skipped support in middle due to breaking changes on react-router apis_

## Contributing

Contributions, issues and feature requests are always welcome!
Feel free to check [issues page](https://github.com/sshyam-gupta/react-router-prompt/issues).

## Acknowledgements

- Inspiration from [react-router-navigation-prompt](https://www.npmjs.com/package/react-router-navigation-prompt)
- Gist: [https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743](https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743)

## Support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Shyam Gupta (shyamm@outlook.com)](https://github.com/sshyam-gupta)
This project is [MIT](https://github.com/sshyam-gupta/react-router-prompt/blob/main/LICENSE) licensed.

## About me

- Website: [sshyam-gupta.space](https://sshyam-gupta.space/)
- Twitter: [@shyamm06](https://twitter.com/shyamm06)
- GitHub: [@sshyam-gupta](https://github.com/sshyam-gupta)
- LinkedIn: [@shyam-gupta-66463a62](https://linkedin.com/in/https://www.linkedin.com/in/shyam-gupta-66463a62/)
