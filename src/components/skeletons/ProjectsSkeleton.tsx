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
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
  grid-auto-rows: auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  grid-column: span 2;
  min-height: 400px;

  @media (max-width: 1024px) {
    grid-column: span 1;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  flex-wrap: wrap;
`;

export const ProjectsSkeleton = () => {
  const projectsCount = contentData.projects?.length || 3;

  return (
    <Container>
      <Header>
        <Skeleton $width="300px" $height="3.5rem" style={{ margin: '0 auto 1rem' }} />
        <Skeleton $width="500px" $height="1.5rem" style={{ margin: '0 auto' }} />
      </Header>
      <Grid>
        {Array.from({ length: projectsCount }).map((_, i) => (
          <Card key={i}>
            <Skeleton $width="100%" $height="200px" $radius="0.5rem" style={{ marginBottom: '1.5rem' }} />
            <CardHeader>
              <Skeleton $width="70%" $height="1.75rem" style={{ marginBottom: '0.5rem' }} />
              <SkeletonText $width="100%" />
              <SkeletonText $width="90%" />
            </CardHeader>
            <CardContent>
              <SkeletonText $width="95%" />
              <SkeletonText $width="85%" />
            </CardContent>
            <Tags>
              <Skeleton $width="60px" $height="1.5rem" $radius="1rem" />
              <Skeleton $width="70px" $height="1.5rem" $radius="1rem" />
              <Skeleton $width="80px" $height="1.5rem" $radius="1rem" />
            </Tags>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
