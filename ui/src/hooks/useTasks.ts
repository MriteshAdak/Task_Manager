import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { TaskStatus } from '@/components/atoms/StatusBadge';
import { Task, TaskCreate } from '@/types/task';
// import { TaskItem } from '@/components/molecules/TaskItem';
// import { DateTimeInput } from '@/components/atoms/DateTimeInput';

export function useTasks(userId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await apiService.getTasks(userId);
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string, status: TaskStatus = 'todo', dueDate?: string) => {
    if (!userId) return;

    const newTaskTemplate: TaskCreate = { title, status, dueDate: dueDate || null };
    const savedTask = await apiService.saveTask(newTaskTemplate, userId);
    setTasks(prev => [...prev, savedTask]);
  };

  //  | number
  const deleteTask = async (id: string | number) => {
    if (!userId) return;

    await apiService.deleteTask(id, userId);
    setTasks(prev => prev.filter(t => t.id !== String(id)));
  };

  const updateTaskStatus = async (id: string | number, status: TaskStatus) => {
    if (!userId) return;

    const taskToUpdate = tasks.find(t => t.id === String(id));
    if (!taskToUpdate) return;

    const updatedTask: Task = {
      ...taskToUpdate,
      status,
    };

    try {
      // Optimistic Update: change UI immediately
      setTasks(prev => prev.map(t => t.id === String(id) ? { ...t, status } : t));
      
      // Persist change
      await apiService.updateTask(id, updatedTask, userId);
    } catch (err) {
      console.error("Failed to update status", err);
      // Fallback: reload data if persistence fails
      loadData();
    }
  };

  const STATUS_ORDER: TaskStatus[] = ['todo', 'in_progress', 'done'];

  const moveTask = async (id: string | number, direction: 'forward' | 'backward') => {
    const task = tasks.find(t => t.id === String(id));
    if (!task) return;

    const currentIndex = STATUS_ORDER.indexOf(task.status);
    const nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= STATUS_ORDER.length) return;

    await updateTaskStatus(id, STATUS_ORDER[nextIndex]);
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  return { tasks, loading, addTask, deleteTask, updateTaskStatus, moveTask };
}