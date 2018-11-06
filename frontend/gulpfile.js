const gulp = require('gulp');
const replace = require('gulp-replace');
const fs = require('fs');
const rename = require('gulp-rename');
const argv = require('yargs').argv;

const actionTemplatesDir = './templates/actionTemplates';
const fileTemplatesDir = './templates/fileTemplates';
const configDir = './templates';
const actionTemplatesDistDir = './src';
const fileTemplatesDistDir = './src/views/Algorithms';

function generateAlgorithmActions(algo){
  gulp.src(actionTemplatesDir + '/algorithm/**/*.templ')
    .pipe(replace('{%action%}', algo.action))
    .pipe(replace('{%algorithm%}', algo.algorithm))
    .pipe(replace('{%AlgorithmUppercase%}', algo.algorithm.toUpperCase()))
    .pipe(replace('{%AlgorithmCamelcase%}', algo.algorithm.charAt(0).toUpperCase() + algo.algorithm.slice(1)))
    .pipe(replace('{%AlgorithmRequest%}', algo.algorithmRequest))
    .pipe(replace('{%AlgorithmResponse%}', algo.algorithmResponse))
    .pipe(replace('{%RequestResponseTypes%}', algo.algorithmRequest === algo.algorithmResponse ? algo.algorithmRequest : algo.algorithmRequest + ', ' + algo.algorithmResponse ))
    .pipe(replace('{%backendPath%}', algo.backendPath))

    .pipe(rename(function(path){
      path.dirname += '/' + algo.algorithm;
      path.extname = '.ts';
    }))

    .pipe(gulp.dest(actionTemplatesDistDir));
}

function generateAlgorithmFileTemplates(algo){
  gulp.src(fileTemplatesDir + '/**/*')
  .pipe(replace('{%action%}', algo.action))
    .pipe(replace('{%algorithm%}', algo.algorithm))
    .pipe(replace('{%ActionCamelcase%}', algo.action.charAt(0).toUpperCase() + algo.action.slice(1)))
    .pipe(replace('{%AlgorithmCamelcase%}', algo.algorithm.charAt(0).toUpperCase() + algo.algorithm.slice(1)))
    .pipe(replace('{%AlgorithmRequest%}', algo.algorithmRequest))
    .pipe(replace('{%AlgorithmResponse%}', algo.algorithmResponse))
    .pipe(replace('{%url%}', algo.url))

    .pipe(rename(function(path){
      path.dirname = algo.algorithm.charAt(0).toUpperCase() + algo.algorithm.slice(1) + '/' + path.dirname;
      if (path.extname === '.templ'){
        path.extname = '.ts';
      } else if (path.extname === '.templx'){
        path.extname = '.tsx';
      }
    }))

    .pipe(gulp.dest(fileTemplatesDistDir));
}

function generateActionIndex(algos){
  let imports = '', union = '';
  for (let algo of algos){
    let capitalized = algo.algorithm.charAt(0).toUpperCase() + algo.algorithm.slice(1);
    imports += `import { ${capitalized}Action } from './${algo.algorithm}';\n`;
    union += `${capitalized}Action | `
  }
  union = union.slice(0, -3);

  gulp.src(actionTemplatesDir + '/common/actions/index.templ')
    .pipe(replace('{%imports%}', imports))
    .pipe(replace('{%actions%}', union))
    .pipe(rename(function(path){
      path.extname = '.ts';
    }))
    .pipe(gulp.dest(actionTemplatesDistDir + '/actions'));
}

function generateApiBase(){
  gulp.src(actionTemplatesDir + '/common/API/Base.templ')
    .pipe(rename(function(path){
      path.extname = '.ts';
    }))
    .pipe(gulp.dest(actionTemplatesDistDir + '/API'));
}

function generateEpicsIndex(algos){
  let imports = '', union = '';
  for (let algo of algos){
    imports += `import { ${algo.action}Epic } from './${algo.algorithm}';\n`;
    union += `  ${algo.action}Epic,\n`
  }
  union = union.slice(0, -2);

  gulp.src(actionTemplatesDir + '/common/epics/index.templ')
    .pipe(replace('{%imports%}', imports))
    .pipe(replace('{%epics%}', union))
    .pipe(rename(function(path){
      path.extname = '.ts'
    }))
    .pipe(gulp.dest(actionTemplatesDistDir + '/epics'));
}

function generateReducerIndex(algos){
  let imports = '', union = '', states = '';
  for (let algo of algos){
    let capitalized = algo.algorithm.charAt(0).toUpperCase() + algo.algorithm.slice(1);
    imports += `import { ${algo.action}, State as ${capitalized}State } from './${algo.algorithm}';\n`;
    union += `  ${algo.action},\n`
    states += `  ${algo.action}: ${capitalized}State,\n`
  }
  union = union.slice(0, -2);
  states = states.slice(0, -2);

  gulp.src(actionTemplatesDir + '/common/reducers/index.templ')
    .pipe(replace('{%imports%}', imports))
    .pipe(replace('{%reducers%}', union))
    .pipe(replace('{%states%}', states))
    .pipe(rename(function(path){
      path.extname = '.ts';
    }))
    .pipe(gulp.dest(actionTemplatesDistDir + '/reducers'));
}

function generateAllActions(){
  console.log("Generating actions for all algorithms");
  const config = JSON.parse(fs.readFileSync( configDir + '/config.json'));
  for (const algorithm of config){
    console.log('  - generating actions for ' + algorithm.algorithm);
    generateAlgorithmActions(algorithm);
  }
  generateActionIndex(config);
  generateApiBase();
  generateEpicsIndex(config);
  generateReducerIndex(config);
}

function generateActionsFor(algorithm){
  const config = JSON.parse(fs.readFileSync( configDir + '/config.json'));
  let algoConfig = config.filter(item => item.algorithm === algorithm)
  if (algoConfig.lenght === 0){
    console.log("Unknown algorithm ", algorithm);
    return;
  }
  algoConfig = algoConfig[0];
  console.log("Generating actions for algorithm ", algorithm);
  generateAlgorithmActions(algoConfig);
}

function generateFileTemplatesFor(algorithm){
  console.log("generating template files for algorithm ", algorithm);

  const config = JSON.parse(fs.readFileSync( configDir + '/config.json'));
  let algoConfig = config.filter(item => item.algorithm === algorithm)
  if (algoConfig.lenght === 0){
    console.log("Unknown algorithm ", algorithm);
    return;
  }
  algoConfig = algoConfig[0];
  console.log("Generating files for algorithm ", algorithm);
  generateAlgorithmFileTemplates(algoConfig);
}
/**
 * Task generate is used to generate files according to preset templates and confuguration file.
 * Generated files can be either actions (actions + constants, APIs, epics, reducers) and their index files 
 * or templates for algorithm view (main controller, input controller, result controller, routes, selectors, validation files and so on).
 * 
 * Action files can be generated for all used algorithms as well as transformation and comparison. 
 * File templates are supposed to be used for algorithms only.
 * 
 * Action files are ready to use.
 * File templates should be reviewed and completed where necessary (places marked by stars).
 * 
 * Usage:
 * - "generate" or "generate --actions" will generate action files for all algorithms in configuration file AND the common index files.
 * - "generate --algorithm X --all" will generate action and file templates for the algorithm X.
 * - "generate --algorithm X --actions" will generate action files for algorithm X.
 * - "generate --algorithm X --files" will generate file templates for algorithm X.
 * 
 * WARNING: generated files will always replace existing ones, use generation carefully!
 */
gulp.task('generate', () => {
  if (argv.algorithm === undefined && argv.files === undefined && argv.all === undefined){
    generateAllActions();
  }
  else if (argv.algorithm !== undefined){
    if (argv.all){
      generateActionsFor(argv.algorithm);
      generateFileTemplatesFor(argv.algorithm)
    }
    else {
      if (argv.actions){
        generateActionsFor(argv.algorithm);
      }
      if (argv.files){
        generateFileTemplatesFor(argv.algorithm);
      }
    }
  }
  else {
    console.log("Unknown arguments, see documentation")
  }
})
