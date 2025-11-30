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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const CertificationsSkeleton = () => {
  const certificationsCount = contentData.certifications?.length || 4;

  return (
    <Container>
      <Header>
        <Skeleton $width="300px" $height="3.5rem" style={{ margin: '0 auto 1rem' }} />
        <Skeleton $width="400px" $height="1.5rem" style={{ margin: '0 auto' }} />
      </Header>
      <Grid>
        {Array.from({ length: certificationsCount }).map((_, i) => (
          <Card key={i}>
            <IconWrapper>
              <Skeleton $width="48px" $height="48px" $radius="50%" />
            </IconWrapper>
            <Skeleton $width="80%" $height="1.75rem" style={{ marginBottom: '1rem' }} />
            <Skeleton $width="120px" $height="1.5rem" style={{ marginBottom: '1rem' }} />
            <SkeletonText $width="100%" />
            <SkeletonText $width="90%" />
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
