export interface Repo {
    id: number;
    name: string;
    html_url: string;
    updated_at: string;
    commits_url: string;
    lastCommitMessage?: string; 
}

export interface RepoDetail {
    name: string;
    description: string;
    html_url: string;
    updated_at: string;
    language: string;
}