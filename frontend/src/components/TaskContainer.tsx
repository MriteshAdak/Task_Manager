'use client';

import { useOptimistic, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addTaskAction, deleteTaskAction } from '@/lib/actions';
import { SubmitButton } from './SubmitButton';
import { Trash2 } from 'lucide-react';
import { StatusPicker } from './StatusPicker';

interface Task {
  id: string;
  title: string;
  status: string;
  sending?: boolean;
}

export default function TaskContainer({ initialTasks }: { initialTasks: Task[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (state, newTask: Task) => [...state, { ...newTask, sending: true }]
  );

  async function handleAdd(formData: FormData) {
    const title = formData.get('title') as string;
    const status = formData.get('status') as string;
    
    addOptimisticTask({ id: Math.random().toString(), title, status });
    
    formRef.current?.reset();
    await addTaskAction(formData);
  }

  return (
    <div className="space-y-8">
      <form ref={formRef} action={handleAdd} className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex gap-2">
          <input 
            name="title"
            required
            placeholder="What needs to be done?"
            className="flex-1 p-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 text-slate-800 outline-none transition-all"
          />
          <StatusPicker />
        </div>
        <SubmitButton />
      </form>

      <div className="grid gap-4">
        <AnimatePresence mode='popLayout'>
          {optimisticTasks.map((task) => (
            <motion.div
              layout
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: task.sending ? 0.6 : 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{task.title}</span>
                <span className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                  task.status === 'done' ? 'text-emerald-500' : 'text-amber-500'
                }`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>

              <form action={deleteTaskAction.bind(null, task.id)}>
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  className="text-slate-300 p-2 rounded-full hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </motion.button>
              </form>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}