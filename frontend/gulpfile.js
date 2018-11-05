const gulp = require('gulp');
const replace = require('gulp-replace');
const fs = require('fs');
const rename = require('gulp-rename');

const actionTemplatesDir = './actionTemplates';
const actionTemplatesDistDir = './src';

function generateAlgorithmFiles(algo){
  gulp.src( actionTemplatesDir + '/algorithm/**/*.templ')
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

gulp.task('generate', () => {
  const config = JSON.parse(fs.readFileSync( actionTemplatesDir + '/config/config.json'));
  for (const algorithm of config){
    console.log('Generating output files for ' + algorithm.algorithm);
    generateAlgorithmFiles(algorithm);
  }
  generateActionIndex(config);
  generateApiBase();
  generateEpicsIndex(config);
  generateReducerIndex(config);
})