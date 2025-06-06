'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import UserTable from '@/components/UserTable';
import UserModal from '@/components/UserModal';
import { IUser } from '@/models/User';
import toast from 'react-hot-toast';

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    fetchUsers();
  }, [session, status, router, pagination.page, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
      });
      
      const response = await fetch(`/api/users?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
        setPagination(data.pagination);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      toast.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  const handleModalSave = async (userData: Partial<IUser>) => {
    try {
      const url = modalMode === 'create' ? '/api/users' : `/api/users/${selectedUser?._id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success(`User ${modalMode === 'create' ? 'created' : 'updated'} successfully`);
        setIsModalOpen(false);
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save user');
      }
    } catch (error) {
      toast.error('Error saving user');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <button
            onClick={handleCreateUser}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add New User
          </button>
        </div>

        <UserTable
          users={users}
          loading={loading}
          pagination={pagination}
          search={search}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
          user={selectedUser}
          mode={modalMode}
        />
      </div>
    </DashboardLayout>
  );
}
