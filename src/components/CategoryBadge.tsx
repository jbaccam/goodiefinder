import { motion } from 'framer-motion';
import {
  Monitor,
  Server,
  Layers,
  Cloud,
  CloudCog,
  Smartphone,
  Database,
  Shield,
  Sparkles,
} from 'lucide-react';
import type { JobCategory } from '../utils/constants';

const categoryConfig: Record<JobCategory, {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  bgColor: string;
  textColor: string;
}> = {
  '': { icon: Sparkles, label: 'Other', bgColor: 'bg-lavender-light/50', textColor: 'text-lavender-dark' },
  frontend: { icon: Monitor, label: 'Frontend', bgColor: 'bg-dusty-pink-light/50', textColor: 'text-dusty-pink-dark' },
  backend: { icon: Server, label: 'Backend', bgColor: 'bg-dusty-blue-light/50', textColor: 'text-dusty-blue-dark' },
  fullstack: { icon: Layers, label: 'Fullstack', bgColor: 'bg-soft-mint-light/50', textColor: 'text-soft-mint-dark' },
  devops: { icon: Cloud, label: 'DevOps', bgColor: 'bg-peach-light/50', textColor: 'text-peach-dark' },
  cloud: { icon: CloudCog, label: 'Cloud', bgColor: 'bg-lavender-light/50', textColor: 'text-lavender-dark' },
  mobile: { icon: Smartphone, label: 'Mobile', bgColor: 'bg-dusty-pink-light/50', textColor: 'text-dusty-pink-dark' },
  data: { icon: Database, label: 'Data', bgColor: 'bg-dusty-blue-light/50', textColor: 'text-dusty-blue-dark' },
  security: { icon: Shield, label: 'Security', bgColor: 'bg-soft-mint-light/50', textColor: 'text-soft-mint-dark' },
};

interface CategoryBadgeProps {
  category: JobCategory;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const config = categoryConfig[category] || categoryConfig[''];
  const Icon = config.icon;

  const sizeClasses = size === 'sm'
    ? 'px-2 py-1 text-xs gap-1'
    : 'px-3 py-1.5 text-sm gap-1.5';

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center rounded-full font-medium
        ${config.bgColor} ${config.textColor} ${sizeClasses}
      `}
    >
      <Icon className={iconSize} />
      <span>{config.label}</span>
    </motion.span>
  );
}
