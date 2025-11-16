import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Variants } from 'motion/react';

const HERO = {
  headline: 'Mastering the Craft, One Bit at a Time.',
  text: 'This blog is built on a simple principle: the best way to understand a topic is to explain it. Follow along through a growing library of articles and videos to learn how to master the craft of web development.',
} as const;

// Motion variants
const containerVariant: Variants = {
  to: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const childVariant: Variants = {
  from: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  to: {
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Hero = ({ className, ...props }: React.ComponentProps<'section'>) => {
  return (
    <section
      className={cn('section', className)}
      {...props}
    >
      <motion.div
        className='container'
        initial='from'
        whileInView='to'
        viewport={{once: true}}
        variants={containerVariant}
      >
        <motion.h1 className='text-3xl font-semibold text-balance text-center md:text-4xl xl:text-5xl' variants={childVariant}>
            {HERO.headline}
        </motion.h1>

        <motion.p className='text-center text-balance text-muted-foreground mt-5 mb-8 md:text-xl' variants={childVariant}>
            {HERO.text}
        </motion.p>

        <motion.div className='max-w-md mx-auto flex items-center gap-2' variants={childVariant}>
            <Input name='email' placeholder='Enter your email' autoComplete='email' aria-label='Enter your email' />

            <Button>Subscribe</Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
