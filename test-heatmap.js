require('dotenv').config({ path: '.env' });
const token = process.env.GITHUB_PAT;
fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    query: `{
      user(login: "Princess0407") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`
  })
}).then(res => res.json()).then(console.log).catch(console.error);
