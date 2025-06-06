'use client';

import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { IUser } from '@/models/User';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<IUser>) => void;
  user: IUser | null;
  mode: 'create' | 'edit';
}

export default function UserModal({ isOpen, onClose, onSave, user, mode }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<IUser>>({
    email: '',
    phoneNumber: '',
    password: '',
    agreeToTerms: false,
    isRecruiter: false,
    isVerified: false,
    cinPanGst: '',
    companyEmail: '',
    officeEmail: '',
    remarks: '',
    favouriteCourses: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && user) {
        setFormData({
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: '', // Don't show existing password
          agreeToTerms: user.agreeToTerms,
          isRecruiter: user.isRecruiter,
          isVerified: user.isVerified,
          cinPanGst: user.cinPanGst || '',
          companyEmail: user.companyEmail || '',
          officeEmail: user.officeEmail || '',
          remarks: user.remarks || '',
          favouriteCourses: user.favouriteCourses || [],
        });
      } else {
        // Reset form for create mode
        setFormData({
          email: '',
          phoneNumber: '',
          password: '',
          agreeToTerms: false,
          isRecruiter: false,
          isVerified: false,
          cinPanGst: '',
          companyEmail: '',
          officeEmail: '',
          remarks: '',
          favouriteCourses: [],
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (mode === 'create' && !formData.password) {
      newErrors.password = 'Password is required';
    }

    if (mode === 'create' && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Remove empty password for edit mode
    const submitData = { ...formData };
    if (mode === 'edit' && !submitData.password) {
      delete submitData.password;
    }

    onSave(submitData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {mode === 'create' ? 'Add New User' : 'Edit User'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="user@example.com"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black ${
                  errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1234567890"
              />
              {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password {mode === 'create' ? '*' : '(leave empty to keep current)'}
              </label>
              <div className="relative">                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Company Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Email
              </label>              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
                placeholder="company@example.com"
              />
            </div>

            {/* Office Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office Email
              </label>              <input
                type="email"
                name="officeEmail"
                value={formData.officeEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
                placeholder="office@example.com"
              />
            </div>

            {/* CIN/PAN/GST */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CIN/PAN/GST
              </label>              <input
                type="text"
                name="cinPanGst"
                value={formData.cinPanGst}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
                placeholder="Enter CIN/PAN/GST number"
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
              placeholder="Additional notes about the user..."
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Agree to Terms
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isRecruiter"
                checked={formData.isRecruiter}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Is Recruiter
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isVerified"
                checked={formData.isVerified}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Is Verified
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {mode === 'create' ? 'Create User' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
