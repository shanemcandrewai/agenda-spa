# Agenda single page application
## Installation
### Prequisites
#### Git
##### Linux
    sudo add-apt-repository ppa:git-core/ppa
    sudo apt-get update
    sudo apt-get install git
#### Node.js
##### Linux
##### [Download Linux Binaries (x64)](https://nodejs.org/en/download)
##### [Unzip, install and set environmental variable](https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux)
##### Update ~/.profile
    # Nodejs
    VERSION=v14.15.1
    DISTRO=linux-x64
    export PATH=[install path]/node-$VERSION-$DISTRO/bin:$PATH
##### Refresh profile
    . ~/.profile
### Agenda SPA
    git clone https://github.com/shanemcandrewai/agenda-spa.git
    cd agenda-spa
#### [install dependencies from package.json](https://docs.npmjs.com/cli/v6/commands/npm-install)
    npm install
## [Local testing](https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line)
    node app.js
## Heroku
### [Local testing](https://devcenter.heroku.com/articles/heroku-local)
    npx heroku local
### [Verify remote repository is tracked](https://git-scm.com/docs/git-remote)
    git remote -v
#### Expected output
    heroku	https://git.heroku.com/agenda-spa.git (fetch)
    heroku	https://git.heroku.com/agenda-spa.git (push)
    origin	https://github.com/shanemcandrewai/agenda-spa.git (fetch)
    origin	https://github.com/shanemcandrewai/agenda-spa.git (push)
##### [If heroku missing, add remote to local repository](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote)
#### [Deploy code](https://devcenter.heroku.com/articles/git#deploying-code)
    git push heroku master
