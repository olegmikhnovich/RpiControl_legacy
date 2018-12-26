# RpiControl (Deprecated)
[![Build Status](https://travis-ci.com/olegmikhnovich/RpiControl.svg?branch=master)](https://travis-ci.com/olegmikhnovich/RpiControl)
[![Status](https://img.shields.io/badge/status-deprecated-red.svg)](https://github.com/olegmikhnovich/RpiControl#old-versions)

RpiControl is a platform for Raspbian. RpiControl lets you configure and manage your device remotely over your local network.

This project contains 3 modules

| Module        | Description     |
| ------------- |-----------------|
| [RpiControl](https://github.com/olegmikhnovich/RpiControl) | Engine |
| [RpiControl Portal](https://github.com/olegmikhnovich/RpiControlPortal)      | Web portal |
| [Dashboard](https://github.com/olegmikhnovich/RpiControlDashboard) | Client Dashboard |

## Requirements
* OS Raspbian Jessie or newer
* Node.js 10 or newer

## Full build
The best way to install the RpiControl project is to use [this](https://gist.github.com/olegmikhnovich/c73fa0e91fbaa15d15997fc901db895b) script.
It will build and install the RpiControl engine and web portal.
Installation takes about 20 minutes on [Raspberry PI 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/).

* Download installation script from [this gist](https://gist.github.com/olegmikhnovich/c73fa0e91fbaa15d15997fc901db895b).
* Give execute permission to your script
```sh
chmod +x /path/to/installscript.sh
```
* And run it
```sh
./installscript.sh
```
After this steps you should reboot your device.

If you want build this project using PC, you can [build engine locally](https://github.com/olegmikhnovich/RpiControl#build-engine-locally)

### Full build project structure

| Module        | Location      |
| ------------- |:-------------:|
| [RpiControl](https://github.com/olegmikhnovich/RpiControl)      | /usr/local/rpicontrolapp |
| [RpiControl Portal](https://github.com/olegmikhnovich/RpiControlPortal)      | /usr/local/rpicontrolapp/portal      |
| Application Settings | /etc/rpicontrol      |

## Build engine locally
* Install [Gulp CLI](https://gulpjs.com/).
* Clone this repo
```sh
git clone https://github.com/olegmikhnovich/RpiControl.git
```
* Go to the folder
```sh
cd RpiControl
```
* Build project
```sh
gulp
```

## Useful links
* [Installing script](https://gist.github.com/olegmikhnovich/c73fa0e91fbaa15d15997fc901db895b)
* [Uninstalling script](https://gist.github.com/olegmikhnovich/a51544fb61ef9b3c6589376668d6d009)
* [Project update script](https://gist.github.com/olegmikhnovich/84d8d0b4d31352c819de95ed343b4bfd)

## License
Copyright (c) Mikhnovich Oleg. All rights reserved.
Licensed under the [Apache-2.0](LICENSE) License.
