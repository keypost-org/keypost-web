# keypost-web

## Local Environment Setup
```
sudo npm install -g webpack webpack-cli typescript-formatter
npm install
npm init @eslint/config
export NODE_OPTIONS=--openssl-legacy-provider (or 'direnv allow' on .envrc file if installed)
npm run start
```

Initial project setup from https://blog.logrocket.com/using-webpack-typescript/
Initial project setup from https://learntypescript.dev/12/l4-webpack
Trouble Shooting: https://stackoverflow.com/a/69699772

## Development
```
tsfmt -r src/<your-file>.ts
./node_modules/eslint/bin/eslint.js src/<your-file>.ts
npm run build
git add .
git commit -S -m "<my-detailed-commit-message>"
git push
```

## TODO
 - https://getbootstrap.com/docs/5.2/getting-started/webpack/
