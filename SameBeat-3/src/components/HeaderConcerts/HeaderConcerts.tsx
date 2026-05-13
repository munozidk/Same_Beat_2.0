import React from 'react';
import './HeaderConcerts.css';

interface HeaderConcertsProps {
  onSearch?: (value: string) => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  title?: string;
}

const HeaderConcerts: React.FC<HeaderConcertsProps> = ({
  title = "Concerts"
}) => {
  return (
    <div className="headerContainer">
      <div className="leftSection">
        <h1 className="title">{title}</h1>
      </div>
      
      <div className="centerSection">
        {/* Search bar placeholder */}
      </div>
      
      <div className="rightSection">
        {/* Icons placeholder */}
      </div>
    </div>
  );
};

export default HeaderConcerts;
