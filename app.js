const express = require('express');
const mongoose = require('mongoose');

var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://172.31.9.131:27017/ToDoList', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database!');
});


// Define schema and model for tasks
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
  });
  const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.post('/tasks', async (req, res) => {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: false
    });
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.put('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (!task) throw new Error('Task not found');
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = req.body.completed || task.completed;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) throw new Error('Task not found');
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

app.listen(3000, function () {
    console.log("listening on port 3000.")
})
