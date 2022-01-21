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

*:warning: Due to personal preference I will use **Visual Studio Code** for the rest of this document.*

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

By installing this dev dependencies we are adding support for **Typescript**, **[Webpack](https://webpack.js.org/)** and **[Webpack plugin for SAM](https://www.npmjs.com/package/aws-sam-webpack-plugin)**. We will also add *node* and *lambda* types support.

*:warning: Having tried multiple approaches in the past this one seems to be the most effective to me and I've adopted it some time ago.*

```shell
npm install webpack webpack-cli typescript ts-loader aws-sam-webpack-plugin @types/aws-lambda @types/node --save-dev
```

### Configure Webpack for SAM

**Webpack** is essentialy a static module bundler but it also provides support for plugins that can perform a wide range of tasks such as asset management, bundle optimization and injection of environment variables.

In this case, I use Webpack to configure the AWS SAM Plugin and use it to generate my lambda function(s) everytime I build the project.

First, create a `webpack.config.js` file on the root folder.

```shell
touch webpack.config.js
```

Copy the following configuration to webpack.config.js. This will configure webpack to use SAM.

```javascript
const path = require("path");
const AwsSamPlugin = require("aws-sam-webpack-plugin");

const awsSamPlugin = new AwsSamPlugin();

module.exports = {
    // Loads the entry object from the AWS::Serverless::Function resources in your
    // SAM config. Setting this to a function will
    entry: () => awsSamPlugin.entry(),

    // Write the output to the .aws-sam/build folder
    output: {
        filename: (chunkData) => awsSamPlugin.filename(chunkData),
        libraryTarget: "commonjs2",
        path: path.resolve(".")
    },

    // Create source maps
    devtool: "source-map",

    // Resolve .ts and .js extensions
    resolve: {
        extensions: [".ts", ".js"]
    },

    // Target node
    target: "node",

    // AWS recommends always including the aws-sdk in your Lambda package but excluding can significantly reduce
    // the size of your deployment package. If you want to always include it then comment out this line. It has
    // been included conditionally because the node10.x docker image used by SAM local doesn't include it.
    // externals: process.env.NODE_ENV === "development" ? [] : ["aws-sdk"],

    // Set the webpack mode
    mode: process.env.NODE_ENV || "production",

    // Add the TypeScript loader
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    },

    // Add the AWS SAM Webpack plugin
    plugins: [awsSamPlugin]
};
```

*:warning: This configuration comes from the AWS SAM Plugin documentation.*

### Add Typescript configuration file

Typescript expects a configuration file - `tsconfig.json` - on the root folder of the project. We can do this by using the Typescript command-line.

The following command will create a `tsconfig.json` file with all the supported configuration options.

```shell
tsc --init
```

You can adapt the Typescript configuration file to your own preferences but mine looks like this.

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "sourceMap": true,
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Configure build scripts

Last thing we need to do is to configure the build scripts to use webpack instead of the default npm scripts. For simplicity sake I only have support for `build` and `watch` commands but you can extend this (e.g. with tests).

Open `package.json` file and add replace the scripts section with the following.

```jsonc
...

"scripts": {
    "build": "webpack-cli",     # uses SAM to build the project and creates bundle ready to publish
    "watch": "webpack-cli -w"   # allows project debugging
  }
  
...
```
