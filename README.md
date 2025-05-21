# MinaRun

---

- [ ] km
- [ ] 日曆
- [ ] 單元測試

---

## 快速開始

初次設置項目，請運行初始化腳本：

```bash
# Windows
.\init-project.bat

# Linux/Mac
chmod +x init-project.sh
./init-project.sh
```

初始化完成後，你可以使用多種方式啟動項目。

## 啟動方針

### 自動化環境設置與啟動

我們提供了多種自動化的環境設置系統，可以無需手動修改配置文件，直接切換不同的環境。

#### 圖形界面 (GUI)

執行以下命令，系統將自動檢測並啟動圖形界面：

```
# Windows
setup.bat

# Linux/Mac
chmod +x setup.sh  # 首次使用時，賦予執行權限
./setup.sh
```

GUI 介面會自動使用 Electron 或者 Python（取決於系統安裝）。

#### 命令行介面 (CLI)

##### Windows 系統使用者

直接執行 `run.bat` 批處理文件：

```
run.bat
```

選擇環境和操作即可。

##### Linux/Mac 系統使用者

執行 bash 腳本：

```
chmod +x run.sh  # 首次使用時，賦予執行權限
./run.sh
```

選擇環境和操作即可。

#### 使用 npm 指令

也可以直接使用預設的 npm 指令：

##### 設定環境：
```
npm run env           # 互動式選擇環境
npm run env:dev       # 設定為開發環境 (localhost)
npm run env:local     # 設定為本地網絡 (192.168.0.101)
npm run env:prod      # 設定為生產環境 (GitHub Pages)
```

##### 根據環境構建和啟動：
```
npm run build:dev     # 在開發環境下構建
npm run build:local   # 在本地網絡環境下構建
npm run build:prod    # 在生產環境下構建

npm run serve:dev     # 在開發環境下構建並啟動
npm run serve:local   # 在本地網絡環境下構建並啟動
npm run serve:prod    # 在生產環境下構建並啟動
```

#### Docker 容器化部署

對於需要標準化環境的情況，我們提供了 Docker 配置和管理工具：

##### 使用腳本管理 Docker 環境（推薦）

Windows PowerShell:
```powershell
# 啟動開發環境
.\docker-env.ps1 -Env dev -Action start

# 啟動本地網絡環境
.\docker-env.ps1 -Env local -Action start

# 啟動生產環境
.\docker-env.ps1 -Env prod -Action start

# 查看環境日誌
.\docker-env.ps1 -Env dev -Action logs

# 重新構建環境
.\docker-env.ps1 -Env prod -Action build
```

Linux/Mac:
```bash
# 首次使用時賦予執行權限
chmod +x docker-env.sh

# 啟動開發環境
./docker-env.sh -e dev -a start

# 啟動本地網絡環境
./docker-env.sh -e local -a start

# 啟動生產環境
./docker-env.sh -e prod -a start

# 查看環境日誌
./docker-env.sh -e dev -a logs
```

##### 直接使用 docker-compose 命令

```bash
# 開發環境
docker-compose up minarun-dev

# 本地網絡環境
docker-compose up minarun-local

# 生產環境
docker-compose up minarun-prod
```

#### 檢查設定一致性

確保 package.json 和 webpack.config.js 配置一致：

```bash
npm run check-config
```

### 舊方法（不推薦）

在linux win 間切換，可用 setup.py

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