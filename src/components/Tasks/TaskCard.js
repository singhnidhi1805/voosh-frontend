import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, Typography, Chip } from '@mui/material';

const TaskCard = ({ task, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Softer, modern color gradients for different task statuses
  const columnColors = {
    todo: 'linear-gradient(135deg, #FFF9C4 30%, #FFEB3B 90%)', // Light pastel yellow to gold
    'in-progress': 'linear-gradient(135deg, #E1F5FE 30%, #81D4FA 90%)', // Light pastel blue to teal
    done: 'linear-gradient(135deg, #C8E6C9 30%, #66BB6A 90%)', // Soft mint green to forest green
  };

  return (
    <Card
      ref={drag}
      onClick={onClick}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        mb: 2,
        background: columnColors[task.column],
        color: '#333', // Darker text for better readability
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-5px)',
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', letterSpacing: '0.5px', color: '#333' }}
        >
          {task.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.7)' }}
        >
          {task.description}
        </Typography>
        <Chip
          label={task.column.replace('-', ' ').toUpperCase()}
          size="small"
          sx={{
            backgroundColor:
              task.column === 'todo'
                ? '#FDD835'
                : task.column === 'in-progress'
                ? '#0288D1'
                : '#43A047',
            color: '#fff',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
