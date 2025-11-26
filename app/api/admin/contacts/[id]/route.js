import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE a contact submission
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { message: 'Failed to delete contact', error: error.message },
      { status: 500 }
    );
  }
}

