import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/apiProxy';
import { TaskCreate } from '@/types/task';

function requireUserId(request: NextRequest): string | null {
  const userId = request.headers.get('x-user-id')?.trim();
  if (!userId) {
    return null;
  }
  return userId;
}

/**
 * GET /api/tasks
 * Retrieve all tasks from the backend
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = requireUserId(request);
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  return proxyRequest('/tasks', request, {
    method: 'GET',
    headers: {
      'x-user-id': userId,
    },
  });
}

/**
 * POST /api/tasks
 * Create a new task
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = requireUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json() as TaskCreate;

    // Validate required fields
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Task title is required and must be a string' },
        { status: 400 }
      );
    }

    return proxyRequest('/tasks', request, {
      method: 'POST',
      headers: {
        'x-user-id': userId,
      },
      body: {
        title: body.title,
        status: body.status || 'todo',
        dueDate: body.dueDate || null,
      },
    });
  } catch (error) {
    console.error('Error parsing POST request:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
