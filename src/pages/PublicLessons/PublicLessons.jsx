import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../hooks/useAxios';
import LessonCard from '../../components/LessonCard/LessonCard';

const PublicLessons = () => {
    const axiosInstance = useAxios()
    const { data: publicLessons = [] } = useQuery({
        queryKey: ['public-lessons'],
        queryFn: async () => {
            const res = await axiosInstance(`/lessons?isPublic=public`);
            return res.data
        }
    })
    return (
      <div>
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Explore The Public Experiences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publicLessons
              .map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                />
              ))}
          </div>
        </section>
      </div>
    );
};

export default PublicLessons;