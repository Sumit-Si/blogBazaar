import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { logoLight, logoDark } from '@/assets';

const MotionLink = motion.create(Link);

const Logo = () => {
  return (
    <MotionLink
      to={'/'}
      className='text-primary text-lg font-semibold'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      viewTransition
    >
      <img
        src={logoLight}
        width={115}
        height={32}
        className='hidden dark:block'
        alt=''
      />
      <img
        src={logoDark}
        width={115}
        height={32}
        className='dark:hidden'
        alt=''
      />
    </MotionLink>
  );
};

export default Logo;
