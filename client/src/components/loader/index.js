import React from 'react';

const Loading = () => {
  return (
    <div className="top-0 left-0 fixed w-screen h-screen flex items-center justify-center z-[999999] backdrop-blur-sm">
      <img src="/assets/images/loader.svg" alt="Loading..." className="z-10 " />
    </div>
  );
};

export default Loading;
