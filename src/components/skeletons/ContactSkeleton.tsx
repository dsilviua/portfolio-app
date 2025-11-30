import { Skeleton } from '@components/ui/Skeleton';
import { contentData } from '@data/content';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CardSkeleton = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const ContactSkeleton = () => {
  const { contact, social } = contentData;

  // Count actual items
  const githubLink = social?.find(s => s.name === 'github')?.url;
  const facebookLink = social?.find(s => s.name === 'facebook')?.url;
  const twitterLink = social?.find(s => s.name === 'twitter')?.url;

  const contactMethodsCount = [
    contact?.email,
    contact?.linkedin,
    contact?.calendly,
    contact?.location
  ].filter(Boolean).length;

  const socialMediaCount = [githubLink, facebookLink, twitterLink].filter(Boolean).length;

  return (
    <Container>
      <Header>
        <Skeleton $width="300px" $height="3.5rem" style={{ margin: '0 auto 1rem' }} />
        <Skeleton $width="600px" $height="1.5rem" style={{ margin: '0 auto' }} />
      </Header>

      {contactMethodsCount > 0 && (
        <Section>
          <SectionTitle>
            <Skeleton $width="200px" $height="1.5rem" style={{ margin: '0 auto' }} />
          </SectionTitle>
          <Grid>
            {Array.from({ length: contactMethodsCount }).map((_, i) => (
              <CardSkeleton key={`contact-${i}`}>
                <Skeleton $width="64px" $height="64px" $radius="50%" />
                <Skeleton $width="120px" $height="1.5rem" />
                <Skeleton $width="160px" $height="1rem" />
              </CardSkeleton>
            ))}
          </Grid>
        </Section>
      )}

      {socialMediaCount > 0 && (
        <Section>
          <SectionTitle>
            <Skeleton $width="150px" $height="1.5rem" style={{ margin: '0 auto' }} />
          </SectionTitle>
          <Grid>
            {Array.from({ length: socialMediaCount }).map((_, i) => (
              <CardSkeleton key={`social-${i}`}>
                <Skeleton $width="64px" $height="64px" $radius="50%" />
                <Skeleton $width="100px" $height="1.5rem" />
                <Skeleton $width="140px" $height="1rem" />
              </CardSkeleton>
            ))}
          </Grid>
        </Section>
      )}
    </Container>
  );
};
