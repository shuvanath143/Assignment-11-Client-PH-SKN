import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ReportedLessonManagement = () => {
    const axiosSecure = useAxiosSecure()
    const [lesson, setLesson] = useState([])
    const detailsModalRef = useRef(null)
    const queryClient = useQueryClient()
  
    const { data: reportedLessons = [] } = useQuery({
        queryKey: ['reported-lessons'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/lesson-reports`);
            return data
        }
    })
    
    const allReportsByLesson = {}

    reportedLessons.forEach(report => {
        const lessonId = report.lessonId
        
        if (!allReportsByLesson[lessonId]) {
            allReportsByLesson[lessonId] = {
              lessonId,
              lessonTitle: report.lessonTitle,
              lessonCreator: report.lessonCreator,
              lessonCategory: report.lessonCategory,
              reports: [],
            };
        }

        allReportsByLesson[lessonId].reports.push({
        _id: report._id,
        reporterUserId: report.reporterUserId,
        reason: report.reason,
        status: report.status,
        timestamp: report.timestamp,
        });
    });
    // console.log(allReportsByLesson);
    const allReportsByLessonArray = Object.values(allReportsByLesson);
    const countReports = {}
    console.log(allReportsByLessonArray);
    allReportsByLessonArray.map((i) => {
      console.log(i.lessonTitle, i.reports.length);
      countReports[i.lessonId] = i.reports.length
    });

    const handleShowDetails = (lessonId) => {
      const data = allReportsByLessonArray.find(
        (lesson) => lesson.lessonId === lessonId
      );
      console.log('Data in lesson', data)
      setLesson(data)
      detailsModalRef.current.showModal();
      queryClient.invalidateQueries(["reported-lessons"]);
    }
    const handleIgnoreReport = async (reportId, currStatus) => {
      console.log('reportedid', reportId)
      const newStatus = currStatus === "pending" ? "ignored" : "pending";
      const updatedDoc = {
        status: newStatus,
      };
      if (currStatus === "pending") {
        const res = await axiosSecure.patch(
          `/lesson-reports/${reportId}/status`,
          updatedDoc
        );
        console.log("report ignore status: ", res.data);

        if (res.data.modifiedCount > 0) {
          console.log("done");

          Swal.fire({
            icon: "success",
            title: "Reviewed!",
            text: "Report has been resolved.",
            customClass: {
              container: "swal-over-modal",
              backdrop: "swal-over-modal",
            },
          });
          setLesson((prev) => ({
            ...prev,
            reports: prev.reports.map((r) =>
              r._id === reportId ? { ...r, status: newStatus } : r
            ),
          }));
          queryClient.invalidateQueries(["reported-lessons"]);
        }
      } else {
        Swal.fire("Pending!", "Try again later.", "error");
      }
    };

    const handleDeleteReport = async (lessonId, reportId, currStatus) => {
      if (currStatus !== 'Lesson Deleted') {
        Swal.fire({
        title: "Are you sure?",
        text: "This will permanently delete the lesson!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.delete(`/lessons/${lessonId}`);
          const updatedDoc = {
            status: "Lesson Deleted",
          };
          lesson.isDeleted = true
          await axiosSecure.patch(`/lesson-reports/${reportId}/status`,updatedDoc);
          Swal.fire("Deleted!", "Lesson has been removed.", "success");
          queryClient.invalidateQueries(["reported-lessons"]);
        }
      });
      }
    };
    
    const handleCloseModal = () => {
      
      detailsModalRef.current.close();
      queryClient.invalidateQueries(["reported-lessons"]);
                     
    }
    
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Lessons</h1>

        <div className="overflow-x-auto shadow rounded-xl">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Lesson</th>
                <th>Category</th>
                <th>Author</th>
                <th>Report No.</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {allReportsByLessonArray.map((lesson, index) => (
                <tr key={lesson._id}>
                  <td>{index + 1}</td>
                  <td>
                    <p className="font-semibold">{lesson.lessonTitle}</p>
                  </td>
                  <td>
                    <p className="font-semibold">{lesson.lessonCategory}</p>
                  </td>
                  <td>
                    <p className="font-semibold">{lesson.lessonCreator}</p>
                  </td>
                  <td>
                    <p className="font-semibold">
                      {countReports[lesson.lessonId]}
                    </p>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleShowDetails(lesson.lessonId)}
                    >
                      See Reports
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <dialog ref={detailsModalRef} className="modal modal-middle">
            {lesson.reports && (
              //       reporterUserId: report.reporterUserId,
              // reason: report.reason,
              // status: report.status,
              // timestamp: report.timestamp,
              <div className="modal-box w-full max-w-4xl">
                <table className="table table-zebra w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Reporter Email</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Reporting Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {lesson.reports.map((report, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{report.reporterUserId}</td>
                        <td>{report.reason}</td>
                        <td>{report.status}</td>
                        <td>
                          {new Date(report.timestamp).toLocaleDateString()}
                        </td>
                        <td className="space-x-2">
                          <button
                            className="btn btn-sm btn-secondary"
                            disabled={
                              report.status !== "pending" ? true : false
                            }
                            onClick={() =>
                              handleIgnoreReport(report._id, report.status)
                            }
                          >
                            Ignore
                          </button>
                          <button
                            className="btn btn-sm btn-warning"
                            disabled={ lesson.isDeleted ? true : false }
                            onClick={() =>
                              handleDeleteReport(
                                lesson.lessonId,
                                report._id,
                                report.status
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Modal Close Button */}
                <div className="flex justify-center">
                  <div className="modal-action">
                    <form method="dialog">
                      <button
                        className="btn btn-accent"
                        onClick={() => {
                          handleCloseModal();
                        }}
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </dialog>
        </div>
      </div>
    );
};

export default ReportedLessonManagement;