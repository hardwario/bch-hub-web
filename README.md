<a href="https://www.hardwario.com/"><img src="https://www.hardwario.com/ci/assets/hw-logo.svg" width="200" alt="HARDWARIO Logo" align="right"></a>

# HARDWARIO HUB web

[![Travis](https://img.shields.io/travis/bigclownlabs/bch-hub-web/master.svg)](https://travis-ci.org/bigclownlabs/bch-hub-web)
[![Release](https://img.shields.io/github/release/bigclownlabs/bch-hub-web.svg)](https://github.com/bigclownlabs/bch-hub-web/releases)
[![License](https://img.shields.io/github/license/bigclownlabs/bch-hub-web.svg)](https://github.com/bigclownlabs/bch-hub-web/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/hardwario_en.svg?style=social&label=Follow)](https://twitter.com/hardwario_en)

## How it works

Bigclown Hub is a simple static webpage that acts as a guidepost to all services running in raspberry pi or your computer/server.

Links on the left side displays paired devices, MQTT messages or node-red or node-red dashboard. The node-red pages are displayed using frames.

For running this the simpliest solution is install nginx `apt install nginx` and copy the content of this repository to `/var/www` folder.

The message tab is using Mosquitto's MQTT over websockets, so you have to enable that functionality in mosquitto config file.

## Development

    git clone https://github.com/bigclownlabs/bch-hub-web.git
    cd bch-hub-web
    npm install
    npm start


## Build

    npm run build

### Test build

    npm install http-server -g
    http-server dist

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT/) - see the [LICENSE](LICENSE) file for details.

---

Made with &#x2764;&nbsp; by [**HARDWARIO a.s.**](https://www.hardwario.com/) in the heart of Europe.
