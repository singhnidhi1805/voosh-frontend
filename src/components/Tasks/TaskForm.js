import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, InputAdornment } from '@mui/material';
import { createTask } from '../../services/taskService';
import useTasks from '../../hooks/useTasks';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddTask, CalendarToday } from '@mui/icons-material';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { setTasks } = useTasks();
  const [dueDate, setDueDate] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title, description, column: 'todo', dueDate });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle('');
      setDescription('');
      setDueDate(null);
      setMessage('Task created successfully!');
    } catch (error) {
      setMessage('Error creating task');
      console.error('Error creating task', error);
    }
  };

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 4, 
        backgroundColor: (theme) => theme.palette.background.default, 
        borderRadius: 4, 
        boxShadow: (theme) => theme.shadows[5]
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: (theme) => theme.palette.primary.main, 
          fontWeight: 'bold', 
          mb: 2 
        }}
      >
        Add New Task
      </Typography>
      
      {message && (
        <Typography 
          variant="body1" 
          sx={{ color: message.includes('successfully') ? 'green' : 'red', mb: 2 }}
        >
          {message}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2, 
            mb: 2 
          }}
        >
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddTask color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
          />

          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                fullWidth 
                margin="normal" 
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
              />
            )}
          />
        </Box>

        <Box mt={3}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<AddTask />}
            size="large"
            sx={{ 
              borderRadius: 3,
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'all 0.3s',
              },
            }}
          >
            Add Task
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TaskForm;
