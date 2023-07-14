import { API_KEY } from "@env";

// filter last week games by metacritic
const currentDate = new Date();
const oneWeekAgo = new Date();
oneWeekAgo.setDate(currentDate.getDate() - 7);
const currentDateStr = currentDate.toISOString().slice(0, 10);
const oneWeekAgoStr = oneWeekAgo.toISOString().slice(0, 10);
const minMetacriticScore = 80;
const weeklyUrl = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${oneWeekAgoStr},${currentDateStr}&metacritic=${minMetacriticScore}-&page=1&page_size=10`;

// filter popular upcoming games
const futureDate = new Date();
futureDate.setFullYear(currentDate.getFullYear() + 1); // Set the future date as one year from the current date
const futureDateStr = futureDate.toISOString().slice(0, 10);
const upcomingUrl = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&dates=${currentDateStr},${futureDateStr}&page=1&page_size=10`;

// best of 2023
const yearlyUrl = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2023-12-31&ordering=-rating&page_size=10`;

export default requests = {
  weekly: weeklyUrl,
  upcoming: upcomingUrl,
  yearlyUrl: yearlyUrl,
  genres: `https://api.rawg.io/api/genres?key=${API_KEY}`,
  genre: `https://api.rawg.io/api/games?key=${API_KEY}&genres=`,
  search: `https://api.rawg.io/api/games?key=${API_KEY}&search_exact=true&exclude_additions=true&ordering=metacritic=50,100&page=1&page_size=10&metacritic=50,100&search=`,
};
