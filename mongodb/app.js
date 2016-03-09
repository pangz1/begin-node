var mongoose = require('mongoose');
var mongodb = require('mongodb');

var db = mongoose.connect('mongdb://localhost/tasks');

var Schema = mongoose.Schema;

var Tasks = new Schema({
  'project': String,
  'description': String,
  'author': String
});

mongoose.model('Task', Tasks); // register a model

var Task = mongoose.model('Task');
var task = new Task();

task.project = 'readNodejsInAction';
task.description = 'good good study, day day up';
task.author = 'walle';

task.save(function (err){
  if(err) throw err;
  console.log('tasks saved');
});

var TaskRetrieve = mongoose.model('Task');
TaskUpdate.find({'author': 'walle'}, function (err, tasks){
  tasks.forEach(function (task, index){});
});

var TaskUpdate = mongoose.model('Task');
TaskUpdate.update({'author': 'walle'},
                  {'description': 'finished before next weak'},
                  {multi: false},   // update only one
                  function (err, rowsUpdated){
                    
                  });
