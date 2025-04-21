
import React from 'react';
import Layout from '@/components/layout/Layout';
import CreateQuizForm from '@/components/quiz/CreateQuizForm';

const Create = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-2 text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">Create New Quiz</h1>
          <p className="text-muted-foreground">
            Design your own quiz with multiple-choice questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <CreateQuizForm />
        </div>
      </div>
    </Layout>
  );
};

export default Create;
