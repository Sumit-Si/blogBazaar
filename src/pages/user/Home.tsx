import Hero from '@/components/Home/Hero';
import RecentBlogs from '@/components/Home/RecentBlogs';
import Page from '@/components/Page';
import React from 'react';

const Home = () => {
  return (
  <Page>
    <Hero />

    <RecentBlogs />
  </Page>
  );
};

export default Home;
