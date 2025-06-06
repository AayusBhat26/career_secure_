# Career Secure Dashboard

A professional Next.js application for user management with authentication, MongoDB integration, and comprehensive CRUD operations.

## Features

- 🔐 **Secure Authentication** - NextAuth.js with credentials provider
- 📊 **Professional Dashboard** - Clean, modern UI with Tailwind CSS
- 🗄️ **MongoDB Integration** - Full CRUD operations with Mongoose
- 📄 **Pagination** - Server-side pagination for large datasets
- 🔍 **Search Functionality** - Search users by email, phone, or remarks
- ✏️ **User Management** - Create, read, update, and delete users
- 📱 **Responsive Design** - Works perfectly on all device sizes
- 🎨 **Modern UI/UX** - Professional design with intuitive navigation

## Quick Setup & Verification

### Automated Setup
Run one of these scripts for automatic setup and verification:

**Windows Command Prompt:**
```bash
verify-project.bat
```

**PowerShell:**
```bash
.\verify-project.ps1
```

### Manual Setup
1. **Install dependencies**: `npm install`
2. **Build project**: `npm run build` 
3. **Start development**: `npm run dev`
4. **Visit**: http://localhost:3000

### Project Status: ✅ PRODUCTION READY

All features implemented and tested:
- ✅ User authentication system
- ✅ MongoDB integration
- ✅ Professional dashboard UI
- ✅ CRUD operations
- ✅ Responsive design
- ✅ TypeScript type safety
- ✅ Error handling
- ✅ Form validation

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form with Zod validation

## Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-secure-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Update the environment variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/career_secure_db
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **MongoDB Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `career_secure_db`
   - Update `MONGODB_URI` in `.env.local`

5. **Seed the Database (Optional)**
   ```bash
   node scripts/seed.js
   ```
   This creates:
   - Admin user: `admin@example.com` / `password123`
   - Sample users for testing

6. **Run the Development Server**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Login with demo credentials or create new users

## Usage

### Authentication
- Navigate to `/auth/signin` to login
- Demo credentials: `admin@example.com` / `password123`

### Dashboard Features
- **User Table**: View all users with pagination
- **Search**: Filter users by email, phone, or remarks
- **Add User**: Create new users with comprehensive form
- **Edit User**: Update existing user information
- **Delete User**: Remove users with confirmation
- **Status Indicators**: Visual indicators for verification and recruiter status

### User Data Structure
```javascript
{
  email: "user@example.com",
  phoneNumber: "1234567890",
  password: "hashed_password",
  agreeToTerms: true,
  isRecruiter: false,
  isVerified: true,
  cinPanGst: "COMPANY123",
  companyEmail: "user@company.com",
  officeEmail: "user@office.com",
  remarks: "Additional notes",
  favouriteCourses: ["Course1", "Course2"]
}
```

## API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Users
- `GET /api/users` - Get paginated users list
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get specific user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── users/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── auth/signin/page.tsx
│   ├── dashboard/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthProvider.tsx
│   ├── DashboardLayout.tsx
│   ├── UserModal.tsx
│   └── UserTable.tsx
├── lib/
│   └── mongodb.ts
└── models/
    └── User.ts
```

## Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- Protected API routes
- Input validation and sanitization
- CSRF protection via NextAuth

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env.local`
   - Verify database permissions

2. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Clear browser cookies and try again

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors with `npm run lint`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or create an issue in the repository.
