# 標題

## 啟動方針

### 開發環境

`npm srart`

### 生產環境

`npm run serve`

- 你會需要`pubhtmlhere`這個`npm`套件

#### 編譯

`npm run build`

#### 部屬

- 用`tanwanimohit/deploy-react-to-ghpages@v1.0.1`
- 看`.github/workflows/main.yml`

### 其他

- i did not put .env (cuz 用不到)
    - 你可以加，反正在生產環境會吃這個檔案

### 舊版

#### 啟動

`npm run start-v0`

#### 編譯

`npm run build-v0`

## TODO

- fix npm run serve
    - pubhtml will default @ build, but need default @ minarun, where minarun inside have build
- do a auto to check if webpack.config.js 's publicPath: '/minarrun/' == package.json 's "homepage": "https://gitname.github.io/minarun"