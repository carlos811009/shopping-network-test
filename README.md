# 禎嚴選 － 網購平台

## 開發初衷
朋友組建了一個購物群組，時常會有成員詢問已經詢問過的相似產品，因此藉由這個禎嚴選來減少管理者的工作量，以及讓成員方便瀏覽所有過往的產品項目。

## 畫面

## 測試網址
https://shoppingcarlos.herokuapp.com/login

### 管理員測試帳號
- 帳號：root
- 密碼：passport

### 使用者測試帳號
- 帳號：user1
- 密碼：passport

### 主畫面
![image](https://github.com/carlos811009/shopping-network-test/blob/master/%E6%88%AA%E5%9C%96%202021-08-05%2017.35.24.png)

### RWD
![image](https://github.com/carlos811009/shopping-network-test/blob/master/%E6%88%AA%E5%9C%96%202021-08-05%2017.36.35.png)

### 產品描述
![image](https://github.com/carlos811009/shopping-network-test/blob/master/%E6%88%AA%E5%9C%96%202021-08-05%2017.39.05.png)

### 後台管理
![image](https://github.com/carlos811009/shopping-network-test/blob/master/%E6%88%AA%E5%9C%96%202021-08-05%2017.36.54.png)

## 開發環境
Node.js

## 套件
- express(4.17.1)
- express-hanlebars(5.3.2)
- method-override
- express-session(1.17.2)
- connect-flash(0.1.1)
- bcryptjs(2.4.3)
- passport(0.4.1)
- passport-local(1.0.0)

## 資料庫
MySQL

## 資料庫套件
- mysql2(2.2.5)
- sequelize(6.6.5)
- sequelize-cli(6.2.0)

## 部署工具
- Heroku

## 版本管理
- git

## 種子資料工具
- faker(5.5.3)

## 免費線上存放圖庫
- imgur-node-api(0.1.0)

# 使用專案

## terminal執行
- git clone https://github.com/carlos811009/shopping-network-test.git
- npm install express

## 資料庫名稱
- shopping

## 建立種子資料
- npx sequelize db:migrate
- npx sequelize db:seed:all

## 執行
- npm run dev


