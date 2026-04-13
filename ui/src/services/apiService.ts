import { Task, TaskCreate } from '@/types/task';

const API_URL = '/api/tasks';

function buildUserHeaders(userId: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'x-user-id': userId,
  };
}

export const apiService = {
  getTasks: async (userId: string): Promise<Task[]> => {
    const res = await fetch(API_URL, {
      headers: {
        'x-user-id': userId,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },
  
  saveTask: async (task: TaskCreate, userId: string): Promise<Task> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: buildUserHeaders(userId),
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create task');
    }
    return res.json();
  },
  
  updateTask: async (id: string | number, task: TaskCreate, userId: string): Promise<Task> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: buildUserHeaders(userId),
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update task');
    }
    return res.json();
  },
  
  deleteTask: async (id: string | number, userId: string): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': userId,
      },
    });
    if (!res.ok) throw new Error('Failed to delete task');
  },
};