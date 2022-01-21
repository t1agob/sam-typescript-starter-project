# SAM Typescript starter project

## Motivation

I :heart: [Typescript](https://www.typescriptlang.org/), mostly for it's simplicity and 'types' support. For those reasons I tend to use it in most of my serverless projects.

Still on [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) there is no project template setup for Typescript. For that reason I always end up wasting time running the same commands and configurations before I actually start to code. 

**For that reason, I created this starter project to save me (and you, hopefully) some precious time.**

## Requirements

If you are looking for this starter project, most probably you already have this dependencies installed, but if you don't please make sure you install them now.

- [Node.js 14](https://nodejs.org/)
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

## Configure your project for Typescript

### Create a serverless application using SAM

We will start by creating a NodeJs SAM application using the default template. This will provide us with the default folder structure and all the dependencies required to use SAM.

```shell
sam init --name serverless-api-demo --runtime nodejs14.x
```

### Open the project folder in your favorite IDE

SAM is a command-line tool that supports developers on building, testing and deploying their serverless application to AWS. So there aren't many requirements around the code editor you use. You can either use VS Code, Sublime or Notepad, it doesn't really matter.

> Due to personal preference I will use **Visual Studio Code** for the rest of this document.

```shell
cd serverless-api-demo
code .                        
```

### Initialize NPM

This step will create a `package.json` file in your root folder. You can create this file manually but running the command will save us some time by setting up some default configurations.

```shell
npm init
```

### Install dev dependencies

By installing this dev dependencies we are adding support for Typescript, Webpack and Webpack plugin for SAM.

<div class="panel panel-success">

**Info**
{: .panel-heading}

<div class="panel-body">

Having tried multiple approaches in the past this one seems to be the most effective to me and I've adopted it some time ago.

</div>
</div>

```shell
npm install webpack webpack-cli typescript ts-loader aws-sam-webpack-plugin @types/aws-lambda @type/node --save-dev
```
