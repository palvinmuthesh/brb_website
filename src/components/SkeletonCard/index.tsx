// src/components/SkeletonCard.tsx
import React from 'react';
import { Skeleton, Card, CardContent } from '@mui/material';

const SkeletonCard: React.FC = () => (
  <Card className="mb-4 w-full">
    <CardContent>
      <Skeleton variant="rectangular" width="100%" height={140} />
      <Skeleton height={30} style={{ marginTop: 16 }} />
      <Skeleton height={20} width="60%" />
    </CardContent>
  </Card>
);

export default SkeletonCard;
