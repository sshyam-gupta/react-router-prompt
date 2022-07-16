<h1 align="center">react-router-prompt 🚨</h1>
<p>
  <a href="https://www.npmjs.com/package/react-router-prompt" target="_blank">
    <img alt="NPM version" src="https://img.shields.io/npm/v/react-router-prompt.svg" />
  </a>
  <a href="https://www.npmjs.com/package/react-router-prompt" target="_blank">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dw/react-router-prompt.svg" />
  </a>
</p>

> A replacement component for the react-router 6 `Prompt`. Allows for more flexible dialogs.

### 🏠 [Homepage](https://github.com/sshyam-gupta/react-router-prompt#readme)

### ✨ [Demo](https://codesandbox.io/s/react-router-prompt-example-zv3zt5?file=/src/App.js)

## Install

```sh
yarn add react-router-prompt
```

## Usage

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

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/sshyam-gupta/react-router-prompt/issues).

## Show your support

Give a ⭐️ if this project helped you!

## Credits

- Inspiration from [react-router-navigation-prompt](https://www.npmjs.com/package/react-router-navigation-prompt)

- Gist: [https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743](https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743)

## 📝 License

Copyright © 2022 [Shyam Gupta (shyamm@outlook.com)](https://github.com/sshyam-gupta).<br />
This project is [MIT](https://github.com/sshyam-gupta/react-router-prompt/blob/main/LICENSE) licensed.

## Author

👤 **Shyam Gupta (shyamm@outlook.com)**

- Website: https://sshyam-gupta.space/
- Twitter: [@shyamm06](https://twitter.com/shyamm06)
- Github: [@sshyam-gupta](https://github.com/sshyam-gupta)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/shyam-gupta-66463a62\/](https://linkedin.com/in/https://www.linkedin.com/in/shyam-gupta-66463a62/)
