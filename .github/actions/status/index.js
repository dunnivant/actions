const core = require('@actions/core')
const github = require('@actions/github')

const validEvent = ['pull_request']

async function main() {
  try {
    const { eventName, payload: {repository: repo, pull_request: pr} } = github.context
    //console.log(pr);
    //console.log(repo);

    const token = core.getInput('token')
    const octokit = new github.getOctokit(token)

    const commits = await octokit.rest.pulls.get({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pr.number,
    })

    console.log(JSON.stringify(commits.data));

    core.setOutput('commits', JSON.stringify(commits.data))
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()


