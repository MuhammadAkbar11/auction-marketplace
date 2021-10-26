# Baebid eAuction Platform

> eAuction platfrom build with MERN Stack (Mysql, Express, React, Nodejs) & Redux

<br>

## Panduan

### ES Modules di Node

Dikarenakan menggunakan ECMAScript Modul di bagian backend dalam project ini. Pastikan untuk versi node yang terinstal setidaknya 14.16+. Download node di official web-nya [Download Nodejs](https://nodejs.org/en/download/)

<br/>

### Env Variabel

Buatlah 2 file yaitu .env.dev di dalam root folder dan .env dan tambahkan di dalamnya :

```
# Untuk file .env.dev

NODE_ENV = development
PORT = 5000
DB_HOST=localhost
DB_POST=3306
DB_NAME=lelang-online   // nama database
DB_USERNAME=root
DB_PASSWORD=root   // Kosongkan jika Mysqlnya tidak menggunakan password
JWT_SECRET = baebid2001

```

```
# Untuk file .env

NODE_ENV = production
PORT = 8080
DB_HOST=localhost
DB_POST=3306
DB_NAME=lelang-online   // nama database
DB_USERNAME=root
DB_PASSWORD=root    // Kosongkan jika Mysqlnya tidak menggunakan password
JWT_SECRET = baebid2001

```

<br/>

### Instalasi

install yarn

```
> npm install -g yarn
```

Install Dependencies untuk server & client

```
> yarn install
> cd client
> yarn install
```

Menjalankan mode pengembangan

```
> cd ..
> yarn server
```

<br/>

### Build & Menjankan Mode Produksi

Membuat static file untuk produksi build

```
> cd client
> yarn run build
```

Menjalankan mode produksi

```
> yarn start  // pastikan di root folder
```

<br/>

### Contoh Login Untuk Admi

```
ID : ADM001
pw : admin
```

Untuk Pengguna silahkan registrasi dan login.
