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
 * GET /api/tasks/:id
 * Retrieve a specific task by ID
 * Note: Backend doesn't currently support this, but keeping for future use
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const userId = requireUserId(request);
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'Task ID is required' },
      { status: 400 }
    );
  }

  return proxyRequest(`/tasks/${id}`, request, {
    method: 'GET',
    headers: {
      'x-user-id': userId,
    },
  });
}

/**
 * PUT /api/tasks/:id
 * Update an existing task
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const userId = requireUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
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

    return proxyRequest(`/tasks/${id}`, request, {
      method: 'PUT',
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
    console.error('Error parsing PUT request:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/tasks/:id
 * Delete a task by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const userId = requireUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    return proxyRequest(`/tasks/${id}`, request, {
      method: 'DELETE',
      headers: {
        'x-user-id': userId,
      },
    });
  } catch (error) {
    console.error('Error parsing DELETE request:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 400 }
    );
  }
}
