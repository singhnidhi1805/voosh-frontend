import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Container,
  Paper,
  Box,
  useTheme,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import { useDrop } from 'react-dnd';
import useTasks from '../../hooks/useTasks';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskDetailModal from './TaskDetailModal';
import { getTasks } from '../../services/taskService';

const TaskBoard = ({ userId }) => {
  const { tasks, setTasks } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const theme = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getTasks();
        const userTasks = allTasks.filter((task) => task.userId === userId);
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, [userId]);

  const moveTask = (id, newColumn) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, column: newColumn } : task
    );
    setTasks(updatedTasks);
  };

  const [, dropTodo] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, 'todo'),
  });

  const [, dropInProgress] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, 'in-progress'),
  });

  const [, dropDone] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, 'done'),
  });

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const filteredTasks = tasks
    .filter((task) => task.title.includes(searchTerm) || task.description.includes(searchTerm))
    .sort((a, b) => (sortOrder === 'asc' ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate)));

  const columnColors = {
    todo: '#FFD54F', // Amber for 'To Do'
    'in-progress': '#4FC3F7', // Light Blue for 'In Progress'
    done: '#81C784', // Light Green for 'Done'
  };

  const renderColumn = (title, columnName, dropRef) => (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={5}
        ref={dropRef}
        sx={{
          p: 3,
          height: '100%',
          backgroundColor: columnColors[columnName],
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ 
            color: theme.palette.getContrastText(columnColors[columnName]), 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          {title}
        </Typography>
        <Box sx={{ minHeight: 300, maxHeight: 500, overflowY: 'auto', mt: 2 }}>
          {filteredTasks
            .filter((task) => task.column === columnName)
            .map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => handleTaskClick(task)}
                sx={{ mb: 2, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
              />
            ))}
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          mb: 4,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Task Board
      </Typography>
      <Box mb={4}>
        <TaskForm />
      </Box>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          label="Search Tasks"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ 
            borderRadius: '8px', 
            backgroundColor: '#fff', 
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 150, ml: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort By"
            sx={{ 
              borderRadius: '8px', 
              backgroundColor: '#fff',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <MenuItem value="asc">Due Date (Ascending)</MenuItem>
            <MenuItem value="desc">Due Date (Descending)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={4}>
        {renderColumn('TO DO', 'todo', dropTodo)}
        {renderColumn('IN PROGRESS', 'in-progress', dropInProgress)}
        {renderColumn('DONE', 'done', dropDone)}
      </Grid>
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={(updatedTask) => {
            const updatedTasks = tasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            );
            setTasks(updatedTasks);
            setSelectedTask(null);
          }}
        />
      )}
    </Container>
  );
};

export default TaskBoard;
