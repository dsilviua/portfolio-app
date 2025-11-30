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

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

export const HobbiesSkeleton = () => {
  const gamesCount = contentData.games?.length || 5;
  const photographyCount = contentData.photography?.length || 9;
  const tabsCount = 3; // Games, Photography, Speed Skating

  return (
    <Container>
      <Header>
        <Skeleton $width="200px" $height="3.5rem" style={{ margin: '0 auto 1rem' }} />
        <Skeleton $width="400px" $height="1.5rem" style={{ margin: '0 auto' }} />
      </Header>
      <Tabs>
        {Array.from({ length: tabsCount }).map((_, i) => (
          <Skeleton key={i} $width="120px" $height="2.5rem" $radius="0.5rem" />
        ))}
      </Tabs>
      <Content>
        {Array.from({ length: Math.max(gamesCount, photographyCount, 3) }).map((_, i) => (
          <Card key={i}>
            <Skeleton $width="100%" $height="250px" $radius="0" />
            <CardContent>
              <Skeleton $width="70%" $height="1.5rem" style={{ marginBottom: '1rem' }} />
              <SkeletonText $width="100%" />
              <SkeletonText $width="95%" />
              <SkeletonText $width="90%" />
            </CardContent>
          </Card>
        ))}
      </Content>
    </Container>
  );
};
