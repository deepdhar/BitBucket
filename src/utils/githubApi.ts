import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users/deepdhar/repos';

export const fetchRepos = async () => {
    try {
        const response = await axios.get(GITHUB_API_URL,{
            headers: {
                'Authorization': 'token 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',
            }
        });
        return response.data;
    } catch (e) {
        console.log("API limit exceeded");
    }
};


export const fetchLastCommit = async (repoFullName: string) => {
    const response = await axios.get(`https://api.github.com/repos/${repoFullName}/commits`, {
        headers: {
            'Authorization': 'token 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',
        }
    });
    return response.data[0];
};