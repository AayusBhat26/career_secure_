import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { email: { $regex: search, $options: 'i' } },
            { phoneNumber: { $regex: search, $options: 'i' } },
            { remarks: { $regex: search, $options: 'i' } },
          ],
        }
      : {};
    
    const users = await User.find(searchQuery)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments(searchQuery);
    
    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const user = new User(body);
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json(userResponse, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
