import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fetchRepos, fetchLastCommit } from '@/utils/githubApi';
import { Repo } from '@/types';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from '@mui/material';

interface HomePageProps {
  initialRepos: Repo[];
}

const HomePage: React.FC<HomePageProps> = ({ initialRepos }) => {
  const [repos, setRepos] = useState<Repo[]>(initialRepos);

  useEffect(() => {
    const loadLastCommits = async () => {
      const updatedRepos = await Promise.all(
        repos.map(async (repo) => {
          const lastCommit = await fetchLastCommit(repo);
          return {
            ...repo,
            lastCommitMessage: lastCommit.commit.message,
          };
        })
      );
      setRepos(updatedRepos);
    };

    loadLastCommits();
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom>
          GitHub Repositories
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {repos.map((repo) => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <Card
              sx={{
                backgroundColor: 'background.paper',
                border: '1px solid white',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" fontWeight="bold">
                  <Link href={`/repo/${repo.name}`} passHref>
                    {repo.name}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last updated: {formatDistanceToNow(new Date(repo.updated_at))} ago
                </Typography>
                {repo.lastCommitMessage && (
                  <Typography variant="body2" color="text.secondary" sx={{ color: 'lightgray' }}>
                    Last commit: {repo.lastCommitMessage}
                  </Typography>
                )}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const repos = await fetchRepos();
  return {
    props: {
      initialRepos: repos,
    },
  };
};

export default HomePage;
