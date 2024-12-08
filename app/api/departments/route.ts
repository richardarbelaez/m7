import { NextResponse } from 'next/server'
import { departmentService } from '@/lib/db/services/department-service'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const departments = departmentService.getDepartments(userId)
    return NextResponse.json(departments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch departments' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const department = departmentService.createDepartment(body)
    return NextResponse.json(department)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create department' }, 
      { status: 500 }
    )
  }
}