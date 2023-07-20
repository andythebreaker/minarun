# 標題

---

- [ ] km
- [ ] 日曆
- [ ] 單元測試

---

package.json`"homepage": "https://gitname.github.io/minarun",`一定要對

###### 貼心提醒
有setup.py gui 可以用

> why is gitname not andythebreaker ?

## 啟動方針

### how to run on local

設定:
"package.json"
`"homepage": "http://192.168.0.101:48489/./",`

###### 貼心提醒
有setup.py gui 可以用

`npm run serve`

> 只剩這可會動，然後github 上的那個會動

- 你會需要`pubhtmlhere`這個`npm`套件

> 好像我嵌入了

#### 編譯

`npm run build`

> 基本上都包好了 這應該可以不用管

#### 部屬

- 用`tanwanimohit/deploy-react-to-ghpages@v1.0.1`
- 看`.github/workflows/main.yml`

### 其他

在linux win 間切換，請用setup .py

- i did not put .env (cuz 用不到)
    - 你可以加，反正在生產環境會吃這個檔案

### 舊版

#### 啟動

`npm run start-v0`

#### 編譯

`npm run build-v0`

## GPX

DB JSON -> GPX

cat ex.json | python json2gpx.py > test4.gpx

## NOTAM

- src/index.html need to be in utf-8

## TODO

- fix npm run serve
    - pubhtml will default @ build, but need default @ minarun, where minarun inside have build
- do a auto to check if webpack.config.js 's publicPath: '/minarrun/' == package.json 's "homepage": "https://gitname.github.io/minarun"
- index html 的 `%` 問題