import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tüm todo'ları listele
export async function GET() {
  try {
    const todos = await prisma.todo.findMany(); // Tüm todo'ları getir
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

// Yeni bir todo ekle
export async function POST(req) {
  try {
    const { title } = await req.json();
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed: false, // Varsayılan olarak tamamlanmamış
      },
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error adding todo:', error);
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}



