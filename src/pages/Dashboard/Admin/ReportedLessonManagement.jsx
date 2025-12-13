import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReportedLessonManagement = () => {
    const axiosSecure = useAxiosSecure()
    const [lesson, setLesson] = useState([])
    const detailsModalRef = useRef(null)
  
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
    }
    const handleIgnoreReport = async (lessonId, currStatus) => {
      const newStatus = currStatus === 'pending' ? 'resolved' : 'pending'
      const updatedDoc = {
        status: newStatus
      }
      const res = await axiosSecure.patch(`/lesson-reports/${lessonId}/status`, updatedDoc);

      if (res.data.modifiedCount > 0) {
        console.log('done')
      }

    }
    const handleDeleteReport = async (lessonId) => {
      
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
                <th>Report No.</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {allReportsByLessonArray.map((lesson, index) => (
                <tr key={lesson._id}>
                  <td>{index + 1}</td>
                  <td>
                    <p className="font-semibold">{lesson.title}</p>
                  </td>
                  <td>
                    <p className="font-semibold">{lesson.category}</p>
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
                        <td>{report.timestamp}</td>
                        <td className="space-x-2">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() =>
                              handleIgnoreReport(lesson.lessonId, report.status)
                            }
                          >
                            Ignore
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleDeleteReport(lesson.lessonId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </dialog>
        </div>
      </div>
    );
};

export default ReportedLessonManagement;