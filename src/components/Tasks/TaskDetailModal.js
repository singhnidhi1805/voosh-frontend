import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Box,
  Typography,
  useTheme,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateTask, deleteTask } from '../../services/taskService';
import useTasks from '../../hooks/useTasks';

const TaskDetailModal = ({ task, onClose, onSave }) => {
  const { setTasks } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [column, setColumn] = useState(task.column);
  const theme = useTheme();

  const handleSave = async () => {
    try {
      const updatedTask = await updateTask(task._id, { title, description, column });
      onSave(updatedTask);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
      onClose();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          borderRadius: 16,
          boxShadow: theme.shadows[5],
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Task Details
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <TextField
            select
            label="Status"
            fullWidth
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: theme.spacing(2) }}>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
            },
          }}
        >
          Delete
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            marginLeft: 2,
            color: theme.palette.grey[700],
            borderColor: theme.palette.grey[500],
            '&:hover': {
              borderColor: theme.palette.grey[600],
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            marginLeft: 2,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailModal;
