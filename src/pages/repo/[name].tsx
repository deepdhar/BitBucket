import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { RepoDetail } from '@/types';

interface RepoDetailPageProps {
  repo: RepoDetail;
}

const RepoDetailPage: React.FC<RepoDetailPageProps> = ({ repo }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Last updated: {formatDistanceToNow(new Date(repo.updated_at))} ago</p>
      <p>Language: {repo.language}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const repos = await axios.get('https://api.github.com/users/freeCodeCamp/repos');
  const paths = repos.data.map((repo: RepoDetail) => ({
    params: { name: repo.name },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params as { name: string };
  const response = await axios.get(`https://api.github.com/repos/freeCodeCamp/${name}`);
  return {
    props: {
      repo: response.data,
    },
  };
};

export default RepoDetailPage;