import { NextResponse } from 'next/server'
import { departmentService } from '@/lib/db/services/department-service'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    departmentService.updateDepartment(params.id, body)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update department' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    departmentService.archiveDepartment(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to archive department' }, 
      { status: 500 }
    )
  }
}