import React from 'react';

const Page = ({children}: React.PropsWithChildren) => {
  return (
    <div className='pt-24 pb-10'>{children}</div>
  )
}

export default Page;