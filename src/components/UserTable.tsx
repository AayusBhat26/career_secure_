'use client';

import React, { useState } from 'react';
import { Search, Edit, Trash2, CheckCircle, XCircle, Shield, User } from 'lucide-react';
import { IUser } from '@/models/User';

interface UserTableProps {
  users: IUser[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  search: string;
  onSearch: (search: string) => void;
  onPageChange: (page: number) => void;
  onEdit: (user: IUser) => void;
  onDelete: (userId: string) => void;
}

export default function UserTable({
  users,
  loading,
  pagination,
  search,
  onSearch,
  onPageChange,
  onEdit,
  onDelete,
}: UserTableProps) {
  const [searchInput, setSearchInput] = useState(search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <form onSubmit={handleSearchSubmit} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by email, phone, or remarks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          {user.isRecruiter ? (
                            <Shield className="h-5 w-5 text-primary-600" />
                          ) : (
                            <User className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.isRecruiter ? 'Recruiter' : 'User'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.phoneNumber}</div>
                    {user.companyEmail && (
                      <div className="text-sm text-gray-500">{user.companyEmail}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isVerified ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.isVerified ? 'Verified' : 'Not Verified'}
                      </span>
                      {user.agreeToTerms && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Terms Agreed
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      {user.cinPanGst && (
                        <div className="text-xs text-gray-500">CIN/PAN: {user.cinPanGst}</div>
                      )}
                      {user.officeEmail && (
                        <div className="text-xs text-gray-500">Office: {user.officeEmail}</div>
                      )}
                      {user.remarks && (
                        <div className="text-xs text-gray-600 mt-1 truncate max-w-32">
                          {user.remarks}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="text-primary-600 hover:text-primary-900 p-1 rounded"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user._id!)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 text-sm font-medium border rounded-md ${
                  page === pagination.page
                    ? 'text-primary-600 bg-primary-50 border-primary-300'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
