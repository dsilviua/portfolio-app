import { Skeleton, SkeletonText } from '@components/ui/Skeleton';
import { contentData } from '@data/content';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: -2.5rem;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: 1rem;
`;

export const ExperienceSkeleton = () => {
  const experienceCount = contentData.experience?.length || 3;

  return (
    <Container>
      <Header>
        <Skeleton $width="350px" $height="3.5rem" style={{ margin: '0 auto 1rem' }} />
        <Skeleton $width="500px" $height="1.5rem" style={{ margin: '0 auto' }} />
      </Header>
      <Timeline>
        {Array.from({ length: experienceCount }).map((_, i) => (
          <TimelineItem key={i}>
            <ItemHeader>
              <Skeleton $width="60%" $height="2rem" style={{ marginBottom: '0.5rem' }} />
              <Skeleton $width="40%" $height="1.25rem" style={{ marginBottom: '0.5rem' }} />
              <Skeleton $width="30%" $height="1rem" />
            </ItemHeader>
            <div>
              <SkeletonText $width="100%" />
              <SkeletonText $width="95%" />
              <SkeletonText $width="90%" />
              <SkeletonText $width="85%" />
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};
