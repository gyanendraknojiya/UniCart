import { Icon } from '@chakra-ui/icons';
import React from 'react';
import { CgFeed } from 'react-icons/cg';

const Sidebar = () => {
  const menuList = [{ name: 'Feed', icon: CgFeed }];
  return (
    <div className="w-64 p-2">
      {menuList.map((item) => (
        <div key={item.name} className="flex items-center mt-3 p-1 rounded text-sm">
          <Icon as={item.icon} w={5} h={5} />
          <div className="ml-2">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
