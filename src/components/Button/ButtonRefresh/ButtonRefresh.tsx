import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../Button';
import styles from './ButtonRefresh.module.css';

export interface ButtonRefreshProps {
  /** Click handler */
  onRefresh: () => void;
  /** Whether the refresh is in progress */
  isRefreshing?: boolean;
  /** Button title/tooltip */
  title?: string;
  /** Icon size */
  iconSize?: number;
}

export function ButtonRefresh({
  onRefresh,
  isRefreshing = false,
  title = 'Refresh',
  iconSize = 14,
}: ButtonRefreshProps) {
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    setIsClicking(true);
    onRefresh();
  };

  useEffect(() => {
    if (isClicking) {
      const timer = setTimeout(() => {
        setIsClicking(false);
      }, 600); // Duration of one rotation
      return () => clearTimeout(timer);
    }
  }, [isClicking]);

  const getIconClassName = () => {
    if (isRefreshing) return styles.spinning;
    if (isClicking) return styles.rotating;
    return '';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      onClick={handleClick}
      disabled={isRefreshing}
      title={title}
    >
      <RefreshCw size={iconSize} className={getIconClassName()} />
    </Button>
  );
}
