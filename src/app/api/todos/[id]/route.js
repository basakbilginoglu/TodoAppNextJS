import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Silme işlemi
export async function DELETE(req, res) {
    const { id } = req.query;
    try {
      const todo = await prisma.todo.delete({
        where: { id },
      });
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
  
  // Güncelleme işlemi
  export async function PUT(req, res) {
    const { id } = req.query;
    const { title, completed } = req.body;
    try {
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { title, completed },
      });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update todo' });
    }
  }
  