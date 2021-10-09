#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
var path = require("path");
var fs = require("fs");

const inquirer = require("./lib/inquirer");
const files = require("./lib/files");

toolFolderUrl = path.dirname(fs.realpathSync(__filename));

function copyFileSync(source, target) {
  var targetFile = target;
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

copyFolderRecursiveSync = (source, target) => {
  return new Promise((resolve, reject) => {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
      // Copy
      if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
          var curSource = path.join(source, file);
          if (fs.lstatSync(curSource).isDirectory()) {
            copyFolderRecursiveSync(curSource, targetFolder);
          } else {
            copyFileSync(curSource, targetFolder);
          }
        });
      }
      resolve("✅ API successfully generated!");
    } else {
      reject("❌ API folder already exist !");
    }
  });
};

console.log(
  chalk.yellow(figlet.textSync("API-Generator", { horizontalLayout: "full" }))
);

// if (files.directoryExists('package.json')) {
//     console.log(chalk.red('Vous êtes déjà dans un projet node ! Placez vous dans un dossier vide !'));
//     process.exit();
//   }

generateEnvFile = (jwt_key, mongo_url) => {
    return `
    JWT_KEY=${jwt_key}
    MONGO_URL=${mongo_url}
                `
}


const run = async () => {
  await inquirer.askEnvParams().then((data) => {
    copyFolderRecursiveSync(`${toolFolderUrl}\\back-end-template`, ".")
      .then((res) => {
        fs.appendFile(".\\back-end-template\\.env", generateEnvFile(data.JWT_KEY, data.MONGO_URL), function (err) {
          if (err) throw err;
          console.log("✅ .env file generated !");
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  });
};

run();
