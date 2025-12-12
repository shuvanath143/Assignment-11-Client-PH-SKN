import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const queryClient = useQueryClient()
    const axiosSecure = useAxiosSecure()
    const { data: users = [], } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            console.log(data)
            return data
        }
    })
    const { data: lessons = [], } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/lessons')
            console.log(data)
            return data
        }
    })

    const lessonCountByUser = {}
    lessons.forEach(lesson => {
        const email = lesson.creatorEmail
        if (lessonCountByUser[email]) {
            lessonCountByUser[email]++
        }
        else lessonCountByUser[email] = 1
    });

    const handleUpdateUserRole = async (userId, userRole) => {
        const changeRole = userRole === 'user' ? 'admin' : 'user'
        const updatedDoc = {
            role: changeRole
        }
        Swal.fire({
            title: "Are you sure?",
            text: "This will change the user status!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
            const res = await axiosSecure.patch(
              `/users/${userId}/role`,
              updatedDoc
            );
            queryClient.invalidateQueries(["users"]);
            if (res.data.modifiedCount > 0)
                Swal.fire("Updated!", `Role has been changed as ${changeRole}`, "success");
            }
        });
    }
    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
            await axiosSecure.delete(`/users/${userId}`);

            queryClient.invalidateQueries(["users"]);

            Swal.fire("Deleted!", "User has been removed.", "success");
            }
        });
    }
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>User Image</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Total Lessons Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="flex items-center justify-center">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{user.displayName}</div>
                  </td>
                  <td>
                    <div className="font-bold">{user.email}</div>
                  </td>
                  <td>
                    <div className="font-bold">{user.role}</div>
                  </td>
                  <td>
                    <div className="font-bold">
                      {lessonCountByUser[user.email]}
                    </div>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={
                        () => handleUpdateUserRole(user._id, user.role)
                      }
                    >
                      Edit Role
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    The site has no users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ManageUsers;