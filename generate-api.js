var exec = require('child_process').exec;
let url = process.env.npm_config_configurl || "http://localhost:3000/api-json";

generateApi(url, 'backend-services');

function generateApi(url, folder) { 
    // current swagger cli version is 3.0.36
    var task = 'java -jar ./utils/swagger-codegen-cli.jar generate ';
    task += ' -i ' + url    
    task += ' -l typescript-angular'; 
    task += ' -o ./src/app/' + folder + ' --additional-properties ngVersion=14'; 
    task += ' -c ./typescript_config.json'
    console.log('start execurtng swagger-codegen task from the url: ' + url); 
    var child = exec(task, function (error, stdout, stderr) { 
    if (error !== null) { console.log(error); 
        console.log("error executing swagger-codegen task"); 
    } 
        else console.log('swagger-codegen task succeeded') 
    }); 
}